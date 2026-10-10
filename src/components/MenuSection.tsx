import { motion } from 'motion/react';
import React from 'react';
import CircularText from './CircularText';

const MenuSection: React.FC<{ category: any, index: number }> = ({ category, index }) => {
  return (
    <section id={category.id} className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${category.bgColor} py-24`}>
      
      {/* Background Rotating Text */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className={`absolute w-[150vw] md:w-[90vw] max-w-[1200px] aspect-square rounded-full flex items-center justify-center ${category.textColor}`}
      >
         <CircularText text={category.textCircle} />
      </motion.div>

      {/* Center Image Container */}
      <motion.div 
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-[85vw] md:w-[45vw] max-w-[600px] aspect-square rounded-full overflow-hidden border-[12px] md:border-[24px] border-white shadow-2xl z-0"
      >
         <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
      </motion.div>

      {/* Content Card Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex h-full">
         <div className={`w-full flex ${category.align === 'left' ? 'justify-start' : 'justify-end'} items-center mt-[60vh] md:mt-0`}>
            
            <motion.div 
              initial={{ opacity: 0, x: category.align === 'left' ? -150 : 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`w-full max-w-[480px] ${category.cardBg} p-8 md:p-12 shadow-2xl rounded-3xl md:rounded-[40px] transform ${category.align === 'left' ? 'md:-rotate-2' : 'md:rotate-2'} backdrop-blur-sm bg-white/95 dark:bg-slate-800/95 border-2 border-white/50 dark:border-slate-700/50`}
            >
               {/* Decorative dots / cutouts */}
               <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full ${category.bgColor} shadow-inner border border-white/50 dark:border-slate-700/50`} />
               <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full ${category.bgColor} shadow-inner border border-white/50 dark:border-slate-700/50`} />
               
               <h2 className={`text-6xl md:text-8xl font-black mb-2 uppercase tracking-tighter font-display leading-none ${category.textColor} dark:text-white`}>
                  {category.title}
               </h2>
               
               <p className="text-gray-500 dark:text-gray-400 font-bold text-lg md:text-xl mb-8 tracking-widest uppercase">{category.tagline}</p>
               
               <div className="space-y-5 mb-10">
                  {category.items.map((item: any, i: number) => (
                     <motion.div 
                       key={item.name} 
                       initial={{ opacity: 0, y: 40, scale: 0.9 }}
                       whileInView={{ opacity: 1, y: 0, scale: 1 }}
                       viewport={{ once: true, amount: 0.1 }}
                       transition={{ duration: 0.6, delay: 0.4 + (i * 0.15), ease: "easeOut" }}
                       className="flex justify-between items-end border-b-2 border-dashed border-gray-200 dark:border-slate-600 pb-2"
                     >
                       <span className={`font-bold text-xl md:text-2xl leading-tight pr-4 ${category.cardText} dark:text-gray-200`}>{item.name}</span>
                       <span className={`font-black text-2xl md:text-3xl ${category.textColor}`}>₹{item.price}</span>
                     </motion.div>
                  ))}
               </div>
               
               <motion.button 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.8 }}
                 className={`w-full py-5 rounded-2xl text-white font-black text-xl md:text-2xl uppercase tracking-widest transition-transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg ${category.btnBg}`}
               >
                  Order Now
               </motion.button>
            </motion.div>
         </div>
      </div>
    </section>
  );
}

export default MenuSection;
