import React, { useEffect } from 'react';
import { Artwork } from '../types';

interface ArtworkDetailProps {
  artwork: Artwork;
  artworks: Artwork[];
  onBack: () => void;
  onNavigate: (artwork: Artwork) => void;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artwork, artworks, onBack, onNavigate }) => {
  const currentIndex = artworks.findIndex(a => a.id === artwork.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [artwork.id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed top bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100 h-16 flex items-center justify-between px-4 md:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs tracking-widest font-bold uppercase hover:text-red-600 transition-colors duration-200 py-2 pr-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          OPERE
        </button>

        <span className="text-xs text-neutral-400 font-mono">
          {currentIndex + 1} / {artworks.length}
        </span>

        {/* Prev / Next compact buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => hasPrev && onNavigate(artworks[currentIndex - 1])}
            disabled={!hasPrev}
            className="w-10 h-10 flex items-center justify-center border border-neutral-200 disabled:opacity-25 hover:border-black transition-colors rounded-none"
            aria-label="Opera precedente"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => hasNext && onNavigate(artworks[currentIndex + 1])}
            disabled={!hasNext}
            className="w-10 h-10 flex items-center justify-center border border-neutral-200 disabled:opacity-25 hover:border-black transition-colors rounded-none"
            aria-label="Opera successiva"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="pt-16 bg-neutral-50">
        <div className="w-full flex items-center justify-center bg-neutral-100" style={{ minHeight: '28vw', maxHeight: '40vh' }}>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: '40vh' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-8 py-8 max-w-3xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold font-mono leading-tight mb-1">{artwork.title}</h1>
          <p className="text-neutral-400 font-mono text-base">{artwork.date}</p>
        </div>

        <div className="w-10 h-0.5 bg-red-600 mb-8"></div>

        {/* Technical details */}
        <div className="mb-8 divide-y divide-neutral-100">
          <div className="flex py-3 gap-4">
            <span className="w-24 shrink-0 text-xs text-neutral-400 uppercase tracking-widest pt-1">Tecnica</span>
            <span className="text-base text-neutral-800 leading-relaxed">{artwork.technique}</span>
          </div>
          <div className="flex py-3 gap-4">
            <span className="w-24 shrink-0 text-xs text-neutral-400 uppercase tracking-widest pt-1">Categoria</span>
            <span className="text-base text-neutral-800">{artwork.category}</span>
          </div>
          <div className="flex py-3 gap-4">
            <span className="w-24 shrink-0 text-xs text-neutral-400 uppercase tracking-widest pt-1">Dimensioni</span>
            <span className="text-base text-neutral-800">{artwork.dimensions}</span>
          </div>
          {artwork.operaNumber && (
            <div className="flex py-3 gap-4">
              <span className="w-24 shrink-0 text-xs text-neutral-400 uppercase tracking-widest pt-1">N. Opera</span>
              <span className="text-base text-neutral-800">{artwork.operaNumber}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed text-neutral-600 text-justify mb-10">
          {artwork.description}
        </p>

        {/* CTA */}
        <button
          onClick={() => {
            const subject = encodeURIComponent(`Richiesta informazioni: ${artwork.title}`);
            const body = encodeURIComponent(
              `Salve,\n\nVorrei ricevere maggiori informazioni sull'opera "${artwork.title}" (${artwork.date}).\n\nDettagli:\nTecnica: ${artwork.technique}\nDimensioni: ${artwork.dimensions}\n\nGrazie.`
            );
            window.location.href = `mailto:virno.marco@gmail.com?subject=${subject}&body=${body}`;
          }}
          className="w-full py-4 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-red-600 transition-colors duration-300 mb-6"
        >
          Richiedi Informazioni
        </button>

        {/* Prev / Next full buttons (bottom) */}
        <div className="flex gap-3 mb-12">
          <button
            onClick={() => hasPrev && onNavigate(artworks[currentIndex - 1])}
            disabled={!hasPrev}
            className="flex-1 py-4 border border-neutral-200 text-xs tracking-widest uppercase disabled:opacity-30 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Precedente
          </button>
          <button
            onClick={() => hasNext && onNavigate(artworks[currentIndex + 1])}
            disabled={!hasNext}
            className="flex-1 py-4 border border-neutral-200 text-xs tracking-widest uppercase disabled:opacity-30 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
          >
            Successiva
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
