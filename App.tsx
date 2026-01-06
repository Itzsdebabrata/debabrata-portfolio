import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Library from './components/Library';
import Contact from './components/Contact';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveTab(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setActiveTab(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'about': return <About />;
      case 'library': return <Library />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar activeTab={activeTab} onNavigate={navigate} />
      
      <main className="relative z-10">
        <div key={activeTab}>
          {renderContent()}
        </div>
      </main>

      {/* Premium Social Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black font-black text-2xl">D</div>
              <span className="font-display font-black text-3xl tracking-tighter">DEBABRATA</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
              Crafting premium digital experiences through minimal aesthetics and intelligent code.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-10 items-center">
              {/* Instagram */}
              <a href="https://instagram.com/itzs_debabrata" target="_blank" rel="noopener noreferrer" className="interactive group flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-pink-500 transition-all duration-500 transform group-hover:-translate-y-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">IG</span>
                <span className="text-xs text-gray-400">@itzs_debabrata</span>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/debabratamal1009/" target="_blank" rel="noopener noreferrer" className="interactive group flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-blue-600 transition-all duration-500 transform group-hover:-translate-y-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">FB</span>
                <span className="text-xs text-gray-400">Debabrata Mal</span>
              </a>
              {/* YouTube */}
              <a href="#" className="interactive group flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-red-600 transition-all duration-500 transform group-hover:-translate-y-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">YT</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-10">
             <div className="flex gap-12 font-black uppercase text-[10px] tracking-widest text-gray-500">
              <button onClick={() => navigate('home')} className="hover:text-white transition-all">Home</button>
              <button onClick={() => navigate('about')} className="hover:text-white transition-all">About</button>
              <button onClick={() => navigate('library')} className="hover:text-white transition-all">Library</button>
              <button onClick={() => navigate('contact')} className="hover:text-white transition-all">Contact</button>
            </div>
            <div className="text-gray-800 text-[10px] font-black uppercase tracking-[0.5em]">
              © 2024 DEBABRATA EXPERIENCE
            </div>
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;