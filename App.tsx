import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import FullGallery from './components/FullGallery';
import About from './components/About';
import Contact from './components/Contact';
import ArtworkModal from './components/ArtworkModal';
import { AppSection, Artwork, ViewMode } from './types';
import { ARTWORKS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('home');
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Handle scroll spy to update current section based on viewport
  useEffect(() => {
    if (view !== 'home') return;

    const options = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Active when element is in the middle-ish
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id as AppSection);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const sections = [
      AppSection.HOME,
      AppSection.GALLERY,
      AppSection.ABOUT,
      AppSection.CONTACT
    ];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [view]);

  // Scroll to top when switching to gallery view
  useEffect(() => {
    if (view === 'gallery') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (section: AppSection) => {
    if (section === AppSection.GALLERY && view === 'home') {
      setCurrentSection(section); // Immediate feedback
      scrollToSection(section);
      return;
    }

    if (section === AppSection.GALLERY) {
      setView('gallery');
      return;
    }

    // Default behavior: go to home view and scroll
    if (view !== 'home') {
      setView('home');
      // Wait for React to render the Home view before scrolling
      setTimeout(() => {
        setCurrentSection(section);
        scrollToSection(section);
      }, 50);
    } else {
      setCurrentSection(section);
      scrollToSection(section);
    }
  };

  const handleOpenFullGallery = () => {
    setView('gallery');
  };

  const handleSelectArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
  };

  const handleContactFromModal = () => {
    setSelectedArtwork(null);
    setView('home');
    setTimeout(() => {
      setCurrentSection(AppSection.CONTACT);
      scrollToSection(AppSection.CONTACT);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navigation
        currentSection={currentSection}
        currentView={view}
        onNavigate={handleNavigate}
      />

      <main>
        {view === 'home' ? (
          <>
            {/* Sections are stacked but we scroll to them. ID is crucial. */}
            <div id={AppSection.HOME}>
              <Hero onNavigate={handleNavigate} />
            </div>

            <div id={AppSection.GALLERY} className="pt-20">
              <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                <h2 className="text-3xl font-serif mb-8 inline-block border-b-2 border-red-600 pb-2">Opere Recenti</h2>
                <Gallery
                  artworks={ARTWORKS}
                  onSelectArtwork={handleSelectArtwork}
                  onViewFullGallery={handleOpenFullGallery}
                />
              </div>
            </div>

            <div id={AppSection.ABOUT}>
              <About />
            </div>

            <div id={AppSection.CONTACT}>
              <Contact />
            </div>
          </>
        ) : (
          <FullGallery
            artworks={ARTWORKS}
            onSelectArtwork={handleSelectArtwork}
          />
        )}
      </main>

      <footer className="py-8 text-center text-xs text-neutral-400 border-t border-neutral-100">
        <p>&copy; {new Date().getFullYear()} Marco Virno. All rights reserved.</p>
      </footer>

      {/* Modal Overlay */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={handleCloseModal}
          onContact={handleContactFromModal}
        />
      )}
    </div>
  );
};

export default App;