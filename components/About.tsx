import React from 'react';
import { BIO_TEXT, ARTIST_PROFILE_PHOTO, BIO_EVENTS } from '../constants';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Photo Section */}
        <div className="relative h-full min-h-[320px]">
          <div className="h-full bg-neutral-200 overflow-hidden">
            <img
              src={ARTIST_PROFILE_PHOTO}
              alt="Marco Virno Portrait"
              className="w-full h-full object-cover grayscale contrast-125 block"
            />
          </div>
        </div>

        {/* Bio Text Section */}
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">L'Artista</h2>
          <div className="w-12 h-1 bg-red-600 mb-8"></div>

          <p className="text-neutral-600 leading-relaxed text-lg text-justify">
            {BIO_TEXT.IT}
          </p>
        </div>

        {/* Exhibitions & Publications Section - Moved under Photo */}
        <div>
          <h3 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-black pb-4">
            ESPOSIZIONI & PUBBLICAZIONI
          </h3>

          <ul className="space-y-4">
            {BIO_EVENTS.map((event) => (
              <li key={event.id} className="text-justify group cursor-default">
                <span className="font-serif text-lg group-hover:text-red-600 transition-colors">
                  <span className="font-bold">{event.date}</span> - <span className="italic">{event.title}</span>
                  {event.location && <span> - {event.location}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative Red Square - Moved under Description */}
        <div className="flex flex-col justify-end items-end">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-red-600 bg-transparent"></div>
            <div className="absolute top-[35%] -left-8 w-24 h-3 bg-black transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;