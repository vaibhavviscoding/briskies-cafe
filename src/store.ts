import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@supabase/supabase-js';
import { MenuItem } from './data';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const getISTTimestamp = (): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || '00';
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  let hour = getPart('hour');
  if (hour === '24') hour = '00';
  const minute = getPart('minute');
  const second = getPart('second');

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
};

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  customization?: string;
}

export type OrderType = 'dine-in' | 'takeaway';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  tableNumber?: string;
  address?: string;
  notes?: string;
  items: CartItem[];
  total: number;
  status?: OrderStatus;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'alert';
}

interface AppState {
  cartItems: CartItem[];
  orders: Order[];
  favorites: string[];
  lastPlacedOrder: Order | null;
  activeCategory: string;
  activeMood: string;
  quickViewItem: MenuItem | null;
  toast: ToastNotification | null;
  searchQuery: string;
  isSearchOpen: boolean;
  isCartOpen: boolean;

  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  updateQuantity: (name: string, delta: number) => void;
  removeItem: (name: string) => void;
  clearCart: () => void;

  // Order actions
  placeOrder: (order: Omit<Order, 'id' | 'date'>) => Promise<Order>;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  setLastPlacedOrder: (order: Order | null) => void;

  // Exploration actions
  toggleFavorite: (itemName: string) => void;
  setActiveCategory: (catId: string) => void;
  setActiveMood: (mood: string) => void;
  setQuickViewItem: (item: MenuItem | null) => void;
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'alert') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      orders: [],
      favorites: [],
      lastPlacedOrder: null,
      activeCategory: 'all',
      activeMood: 'all',
      quickViewItem: null,
      toast: null,
      searchQuery: '',
      isSearchOpen: false,
      isCartOpen: false,

      addToCart: (item, qty = 1) => {
        set((state) => {
          const existing = state.cartItems.find(i => i.name === item.name);
          let newItems: CartItem[];
          if (existing) {
            newItems = state.cartItems.map(i => 
              i.name === item.name ? { ...i, quantity: i.quantity + qty } : i
            );
          } else {
            newItems = [...state.cartItems, { ...item, quantity: qty }];
          }
          return { cartItems: newItems };
        });

        // Trigger delightful micro feedback
        get().showToast(`Added ${item.name} to tray`, 'success');
      },

      updateQuantity: (name, delta) => set((state) => {
        const item = state.cartItems.find(i => i.name === name);
        if (!item) return state;
        const newQty = item.quantity + delta;

        if (newQty <= 0) {
          return {
            cartItems: state.cartItems.filter(i => i.name !== name)
          };
        }

        return {
          cartItems: state.cartItems.map(i =>
            i.name === name ? { ...i, quantity: newQty } : i
          )
        };
      }),

      removeItem: (name) => set((state) => ({
        cartItems: state.cartItems.filter(i => i.name !== name)
      })),

      clearCart: () => set({ cartItems: [] }),

      placeOrder: async (order) => {
        const orderId = 'BRK-' + Math.floor(1000 + Math.random() * 9000);
        const newOrder: Order = {
          ...order,
          id: orderId,
          date: getISTTimestamp(),
          status: 'pending'
        };

        try {
          if (supabase) {
            const { data, error } = await supabase.from('orders').insert([newOrder]).select();
            if (error) {
              console.warn('Supabase insert failed, operating in local state fallback', error);
            } else if (data && data[0]) {
              const placed = data[0] as Order;
              set((state) => ({
                orders: [placed, ...state.orders],
                lastPlacedOrder: placed
              }));
              return placed;
            }
          }
        } catch (e) {
          console.error('Failed to sync order with Supabase, storing in memory', e);
        }

        // Local state fallback
        set((state) => ({
          orders: [newOrder, ...state.orders],
          lastPlacedOrder: newOrder
        }));
        return newOrder;
      },

      fetchOrders: async () => {
        try {
          if (supabase) {
            const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
            if (!error && data && data.length > 0) {
              set({ orders: data as Order[] });
              return;
            }
          }
        } catch (e) {
          console.error('Failed to fetch orders from Supabase', e);
        }
      },

      updateOrderStatus: async (orderId: string, status: OrderStatus) => {
        set((state) => ({
          orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o),
          lastPlacedOrder: state.lastPlacedOrder?.id === orderId ? { ...state.lastPlacedOrder, status } : state.lastPlacedOrder
        }));

        try {
          if (supabase) {
            await supabase.from('orders').update({ status }).eq('id', orderId);
          }
        } catch (e) {
          console.warn('Failed to update status on Supabase', e);
        }
      },

      setLastPlacedOrder: (order) => set({ lastPlacedOrder: order }),

      toggleFavorite: (itemName) => set((state) => {
        const isFav = state.favorites.includes(itemName);
        const newFavs = isFav 
          ? state.favorites.filter(n => n !== itemName)
          : [...state.favorites, itemName];
        return { favorites: newFavs };
      }),

      setActiveCategory: (catId) => set({ activeCategory: catId }),
      setActiveMood: (mood) => set({ activeMood: mood }),
      setQuickViewItem: (item) => set({ quickViewItem: item }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      showToast: (message, type = 'info') => {
        const id = Math.random().toString(36).substring(2, 7);
        set({ toast: { id, message, type } });
        setTimeout(() => {
          set((state) => state.toast?.id === id ? { toast: null } : state);
        }, 2800);
      }
    }),
    {
      name: 'briskies-storage',
      partialize: (state) => ({ 
        cartItems: state.cartItems,
        favorites: state.favorites
      }),
    }
  )
);
