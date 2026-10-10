export default function CircularText({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible opacity-50 md:opacity-100">
      <defs>
        <path id="circlePath" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" fill="none" />
      </defs>
      <text className="text-[18px] font-bold uppercase font-sans tracking-widest" fill="currentColor" style={{ letterSpacing: '12px' }}>
        <textPath href="#circlePath" startOffset="0%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
