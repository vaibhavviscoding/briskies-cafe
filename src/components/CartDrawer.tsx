import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, 
  Sparkles, Utensils, Package, Phone, User, Clock, ChevronRight, Share2 
} from 'lucide-react';
import { useAppStore, OrderType, Order } from '../store';
import { categories } from '../data';

export default function CartDrawer() {
  const { 
    isCartOpen, setIsCartOpen, cartItems, updateQuantity, 
    removeItem, clearCart, placeOrder, lastPlacedOrder, setLastPlacedOrder 
  } = useAppStore();

  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Perk milestone: Free surprise treat at ₹300
  const perkThreshold = 300;
  const perkDifference = Math.max(0, perkThreshold - cartTotal);
  const perkProgress = Math.min(100, Math.round((cartTotal / perkThreshold) * 100));

  const handleClose = () => {
    setIsCartOpen(false);
    if (step === 'success') {
      setTimeout(() => setStep('cart'), 300);
    }
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      setErrorMsg('Please enter your table or booth number');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const placed = await placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber.trim() : undefined,
        notes: notes.trim() || undefined,
        items: [...cartItems],
        total: cartTotal,
      });

      clearCart();
      setStep('success');
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not place order. Please try again or alert counter staff.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get image for cart item
  const getItemImage = (name: string, fallback?: string) => {
    if (fallback) return fallback;
    const foundCat = categories.find(c => c.items.some(i => i.name === name));
    return foundCat?.image || '/veg_burger.jpg';
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-zinc-900 leading-tight">
                      {step === 'success' ? 'Order Confirmed!' : 'Your Briskies Tray'}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      {step === 'success'
                        ? 'Fresh comfort food is on the griddle'
                        : `${totalItemCount} items selected • 100% Pure Veg`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Perk Milestone Bar */}
              {step !== 'success' && cartItems.length > 0 && (
                <div className="px-6 py-3.5 bg-amber-50/80 border-b border-amber-100">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {perkDifference === 0 ? (
                        <span className="text-emerald-700">🎉 Congratulations! You unlocked a Free Sweet Treat!</span>
                      ) : (
                        <span>Add ₹{perkDifference} more for a Free Surprise Treat!</span>
                      )}
                    </span>
                    <span>{perkProgress}%</span>
                  </div>
                  <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${perkProgress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* 1. Empty State */}
                {cartItems.length === 0 && step !== 'success' && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
                      <Utensils className="w-10 h-10" />
                    </div>
                    <h4 className="font-display font-extrabold text-2xl text-zinc-900">
                      Your tray is empty
                    </h4>
                    <p className="text-zinc-500 text-sm max-w-xs mt-2 mb-8 leading-relaxed">
                      Hot burgers, creamy shakes, and crispy waffles are waiting for you. Let’s add something tasty!
                    </p>
                    <button
                      onClick={() => {
                        handleClose();
                        const el = document.getElementById('discover-menu');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                    >
                      Explore Menu
                    </button>
                  </div>
                )}

                {/* 2. Cart Items View */}
                {step === 'cart' && cartItems.length > 0 && (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-colors gap-3"
                      >
                        <img
                          src={getItemImage(item.name, item.image)}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white border border-zinc-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="veg-indicator shrink-0" />
                            <h4 className="font-bold text-zinc-900 text-sm truncate">{item.name}</h4>
                          </div>
                          <span className="text-xs text-zinc-500 font-semibold mt-0.5 block">
                            ₹{item.price} each
                          </span>
                        </div>

                        {/* Stepper & Total */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="font-display font-bold text-zinc-900 text-sm">
                            ₹{item.price * item.quantity}
                          </span>
                          <div className="flex items-center bg-white rounded-full border border-zinc-200 p-0.5 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-100 active:scale-95"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-100 active:scale-95"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Special Instructions note */}
                    <div className="pt-2">
                      <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block mb-1.5">
                        Cooking Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Extra spicy, no onions, pack cutlery..."
                        className="w-full text-xs font-medium px-4 py-2.5 rounded-xl border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Customer Details & Order Type View */}
                {step === 'details' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    {/* Order Type Selector */}
                    <div>
                      <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block mb-2">
                        How would you like your food?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setOrderType('dine-in')}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                            orderType === 'dine-in'
                              ? 'border-amber-500 bg-amber-50/60 text-amber-900 shadow-sm'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          <Utensils className="w-4 h-4 text-amber-600" />
                          <span>Dine-In</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType('takeaway')}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 font-bold text-sm transition-all ${
                            orderType === 'takeaway'
                              ? 'border-amber-500 bg-amber-50/60 text-amber-900 shadow-sm'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          <Package className="w-4 h-4 text-amber-600" />
                          <span>Takeaway</span>
                        </button>
                      </div>
                    </div>

                    {/* Table Number if Dine-in */}
                    {orderType === 'dine-in' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block mb-1.5">
                          Table / Booth Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          placeholder="e.g. Table 4 or Corner Booth"
                          className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        />
                      </motion.div>
                    )}

                    {/* Customer Name */}
                    <div>
                      <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Vaibhav Gupta"
                          className="w-full text-sm font-semibold pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>

                    {/* Customer Phone */}
                    <div>
                      <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="w-full text-sm font-semibold pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                        {errorMsg}
                      </p>
                    )}

                    <div className="pt-2 text-xs text-zinc-400 leading-relaxed">
                      Orders are received directly at our kitchen counter. Payment can be settled via UPI/Card/Cash at counter or table.
                    </div>
                  </form>
                )}

                {/* 4. Joyful Order Confirmed State */}
                {step === 'success' && lastPlacedOrder && (
                  <div className="py-6 text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>

                    <div>
                      <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-xs font-extrabold uppercase tracking-widest rounded-full mb-2 border border-amber-200">
                        Token #{lastPlacedOrder.id}
                      </span>
                      <h3 className="font-display font-black text-2xl text-zinc-900">
                        Order Sent to Kitchen!
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1">
                        Thank you, {lastPlacedOrder.customerName}. Estimated prep time is 10–15 minutes.
                      </p>
                    </div>

                    {/* Receipt Card */}
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-left text-xs space-y-2.5">
                      <div className="flex justify-between font-bold text-zinc-800 pb-2 border-b border-zinc-200">
                        <span>
                          {lastPlacedOrder.orderType === 'dine-in'
                            ? `🍽️ Dine-in (Table ${lastPlacedOrder.tableNumber || 'Assigned'})`
                            : '🛍️ Takeaway Counter Pickup'}
                        </span>
                        <span>₹{lastPlacedOrder.total}</span>
                      </div>

                      <div className="space-y-1.5 py-1">
                        {lastPlacedOrder.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-zinc-600">
                            <span>
                              {it.quantity}x {it.name}
                            </span>
                            <span>₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {lastPlacedOrder.notes && (
                        <div className="pt-2 border-t border-zinc-200 text-[11px] text-amber-800">
                          <span className="font-bold">Notes: </span>
                          {lastPlacedOrder.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2.5 pt-2">
                      <button
                        onClick={() => {
                          setStep('cart');
                          handleClose();
                        }}
                        className="w-full py-3 rounded-full bg-zinc-900 text-white font-bold text-sm shadow-md hover:bg-zinc-800 active:scale-95 transition-all"
                      >
                        Order More Items
                      </button>
                      <a
                        href="/admin"
                        className="w-full py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>View Live Kitchen Screen</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Actions (for Cart & Details Steps) */}
              {cartItems.length > 0 && step !== 'success' && (
                <div className="p-6 border-t border-zinc-100 bg-zinc-50/60 space-y-4">
                  {/* Bill Breakdown */}
                  <div className="space-y-1.5 text-xs font-semibold text-zinc-600">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Café GST & Packaging</span>
                      <span className="font-bold">INCLUDED</span>
                    </div>
                    {perkDifference === 0 && (
                      <div className="flex justify-between text-amber-700 font-bold">
                        <span>Milestone Free Perk</span>
                        <span>UNLOCKED ✨</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-display font-black text-zinc-900 pt-2 border-t border-zinc-200">
                      <span>Grand Total</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  {step === 'cart' ? (
                    <button
                      onClick={() => setStep('details')}
                      className="w-full py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Order Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setStep('cart')}
                        className="px-4 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCheckoutSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-300 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Sending to Kitchen...</span>
                        ) : (
                          <>
                            <span>Confirm & Place Order</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
