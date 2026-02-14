import React from 'react';
import { AppSection, ViewMode } from '../types';

interface NavigationProps {
  currentSection: AppSection;
  currentView: ViewMode;
  onNavigate: (section: AppSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div 
          className="text-2xl font-bold tracking-tighter cursor-pointer select-none"
          onClick={() => onNavigate(AppSection.HOME)}
        >
          MV<span className="text-red-600">.</span>
        </div>
        
        <div className="hidden md:flex space-x-12 text-sm tracking-widest font-medium">
          {[
            { id: AppSection.GALLERY, label: 'OPERE' },
            { id: AppSection.ABOUT, label: 'BIO' },
            { id: AppSection.CONTACT, label: 'CONTATTI' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`hover:text-red-600 transition-colors duration-300 ${
                (currentView === 'home' && currentSection === item.id) || (currentView === 'gallery' && item.id === AppSection.GALLERY) 
                ? 'text-red-600 border-b border-red-600 pb-1' 
                : 'text-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <div className="space-y-1.5 cursor-pointer group" onClick={() => onNavigate(AppSection.GALLERY)}>
            <div className="w-8 h-0.5 bg-black group-hover:bg-red-600 transition-colors"></div>
            <div className="w-8 h-0.5 bg-black group-hover:bg-red-600 transition-colors"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;