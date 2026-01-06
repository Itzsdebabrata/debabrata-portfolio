import React, { useEffect, useRef, useState } from 'react';
import { SKILLS } from '../constants';

const ConnectionMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;
    const mouse = { x: -1000, y: -1000, radius: 200 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.8)';
        ctx.fill();
      }
    }

    const init = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 group">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
      
      {/* Decorative Overlay Info */}
      <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end pointer-events-none">
        <div className="reveal-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Global Infrastructure</span>
          </div>
          <h3 className="text-3xl font-display font-black mb-2">Connected Systems</h3>
          <p className="text-gray-500 text-sm max-w-xs">Building bridges between logic and art through scalable network architectures.</p>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-7xl mx-auto page-transition">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
        <div className="reveal-up">
          <h1 className="text-[8vw] md:text-[6vw] font-display font-black leading-[0.9] mb-12 tracking-tighter">
            DRIVEN BY <br />
            <span className="text-outline" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>PRECISION.</span>
          </h1>
          <div className="space-y-8 text-gray-500 text-xl leading-relaxed max-w-xl">
            <p>
              I am a Senior Software Engineer specializing in the architecture of high-fidelity digital experiences.
            </p>
            <p>
              My workflow integrates advanced UI engineering with the latest in Generative AI, creating interfaces that aren't just usable, but memorable.
            </p>
            <p className="text-white font-medium">
              The goal isn't just to connect dots, but to orchestrate the movement of information with cinematic grace.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-12 border-t border-white/5 pt-12">
            <div>
              <div className="text-6xl font-display font-black mb-2">08+</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">Years of Research</div>
            </div>
            <div>
              <div className="text-6xl font-display font-black mb-2">50+</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest font-bold">Live Platforms</div>
            </div>
          </div>
        </div>

        {/* New Connection Map Visual Component */}
        <div className="reveal-up" style={{ animationDelay: '0.3s' }}>
          <ConnectionMap />
        </div>
      </div>

      {/* Skills Section Below */}
      <div className="mt-40 grid grid-cols-1 lg:grid-cols-3 gap-12 reveal-up" style={{ animationDelay: '0.5s' }}>
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-display font-black mb-6">THE CORE <br/>TECH STACK</h2>
          <p className="text-gray-500 leading-relaxed">My expertise spans the entire development lifecycle, from high-level architecture to pixel-perfect frontend execution.</p>
        </div>
        
        <div className="lg:col-span-2">
          <div className="glass p-12 rounded-[3rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {SKILLS.map((skill, idx) => (
                <div key={skill.name} className="group cursor-default">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-500">{skill.icon}</span>
                      <span className="font-display font-bold text-lg group-hover:text-indigo-400 transition-colors">{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white group-hover:bg-indigo-500 transition-all duration-[2000ms] ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;