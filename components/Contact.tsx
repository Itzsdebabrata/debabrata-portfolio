import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your service ID
    emailjs.init('service_ud8uirn');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      message: formState.message,
      to_email: 'debabratamal868@gmail.com',
    };

    emailjs
      .send('service_ud8uirn', 'template_r64kqrx', templateParams)
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        setIsSubmitting(false);
        alert('Failed to send message. Please try again.');
      });
  };

  const socialLinks = [
    { name: 'LinkedIn', url: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', url: '#', color: 'hover:text-sky-400' },
    { name: 'GitHub', url: '#', color: 'hover:text-white' },
    { name: 'Dribbble', url: '#', color: 'hover:text-pink-400' },
  ];

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-7xl mx-auto page-transition">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left Column: Branding & Info */}
        <div className="space-y-12">
          <div className="reveal-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-black uppercase text-[10px] tracking-[0.4em] mb-8">
              Available for Work
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-black leading-tight tracking-tighter mb-8">
              LET'S CREATE <br />
              <span className="text-outline" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>HISTORY.</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed max-w-lg font-medium">
              Every great project starts with a conversation. Let's discuss your vision and see how we can push the boundaries of what's possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass group p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500 cursor-pointer border border-white/5 hover:border-indigo-500/30">
              <a href="mailto:debabratamal868@gmail.com" className="block">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-500">
                  <svg className="w-6 h-6 text-indigo-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Direct Email</h4>
                <p className="text-lg font-display font-bold break-words">debabratamal868@gmail.com</p>
              </a>
            </div>

            <div className="glass group p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500 cursor-pointer border border-white/5 hover:border-purple-500/30">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-500">
                <svg className="w-6 h-6 text-purple-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Discord Presence</h4>
              <p className="text-lg font-display font-bold">debabrata#7777</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 reveal-up" style={{ animationDelay: '0.4s' }}>
            {socialLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.url} 
                className={`text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ${link.color} transition-all duration-500 hover:-translate-y-1`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="relative reveal-up" style={{ animationDelay: '0.3s' }}>
          {/* Decorative Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-16 overflow-hidden">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-4xl font-display font-black mb-4">MESSAGE RECEIVED</h3>
                <p className="text-gray-400 text-lg mb-12 max-w-xs mx-auto">I've received your transmission. Expect a response within 24 standard hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Return to Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2 group">
                  <label className="block text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] transition-colors group-focus-within:text-indigo-400">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-lg placeholder:text-gray-700 font-medium"
                    placeholder="E.g. Elon Musk"
                  />
                </div>
                
                <div className="space-y-2 group">
                  <label className="block text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] transition-colors group-focus-within:text-indigo-400">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-lg placeholder:text-gray-700 font-medium"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="block text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] transition-colors group-focus-within:text-indigo-400">Your Vision</label>
                  <textarea 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-lg resize-none placeholder:text-gray-700 font-medium"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full group overflow-hidden bg-white text-black py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-900 disabled:text-gray-500"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                    ) : (
                      <>
                        SEND MESSAGE
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;