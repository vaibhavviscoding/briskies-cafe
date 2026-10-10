import { useState } from 'react';

export const LogoFallback = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <h1 
      className="font-logo text-[#FFFBF0] leading-none text-center relative z-10"
      style={{
        WebkitTextStroke: '6px #C8102E',
        textShadow: '0 4px 0 #C8102E',
      }}
    >
      <span className="relative z-10 block" style={{ transform: 'rotate(-5deg) translateY(10px)', fontSize: '1.2em' }}>
        BRISKIES
      </span>
      <span 
        className="block font-sans font-bold text-white bg-[#C8102E] rounded-full mt-2 relative z-20 mx-auto"
        style={{
          fontSize: '0.15em',
          padding: '0.3em 1em',
          letterSpacing: '0.1em',
          WebkitTextStroke: '0px',
          textShadow: 'none',
          border: '2px solid white'
        }}
      >
        CAFÉ • COMFORT • GOOD TIMES
      </span>
    </h1>
    {/* Decorative sunburst behind */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[120%] bg-[#C8102E] rounded-full blur-[40px] opacity-40 z-0"></div>
  </div>
);

export const BriskiesLogo = ({ className = "" }: { className?: string }) => {
  // Try logo.png, then logo.jpg, then logo.jpeg
  const [imageSrc, setImageSrc] = useState('/logo.png');
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (imageSrc === '/logo.png') {
      setImageSrc('/logo.jpg');
    } else if (imageSrc === '/logo.jpg') {
      setImageSrc('/logo.jpeg');
    } else {
      setFailed(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* If all images fail to load, we show the CSS fallback */}
      {failed && <LogoFallback className="w-full h-full absolute inset-0 opacity-100" />}
      
      {!failed && (
        <img 
          src={imageSrc} 
          alt="Briskies Logo" 
          className="w-full h-full object-contain relative z-20" 
          onError={handleError} 
        />
      )}
    </div>
  );
};
