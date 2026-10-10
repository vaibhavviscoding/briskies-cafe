import { motion } from 'motion/react';

export default function Highlight() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden border-t border-gray-100 dark:border-slate-800">
       {/* Sketch Icons Row (From Template) */}
       <div className="max-w-[1200px] mx-auto px-6 mb-32 relative opacity-30 dark:opacity-20 pointer-events-none">
          <div className="flex justify-between items-center gap-12 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=200" alt="Sketch 1" className="w-48 h-48 object-cover rounded-full mix-blend-luminosity sepia hover:sepia-0 transition-all duration-500" />
             <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200" alt="Sketch 2" className="w-48 h-48 object-cover rounded-full mix-blend-luminosity sepia hover:sepia-0 transition-all duration-500" />
             <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=200" alt="Sketch 3" className="w-48 h-48 object-cover rounded-full mix-blend-luminosity sepia hover:sepia-0 transition-all duration-500" />
          </div>
       </div>

       <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Burger Image */}
          <div className="w-full md:w-1/2 relative">
             <motion.div 
               initial={{ rotate: -5, opacity: 0 }}
               whileInView={{ rotate: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative z-10"
             >
                {/* Speech Bubble "BEST IN TOWN" */}
                <div className="absolute -top-12 -left-12 z-20 w-40 h-32">
                   <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M180.4 46.5C180.4 20.8 140.9 0 92.2 0C43.5 0 4 20.8 4 46.5C4 67.2 29.5 84.7 65 91.1C66.5 98 56.4 116.5 54 122C52 126.5 60.5 125 64 122.5C76 114 88.5 101.5 93 92.8C92.7 92.8 92.5 92.8 92.2 92.8C140.9 92.8 180.4 72 180.4 46.5Z" className="fill-white dark:fill-slate-800" stroke="#F8A836" strokeWidth="4"/>
                      <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" className="font-hand font-bold text-3xl fill-[#2d2d2d] dark:fill-white">BEST IN</text>
                      <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" className="font-hand font-bold text-3xl fill-[#2d2d2d] dark:fill-white">TOWN</text>
                   </svg>
                </div>
                
                {/* Burger Image */}
                <div className="w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=1000" alt="Delicious Burger" className="w-full h-full object-cover" />
                  
                  {/* Price Tag */}
                  <div className="absolute bottom-6 left-6 w-32 h-32 bg-[#2d2d2d] rounded-full flex flex-col items-center justify-center text-white border-4 border-white shadow-xl transform -rotate-12">
                     <span className="font-sans font-bold text-xl">Burger</span>
                     <span className="font-display font-bold text-5xl">₹80</span>
                  </div>
                </div>
             </motion.div>
          </div>

          {/* Right Side: Text */}
          <div className="w-full md:w-1/2">
             <span className="font-hand text-3xl text-[#F8A836] mb-4 block tracking-wider uppercase">ALWAYS FRESH</span>
             <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-gray-900 dark:text-white">
                From Briskies with American Love
             </h2>
             <div className="w-24 h-2 bg-[#F8A836] mb-8" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,5 Q25,0 50,5 T100,5\' stroke=\'black\' fill=\'transparent\' stroke-width=\'4\'/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,5 Q25,0 50,5 T100,5\' stroke=\'black\' fill=\'transparent\' stroke-width=\'4\'/%3E%3C/svg%3E")' }}></div>
             
             <p className="text-gray-600 dark:text-gray-400 font-sans text-xl leading-relaxed mb-12 max-w-xl">
                Briskies is a cozy, modern cafe offering the freshest bites and coolest vibes. 
                Whether you're craving a jumbo burger, loaded fries, or a refreshing iced tea, 
                our menu is crafted with quality ingredients to give you comfort and good times. 
                Thank you for supporting local!
             </p>

             <button className="bg-[#F8A836] text-white hover:bg-[#C8102E] transition-colors px-12 py-5 rounded-full font-display font-bold text-xl tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                ORDER NOW
             </button>
          </div>
       </div>
    </section>
  );
}
