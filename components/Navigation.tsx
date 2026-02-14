import React, { useState } from 'react';
import { AppSection, ViewMode } from '../types';

interface NavigationProps {
  currentSection: AppSection;
  currentView: ViewMode;
  onNavigate: (section: AppSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: AppSection.GALLERY, label: 'OPERE' },
    { id: AppSection.ABOUT, label: 'BIO' },
    { id: AppSection.CONTACT, label: 'CONTATTI' }
  ];

  const handleNavigate = (section: AppSection) => {
    setMobileMenuOpen(false);
    onNavigate(section);
  };

  const isActive = (itemId: AppSection) =>
    (currentView === 'home' && currentSection === itemId) ||
    (currentView === 'gallery' && itemId === AppSection.GALLERY);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div
          className="text-2xl font-bold tracking-tighter cursor-pointer select-none"
          onClick={() => handleNavigate(AppSection.HOME)}
        >
          MV<span className="text-red-600">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-sm tracking-widest font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`hover:text-red-600 transition-colors duration-300 ${
                isActive(item.id)
                  ? 'text-red-600 border-b border-red-600 pb-1'
                  : 'text-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          <span className={`block w-8 h-0.5 bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-black transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-48 border-t border-neutral-100' : 'max-h-0'
        } bg-white`}
      >
        <div className="px-6 py-4 flex flex-col space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`text-left text-sm tracking-widest font-medium py-3 border-b border-neutral-50 last:border-0 hover:text-red-600 transition-colors duration-200 ${
                isActive(item.id) ? 'text-red-600' : 'text-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
