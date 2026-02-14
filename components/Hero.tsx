import React from 'react';
import { ARTIST_NAME, ARTIST_SURNAME } from '../constants';
import { AppSection } from '../types';

interface HeroProps {
  onNavigate: (section: AppSection) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-white">
      {/* Abstract Geometric Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" className="animate-[spin_60s_linear_infinite]">
          <rect x="100" y="100" width="400" height="400" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="300" cy="300" r="150" stroke="black" strokeWidth="2" fill="none" />
          <line x1="100" y1="100" x2="500" y2="500" stroke="black" strokeWidth="1" />
          <line x1="500" y1="100" x2="100" y2="500" stroke="black" strokeWidth="1" />
          <rect x="250" y="250" width="100" height="100" fill="currentColor" className="text-red-600/20" />
        </svg>
      </div>

      <div className="z-10 text-center space-y-6 w-full px-4">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none select-none flex flex-wrap justify-center items-center gap-2 md:gap-6">
          <span>{ARTIST_NAME}</span>
          <span className="text-stroke text-transparent">{ARTIST_SURNAME}</span>
        </h1>
        
        <div className="w-16 h-1 bg-red-600 mx-auto"></div>
        
        <p className="text-neutral-500 tracking-[0.3em] text-sm uppercase pt-4">
          Arte Contemporanea nata in Italia
        </p>

        <div className="pt-12">
          <button 
            onClick={() => onNavigate(AppSection.GALLERY)}
            className="group relative px-8 py-3 overflow-hidden bg-black text-white transition-all hover:bg-red-600 duration-500 ease-out"
          >
            <span className="relative z-10 tracking-widest text-xs font-bold">ENTRA</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;