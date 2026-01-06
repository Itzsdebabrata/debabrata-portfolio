import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'library', label: 'Library' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
        : 'py-12 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="interactive group flex items-center gap-4 outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-black font-black text-xl transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg">
            D
          </div>
          <span className="font-display font-black text-2xl tracking-tighter hidden md:block group-hover:tracking-[0.1em] transition-all duration-700">DEBABRATA</span>
        </button>

        {/* Minimal Nav */}
        <div className={`flex items-center gap-1 p-1 rounded-full transition-all duration-500 ${
          scrolled ? 'bg-white/5' : ''
        }`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`interactive px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-white text-black' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping absolute inset-0"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live 2024</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;