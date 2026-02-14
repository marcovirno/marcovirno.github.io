import React from 'react';
import { Artwork } from '../types';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onContact: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose, onContact }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative w-full max-w-6xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-neutral-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Image Section */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-auto bg-neutral-100 flex items-center justify-center p-8 relative overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className={`w-full h-full object-contain shadow-lg`}
          />
        </div>

        {/* Info/Controls Section */}
        <div className="w-full md:w-2/5 flex flex-col">
          <div className="flex border-b border-neutral-100">
            <div className={`flex-1 py-3 pl-4 md:pl-8 text-xs font-bold tracking-widest uppercase bg-white text-black`}>Dettagli</div>
          </div>

          <div className="flex-1 p-4 md:p-8 overflow-y-auto no-scrollbar">
            <div className="space-y-6 md:space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold font-mono text-black mb-2 leading-tight">{artwork.title}</h2>
                <p className="text-neutral-500 font-mono">{artwork.date}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex border-b border-neutral-100 py-2">
                  <span className="w-24 text-neutral-400">Tecnica</span>
                  <span>{artwork.technique}</span>
                </div>
                <div className="flex border-b border-neutral-100 py-2">
                  <span className="w-24 text-neutral-400">Categoria</span>
                  <span>{artwork.category}</span>
                </div>
                <div className="flex border-b border-neutral-100 py-2">
                  <span className="w-24 text-neutral-400">Dimensioni</span>
                  <span>{artwork.dimensions}</span>
                </div>
                {artwork.operaNumber && (
                  <div className="flex border-b border-neutral-100 py-2">
                    <span className="w-24 text-neutral-400">N. Opera</span>
                    <span>{artwork.operaNumber}</span>
                  </div>
                )}
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="leading-relaxed text-neutral-600 text-justify">
                  {artwork.description}
                </p>
              </div>

              <button
                onClick={() => {
                  const subject = encodeURIComponent(`Richiesta informazioni: ${artwork.title}`);
                  const body = encodeURIComponent(
                    `Salve,\n\nVorrei ricevere maggiori informazioni sull'opera "${artwork.title}" (${artwork.date}).\n\nDettagli:\nTecnica: ${artwork.technique}\nDimensioni: ${artwork.dimensions}\n\nGrazie.`
                  );
                  window.location.href = `mailto:virno.marco@gmail.com?subject=${subject}&body=${body}`;
                }}
                className="w-full py-4 border border-black hover:bg-black hover:text-white transition-all uppercase text-xs tracking-widest font-bold mt-4 md:mt-8"
              >
                Richiedi Informazioni
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;