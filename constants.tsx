import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'flagship',
    title: 'Debabrata Experience',
    description: 'The definitive version of my professional digital presence.',
    longDescription: 'You are currently experiencing it. This platform serves as a benchmark for high-performance React applications, featuring custom cursor tracking, a Gemini-powered AI brain, and fluid motion design optimized for modern browsers.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Gemini AI', 'Tailwind', 'Vite'],
    demoUrl: 'https://www.wikipedia.org', // Real URL for demo
    githubUrl: 'https://github.com',
    category: 'Web'
  },
  {
    id: '1',
    title: 'Nexus DeFi Dashboard',
    description: 'A comprehensive crypto portfolio management tool with real-time analytics.',
    longDescription: 'Nexus is a high-performance DeFi dashboard that aggregates data from multiple chains. It features advanced chart visualizations using D3.js and provides real-time gas monitoring.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1964&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Tailwind', 'D3.js', 'Solidity'],
    demoUrl: 'https://www.tradingview.com', // Real URL for demo
    githubUrl: 'https://github.com',
    category: 'Web'
  },
  {
    id: '2',
    title: 'AI Prompt Engineer Pro',
    description: 'An AI-powered tool for generating high-quality prompts for various LLMs.',
    longDescription: 'Leveraging Gemini API, this tool helps users refine their prompts for better output consistency across different AI models. It includes a prompt library and versioning.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1964&auto=format&fit=crop',
    techStack: ['React', 'Gemini SDK', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://www.bing.com', // Real URL for demo
    githubUrl: 'https://github.com',
    category: 'AI'
  },
  {
    id: '3',
    title: 'WonderTales AI',
    description: 'An immersive AI-powered storytelling platform for children.',
    longDescription: 'WonderTales creates personalized, interactive narrative experiences. Using generative AI, it adapts stories to a child\'s interests and reading level, accompanied by magically generated illustrations and a playful interface designed for high engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop',
    techStack: ['Next.js', 'Gemini API', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://wondertalesin1.com.cdoo',
    githubUrl: 'https://github.com',
    category: 'Web'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React/Next.js', level: 95, icon: '⚛️', category: 'Frontend' },
  { name: 'TypeScript', level: 90, icon: '📘', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 98, icon: '🎨', category: 'Frontend' },
  { name: 'Node.js', level: 85, icon: '🟢', category: 'Backend' },
  { name: 'Gemini AI', level: 80, icon: '✨', category: 'Others' },
  { name: 'UI/UX Design', level: 88, icon: '📐', category: 'Design' },
  { name: 'Git/GitHub', level: 92, icon: '📂', category: 'Tools' },
];