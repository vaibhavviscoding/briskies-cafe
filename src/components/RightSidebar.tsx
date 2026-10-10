export default function RightSidebar() {
  return (
    <div className="fixed right-0 top-1/3 z-50 flex flex-col gap-2">
      {/* Tab 1 */}
      <a href="#menu" className="group flex items-center justify-center w-16 h-16 bg-[#2d2d2d] text-white hover:bg-[#C8102E] transition-colors relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%)' }}>
         <svg className="w-8 h-8 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9v1h14V9c0-3.87-3.13-7-7-7z" /><path d="M4 14h16v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4z" /><path d="M5 11h14v2H5z" /></svg>
      </a>
      
      {/* Tab 2 */}
      <a href="#menu" className="group flex items-center justify-center w-16 h-16 bg-[#2d2d2d] text-white hover:bg-[#F8A836] transition-colors relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%)' }}>
         <svg className="w-8 h-8 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
      </a>

      {/* Tab 3 */}
      <a href="#menu" className="group flex items-center justify-center w-16 h-16 bg-[#2d2d2d] text-white hover:bg-[#854D0E] transition-colors relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 15% 50%)' }}>
         <svg className="w-8 h-8 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="9" x2="9" y1="8" y2="21" /><line x1="14" x2="14" y1="8" y2="21" /></svg>
      </a>
    </div>
  );
}
