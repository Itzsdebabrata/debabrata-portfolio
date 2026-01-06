import React from 'react';

const Home: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Content */}
      <section className="px-6 md:px-12 py-20 flex flex-col justify-center min-h-[85vh]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="reveal-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-indigo-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Digital Experience Designer
            </span>
          </div>
          
          <h1 className="text-[14vw] md:text-[12vw] leading-[0.85] font-display font-black tracking-[-0.06em] mb-12 reveal-up" style={{ animationDelay: '0.3s' }}>
            <span className="block text-white">DEBABRATA</span>
            <span className="block text-outline opacity-20 hover:opacity-100 transition-opacity duration-700" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>STUDIO</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <p className="text-gray-500 text-lg md:text-2xl leading-tight max-w-md reveal-up font-medium" style={{ animationDelay: '0.5s' }}>
              We build immersive digital platforms that bridge the gap between imagination and execution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 reveal-up" style={{ animationDelay: '0.7s' }}>
              <button 
                onClick={() => onNavigate('library')}
                className="interactive px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:scale-110 active:scale-95 transition-all"
              >
                Project Library
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="interactive px-10 py-5 border border-white/20 text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black transition-all"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section - High Reel Vibe */}
      <div className="py-20 border-y border-white/5 bg-white/[0.02] marquee">
        <div className="marquee-content text-[10vw] font-display font-black tracking-tighter uppercase whitespace-nowrap">
          <span className="mx-10">Creative Coding</span>
          <span className="mx-10 text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>• Voice Assistant Developer •</span>
          <span className="mx-10">Web Developer</span>
          <span className="mx-10 text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>• Social Media Manager •</span>
          {/* Duplicate for seamless scroll */}
          <span className="mx-10">Creative Coding</span>
          <span className="mx-10 text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>• Voice Assistant Developer •</span>
          <span className="mx-10">Web Developer</span>
          <span className="mx-10 text-outline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>• Social Media Manager •</span>
        </div>
      </div>

      {/* Featured Teaser */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-display font-bold">Featured Works</h2>
            <button onClick={() => onNavigate('library')} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">View All &rarr;</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div 
              className="interactive group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 cursor-pointer"
              onClick={() => onNavigate('library')}
             >
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute bottom-10 left-10">
                 <h3 className="text-3xl font-display font-black">DEBABRATA EXPERIENCE</h3>
                 <p className="text-sm text-gray-400">Flagship Showcase 2024</p>
               </div>
             </div>
             
             <div 
              className="interactive group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 cursor-pointer mt-12 md:mt-24"
              onClick={() => onNavigate('library')}
             >
               <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
               <div className="absolute bottom-10 left-10">
                 <h3 className="text-3xl font-display font-black">NEXUS DEFI</h3>
                 <p className="text-sm text-gray-400">Fintech Platform</p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;