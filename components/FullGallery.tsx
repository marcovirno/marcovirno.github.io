import React, { useState, useMemo, useEffect } from 'react';
import { Artwork } from '../types';

interface FullGalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

const ITEMS_PER_PAGE = 6;

const FullGallery: React.FC<FullGalleryProps> = ({ artworks, onSelectArtwork }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');
  const [selectedYear, setSelectedYear] = useState<string>('Tutti');
  const [currentPage, setCurrentPage] = useState(1);

  // Derive unique categories and years
  const categories = useMemo(() => {
    const cats = new Set(artworks.map(a => a.category));
    return ['Tutti', ...Array.from(cats)];
  }, [artworks]);

  // Helper to extract year from date string
  const getYear = (date: string) => {
    const match = date.match(/\d{4}/);
    return match ? match[0] : 'Unknown';
  };

  const years = useMemo(() => {
    const yrs = new Set(artworks.map(a => getYear(a.date)));
    return ['Tutti', ...Array.from(yrs).sort().reverse()];
  }, [artworks]);

  // Filter Logic
  const filteredArtworks = useMemo(() => {
    return artworks.filter(art => {
      const matchCategory = selectedCategory === 'Tutti' || art.category === selectedCategory;
      const matchYear = selectedYear === 'Tutti' || getYear(art.date) === selectedYear;
      return matchCategory && matchYear;
    });
  }, [artworks, selectedCategory, selectedYear]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
  const paginatedArtworks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArtworks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArtworks, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedYear]);

  // Scroll to top of grid on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="pt-24 min-h-screen pb-24 max-w-7xl mx-auto px-6 animate-reveal">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Archivio Opere</h2>
        <div className="w-16 h-1 bg-red-600 mx-auto"></div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-y border-neutral-100 py-6 gap-6 sticky top-20 bg-white z-40">
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0">
          <span className="text-xs font-bold uppercase tracking-widest mr-4 self-center hidden md:block">Tecnica:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all whitespace-nowrap ${selectedCategory === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-xs font-bold uppercase tracking-widest mr-2">Anno:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 text-xs uppercase tracking-widest border border-neutral-200 bg-white outline-none focus:border-black cursor-pointer"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginatedArtworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {paginatedArtworks.map((art) => (
            <div
              key={art.id}
              className="group cursor-pointer relative"
              onClick={() => onSelectArtwork(art)}
            >
              <div className="overflow-hidden bg-neutral-100 aspect-[16/10] relative">
                {/* 
                  Refined Hover Effect: 
                  - scale-105: Subtle zoom
                  - opacity-90 -> opacity-100: Slight lighting up effect on hover
                  - grayscale -> grayscale-0: Maintains the B&W to Color transition
                */}
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out 
                             opacity-90 group-hover:opacity-100 
                             group-hover:scale-105"
                />

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs font-bold tracking-[0.2em] border border-white px-6 py-3 bg-black/20 backdrop-blur-sm">
                    VEDI DETTAGLI
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline group-hover:text-red-600 transition-colors duration-300">
                <h3 className="text-xl font-bold font-mono text-black">{art.title}</h3>
                <span className="text-xs font-mono text-neutral-400">{art.date}</span>
              </div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">{art.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-400">
          <p>Nessuna opera trovata con i filtri selezionati.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center border border-neutral-200 disabled:opacity-30 hover:border-black transition-colors"
          >
            &larr;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-all ${currentPage === page
                ? 'bg-red-600 text-white'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center border border-neutral-200 disabled:opacity-30 hover:border-black transition-colors"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default FullGallery;