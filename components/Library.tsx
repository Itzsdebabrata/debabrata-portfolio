import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  filter: string;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, filter, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const isFlagship = project.id === 'flagship';
  const spanClass = isFlagship 
    ? 'md:col-span-4 md:row-span-2' 
    : (index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 md:row-span-1');

  // 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Parallax Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the card is from the center of the viewport
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = cardCenter - viewportCenter;
      
      // Move image based on scroll position relative to viewport center
      setParallaxOffset(distance * 0.05);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={cardRef}
      key={`${project.id}-${filter}`}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={`interactive group relative rounded-[2rem] overflow-hidden bg-gray-900 border border-white/5 cursor-pointer transition-all duration-300 ease-out hover:border-white/20 shadow-2xl ${spanClass}`}
    >
      <div 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            style={{ 
              transform: `translateY(${parallaxOffset}px) scale(1.2)`,
              transition: 'transform 0.1s linear'
            }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
        
        {/* Deep Layer for Text - 3D Effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"
          style={{ transform: 'translateZ(20px)' }}
        ></div>
        
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-end"
          style={{ transform: 'translateZ(50px)' }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-2 group-hover:text-indigo-400 transition-colors">
            {project.category}
          </span>
          <h3 
            className={`${isFlagship ? 'text-4xl md:text-6xl' : 'text-2xl'} font-display font-black leading-none reveal-up`}
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            {project.title}
          </h3>
          {isFlagship && (
            <p className="mt-4 text-gray-400 max-w-sm text-sm md:text-base opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Library: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'Mobile' | 'AI' | 'Design'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const currentIndex = selectedProject 
    ? filteredProjects.findIndex(p => p.id === selectedProject.id) 
    : -1;

  const handleProjectClick = (project: Project) => {
    setIsImageLoading(true);
    setIsPreviewMode(false);
    setSelectedProject(project);
    const modal = document.querySelector('.relative.glass');
    if (modal) modal.scrollTop = 0;
  };

  const goToNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    handleProjectClick(filteredProjects[nextIndex]);
  }, [currentIndex, filteredProjects]);

  const goToPrevious = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    handleProjectClick(filteredProjects[prevIndex]);
  }, [currentIndex, filteredProjects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'Escape') {
        if (isPreviewMode) setIsPreviewMode(false);
        else setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isPreviewMode, goToNext, goToPrevious]);

  const togglePreview = () => {
    if (selectedProject?.demoUrl && selectedProject.demoUrl !== '#') {
      setIsPreviewMode(!isPreviewMode);
      setIframeLoading(true);
    } else {
      alert("Demo not available for this legacy internal tool.");
    }
  };

  const getRelatedProjects = (project: Project) => {
    return PROJECTS.filter(p => p.category === project.category && p.id !== project.id).slice(0, 2);
  };

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto page-transition">
      <header className="mb-20 text-center">
        <h1 className="text-[10vw] md:text-[8vw] font-display font-black tracking-tighter leading-none mb-6">
          LIBRARY
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
          A curated selection of high-end digital products, engineering experiments, and visual prototypes.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-2 mb-20">
        {['All', 'Web', 'Mobile', 'AI', 'Design'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              filter === cat 
                ? 'bg-white text-black' 
                : 'text-gray-500 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px]">
        {filteredProjects.map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={idx} 
            filter={filter} 
            onClick={handleProjectClick} 
          />
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative glass w-full max-w-6xl h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-12 duration-700">
            <div className="absolute top-0 left-0 right-0 z-[140] pt-6 px-8 flex justify-between pointer-events-none">
              <div className="flex gap-4 pointer-events-auto">
                {!isPreviewMode && (
                  <>
                    <button onClick={goToPrevious} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all backdrop-blur-md border border-white/10 shadow-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={goToNext} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all backdrop-blur-md border border-white/10 shadow-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </>
                )}
                {isPreviewMode && (
                  <button onClick={() => setIsPreviewMode(false)} className="flex items-center gap-3 px-6 h-12 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest transition-all shadow-xl">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                    Back to Details
                  </button>
                )}
              </div>
              <button onClick={() => setSelectedProject(null)} className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all backdrop-blur-md border border-white/10 shadow-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="h-full w-full flex flex-col lg:flex-row overflow-y-auto no-scrollbar">
              <div className={`transition-all duration-700 ease-in-out relative bg-gray-900 ${isPreviewMode ? 'w-full h-full min-h-[90vh]' : 'lg:w-3/5 h-[400px] lg:h-auto overflow-hidden'}`}>
                {isPreviewMode ? (
                  <div className="w-full h-full pt-24 bg-[#1a1a1a]">
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-900/80 backdrop-blur-sm">
                        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Establishing Secure Tunnel...</span>
                      </div>
                    )}
                    <iframe src={selectedProject.demoUrl} className="w-full h-full border-none" title={`Live Demo - ${selectedProject.title}`} onLoad={() => setIframeLoading(false)} />
                  </div>
                ) : (
                  <>
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img key={selectedProject.id} src={selectedProject.imageUrl} alt={selectedProject.title} className={`w-full h-full object-cover transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setIsImageLoading(false)} />
                  </>
                )}
              </div>

              {!isPreviewMode && (
                <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-black uppercase text-[10px] tracking-[0.2em]">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-none">{selectedProject.title}</h2>
                  <p className="text-gray-400 text-lg mb-10 leading-relaxed">{selectedProject.longDescription || selectedProject.description}</p>
                  <div className="mb-12">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Built With</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mb-16">
                    <button onClick={togglePreview} className="flex-1 interactive bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center shadow-xl hover:scale-105 active:scale-95 transition-all">Live Demo</button>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 interactive border border-white/10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest text-center hover:bg-white/5 transition-all">GitHub</a>
                  </div>
                  {getRelatedProjects(selectedProject).length > 0 && (
                    <div className="border-t border-white/10 pt-10">
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">Related Projects</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {getRelatedProjects(selectedProject).map((related) => (
                          <div key={related.id} onClick={() => handleProjectClick(related)} className="interactive group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-black/40 border border-white/5 hover:border-white/20 transition-all">
                            <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all"></div>
                            <div className="absolute inset-0 p-4 flex flex-col justify-end"><h5 className="text-sm font-display font-bold">{related.title}</h5></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;