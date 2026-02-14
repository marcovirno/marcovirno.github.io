import React from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the mailto link
    const subject = encodeURIComponent(`Nuovo messaggio dal sito web di ${formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Messaggio:\n${formData.message}`
    );

    const mailtoLink = `mailto:virno.marco@gmail.com?subject=${subject}&body=${body}`;

    // Open the user's email client
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Contatti</h2>
        <p className="text-neutral-400 mb-12">Per informazioni e acquisizioni.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-8">
            <div>
              <h4 className="text-red-600 text-xs tracking-widest uppercase mb-2">Studio</h4>
              <p className="text-xl font-light">Santa Maria Capua Vetere (CE), Italia</p>
            </div>
            <div>
              <h4 className="text-red-600 text-xs tracking-widest uppercase mb-2">Email</h4>
              <a href="mailto:virno.marco@gmail.com" className="text-xl font-light hover:text-red-600 transition-colors">
                virno.marco@gmail.com
              </a>
            </div>
            <div>
              <h4 className="text-red-600 text-xs tracking-widest uppercase mb-2">Social</h4>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/marco_virno" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1D6Ctt89ir/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@marco_virno" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-neutral-700 focus:border-red-600 py-2 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-neutral-700 focus:border-red-600 py-2 outline-none transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Messaggio</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-neutral-700 focus:border-red-600 py-2 outline-none transition-colors resize-none"
              ></textarea>
            </div>
            <button type="submit" className="px-8 py-3 bg-white text-black text-xs font-bold tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
              INVIA
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;