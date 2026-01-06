
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  category: 'Web' | 'Mobile' | 'AI' | 'Design';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Others' | 'Design';
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}