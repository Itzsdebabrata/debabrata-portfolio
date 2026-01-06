import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'flagship',
    title: 'Galaxy Portfolio',
    description: 'A stunning modern portfolio with cosmic-inspired design and smooth animations.',
    longDescription: 'Galaxy Portfolio is a premium, fully responsive portfolio template featuring a stunning cosmic theme with smooth animations, dark mode optimization, and blazing-fast performance. Built with modern web technologies for showcase and demonstration.',
    imageUrl: 'https://images.unsplash.com/photo-1635320066175-dbf13d992c48?q=80&w=1964&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Animations'],
    demoUrl: 'https://github.com/techinz/galaxy-portfolio',
    githubUrl: 'https://github.com/Debabrata/galaxy-portfolio',
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