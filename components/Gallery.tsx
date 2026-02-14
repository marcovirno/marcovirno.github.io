import React from 'react';
import { Artwork } from '../types';

interface GalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onViewFullGallery: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ artworks, onSelectArtwork, onViewFullGallery }) => {
  // Show only first 4 items for the homepage
  const recentArtworks = artworks.slice(0, 4);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:px-0 w-full mb-16">
        {recentArtworks.map((art, index) => (
          <div
            key={art.id}
            className="group relative w-full cursor-pointer animate-reveal"
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => onSelectArtwork(art)}
          >
            {/* Container with Landscape Aspect Ratio */}
            <div className="overflow-hidden bg-neutral-100 aspect-[16/10] relative">
              <img
                src={art.imageUrl}
                alt={art.title}
                loading="lazy"
                width={800}
                height={500}
                className="w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />

              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-white text-3xl font-bold font-mono tracking-wide">{art.title}</h3>
                    <span className="text-red-500 font-mono text-sm">{art.date}</span>
                  </div>
                  <div className="w-0 group-hover:w-12 h-0.5 bg-red-600 mt-4 transition-all duration-700 delay-100"></div>
                  <p className="text-neutral-300 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 tracking-widest uppercase">
                    {art.category} — Scopri di più
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewFullGallery}
        className="group relative px-12 py-4 border border-black overflow-hidden bg-transparent hover:bg-black transition-all duration-300"
      >
        <span className="relative z-10 text-xs font-bold tracking-[0.2em] group-hover:text-white transition-colors duration-300">
          VISUALIZZA TUTTE LE OPERE
        </span>
      </button>
    </div>
  );
};

export default Gallery;