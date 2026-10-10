import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, LayoutDashboard, Search, Filter, Clock, 
  CheckCircle2, AlertCircle, ChefHat, Phone, User, 
  Printer, ArrowRight, DollarSign, ShoppingBag, Utensils, 
  Sparkles, Check, ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore, Order, OrderStatus } from '../store';
import { BriskiesLogo } from '../components/Logo';

function formatOrderDate(dateStr: string): string {
  try {
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/);
    if (m) {
      const [, y, mo, d, h, mi] = m;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[parseInt(mo, 10) - 1];
      let hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${d} ${monthName}, ${hour}:${mi} ${ampm}`;
    }
    return new Date(dateStr).toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function Admin() {
  const { orders, fetchOrders, updateOrderStatus, showToast } = useAppStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'dine-in' | 'takeaway'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOrders();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Orders refreshed', 'info');
    }, 400);
  };

  const handlePrint = (order: Order) => {
    window.print();
  };

  // Metrics calculation
  const totalRevenue = useMemo(
    () => orders.reduce((acc, o) => acc + (o.total || 0), 0),
    [orders]
  );
  const activeQueueCount = useMemo(
    () => orders.filter((o) => !o.status || ['pending', 'preparing'].includes(o.status)).length,
    [orders]
  );
  const readyOrdersCount = useMemo(
    () => orders.filter((o) => o.status === 'ready').length,
    [orders]
  );

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const currentStatus: OrderStatus = order.status || 'pending';
      if (statusFilter !== 'all' && currentStatus !== statusFilter) return false;
      if (typeFilter !== 'all' && order.orderType !== typeFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = order.customerName.toLowerCase().includes(q);
        const matchPhone = order.customerPhone.includes(q);
        const matchId = order.id.toLowerCase().includes(q);
        const matchItems = order.items.some((i) => i.name.toLowerCase().includes(q));
        return matchName || matchPhone || matchId || matchItems;
      }

      return true;
    });
  }, [orders, statusFilter, typeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 p-4 sm:p-8 md:p-12 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                <ChefHat className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-zinc-900">
                Kitchen Display & Order Hub
              </h1>
            </div>
            <p className="text-zinc-500 text-xs sm:text-sm font-medium">
              Real-time incoming orders, table assignments, and kitchen status updates for Briskies Café.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Queue</span>
            </button>

            <Link
              to="/"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>View Customer Menu</span>
            </Link>

            <div className="hidden lg:block w-[120px] ml-4">
              <BriskiesLogo />
            </div>
          </div>
        </div>

        {/* Live KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-soft-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">
              Total Today's Orders
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-black text-zinc-900">
                {orders.length}
              </span>
              <span className="text-xs font-semibold text-emerald-600">Active</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-soft-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 block mb-1">
              Active in Kitchen
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-black text-amber-600">
                {activeQueueCount}
              </span>
              <span className="text-xs font-semibold text-zinc-500">Preparing</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-soft-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-1">
              Ready for Serving / Pickup
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-black text-emerald-600">
                {readyOrdersCount}
              </span>
              <span className="text-xs font-semibold text-emerald-600">Hot & Fresh</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-soft-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1">
              Estimated Total Sales
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-black text-zinc-900">
                ₹{totalRevenue}
              </span>
              <span className="text-xs font-semibold text-zinc-400">INR</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-zinc-200/80 shadow-soft-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'pending', label: 'New / Pending' },
              { id: 'preparing', label: 'In Kitchen' },
              { id: 'ready', label: 'Ready' },
              { id: 'completed', label: 'Completed' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === tab.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Type filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search token, name, phone..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-zinc-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-full text-xs font-bold">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  typeFilter === 'all' ? 'bg-white shadow-xs text-zinc-900' : 'text-zinc-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter('dine-in')}
                className={`px-3 py-1 rounded-full transition-all ${
                  typeFilter === 'dine-in' ? 'bg-white shadow-xs text-zinc-900' : 'text-zinc-600'
                }`}
              >
                🍽️ Dine
              </button>
              <button
                onClick={() => setTypeFilter('takeaway')}
                className={`px-3 py-1 rounded-full transition-all ${
                  typeFilter === 'takeaway' ? 'bg-white shadow-xs text-zinc-900' : 'text-zinc-600'
                }`}
              >
                🛍️ Take
              </button>
            </div>
          </div>
        </div>

        {/* Order Feed List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-zinc-200 shadow-soft-sm">
              <Utensils className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <h3 className="font-display font-bold text-2xl text-zinc-700">No orders found</h3>
              <p className="text-xs text-zinc-400 mt-1">
                No orders match your active filter criteria. Check back in a moment or refresh.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const currentStatus: OrderStatus = order.status || 'pending';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-soft-sm hover:shadow-md transition-shadow flex flex-col xl:flex-row justify-between gap-6"
                >
                  {/* Left: Customer & Meta Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display font-black text-xl text-zinc-900">
                        Token #{order.id}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                          order.orderType === 'dine-in'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {order.orderType === 'dine-in'
                          ? `🍽️ Dine-in (Table: ${order.tableNumber || 'Assigned'})`
                          : '🛍️ Takeaway (Counter Pickup)'}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                          currentStatus === 'pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            : currentStatus === 'preparing'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : currentStatus === 'ready'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse'
                            : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            currentStatus === 'pending'
                              ? 'bg-amber-500'
                              : currentStatus === 'preparing'
                              ? 'bg-blue-500'
                              : currentStatus === 'ready'
                              ? 'bg-emerald-500'
                              : 'bg-zinc-400'
                          }`}
                        />
                        <span>
                          {currentStatus === 'pending'
                            ? 'New Order'
                            : currentStatus === 'preparing'
                            ? 'Cooking in Kitchen'
                            : currentStatus === 'ready'
                            ? 'Ready for Counter / Table'
                            : 'Completed'}
                        </span>
                      </span>

                      <span className="text-xs text-zinc-400 font-medium ml-auto flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatOrderDate(order.date)}</span>
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-700">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                        <User className="w-4 h-4 text-zinc-400" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-zinc-600">
                        <Phone className="w-4 h-4 text-zinc-400" />
                        <a
                          href={`tel:${order.customerPhone}`}
                          className="hover:text-amber-600 underline"
                        >
                          {order.customerPhone}
                        </a>
                      </div>
                    </div>

                    {/* Kitchen Special Notes */}
                    {order.notes && (
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900">
                        <span className="font-bold">Customer Request: </span>
                        {order.notes}
                      </div>
                    )}

                    {/* Items List */}
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                        Kitchen Order Items:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs font-semibold"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-white border border-zinc-200 flex items-center justify-center font-bold text-zinc-900 text-xs">
                                {item.quantity}x
                              </span>
                              <span className="text-zinc-800">{item.name}</span>
                            </div>
                            <span className="text-zinc-500">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Total & Status Controller Actions */}
                  <div className="xl:w-72 xl:border-l border-zinc-100 xl:pl-6 flex flex-col justify-between gap-6 border-t xl:border-t-0 pt-4 xl:pt-0">
                    <div>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                        Order Total
                      </span>
                      <span className="text-3xl font-display font-black text-zinc-900">
                        ₹{order.total}
                      </span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        {order.items.reduce((acc, i) => acc + i.quantity, 0)} items • Pure Veg
                      </span>
                    </div>

                    {/* Status Progression Workflow */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-zinc-500 block">
                        Update Kitchen Stage:
                      </span>

                      {currentStatus === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <ChefHat className="w-4 h-4" />
                          <span>Start Cooking</span>
                        </button>
                      )}

                      {currentStatus === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Order Ready</span>
                        </button>
                      )}

                      {currentStatus === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>Mark Fulfilled & Served</span>
                        </button>
                      )}

                      {currentStatus === 'completed' && (
                        <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-600 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Order Complete</span>
                        </div>
                      )}

                      {/* Print Ticket */}
                      <button
                        onClick={() => handlePrint(order)}
                        className="w-full py-2 px-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print KOT Ticket</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
