export enum ImageSize {
  Resolution_1K = '1K',
  Resolution_2K = '2K',
  Resolution_4K = '4K'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface Project {
  title: string;
  problem: string;
  architecture: string;
  result: string;
  details: string; // New field for deep dive content
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string; // Added for visual identity
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface MapSource {
  uri: string;
  title: string;
}

export enum LabTab {
  ARCHITECT = 'ARCHITECT', // Thinking model
  MARKET = 'MARKET', // Search
  GEO = 'GEO', // Maps
  VISUAL = 'VISUAL', // Image Gen/Edit/Analyze
  CHAT = 'CHAT' // General Chat
}