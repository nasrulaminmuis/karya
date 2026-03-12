export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  role: "DEVELOPER" | "ADMIN" | "VIEWER";
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  impressions: number;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export interface AnalyticsData {
  date: string;
  views: number;
  impressions: number;
  interactions: number;
}

export const mockUser: User = {
  id: "1",
  name: "Andi Pratama",
  email: "andi@example.com",
  username: "andipratama",
  bio: "Full-stack developer dengan pengalaman 5+ tahun dalam membangun aplikasi web modern. Passionate tentang React, TypeScript, dan arsitektur cloud.",
  avatarUrl: null,
  role: "DEVELOPER",
  githubUrl: "https://github.com/andipratama",
  linkedinUrl: "https://linkedin.com/in/andipratama",
  websiteUrl: "https://andipratama.dev",
  createdAt: "2024-01-15T00:00:00Z",
};

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "E-Commerce Platform",
    description: "Platform e-commerce full-stack dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibangun dengan Next.js, Prisma, dan Stripe.",
    imageUrl: "/projects/ecommerce.jpg",
    githubUrl: "https://github.com/andipratama/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind CSS"],
    userId: "1",
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-06-15T00:00:00Z",
    views: 1250,
    impressions: 3400,
  },
  {
    id: "p2",
    title: "Task Management App",
    description: "Aplikasi manajemen tugas real-time dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi. Menggunakan WebSocket untuk update real-time.",
    imageUrl: "/projects/taskmanager.jpg",
    githubUrl: "https://github.com/andipratama/taskmanager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Material UI"],
    userId: "1",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-05-10T00:00:00Z",
    views: 890,
    impressions: 2100,
  },
  {
    id: "p3",
    title: "AI Chat Assistant",
    description: "Chatbot berbasis AI dengan integrasi OpenAI GPT-4. Mendukung percakapan multi-turn, konteks memori, dan respons streaming.",
    imageUrl: "/projects/aichat.jpg",
    githubUrl: "https://github.com/andipratama/aichat",
    liveUrl: "https://aichat-demo.vercel.app",
    tags: ["Next.js", "OpenAI", "TypeScript", "Vercel AI SDK", "Tailwind CSS"],
    userId: "1",
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-07-20T00:00:00Z",
    views: 2100,
    impressions: 5600,
  },
  {
    id: "p4",
    title: "Weather Dashboard",
    description: "Dashboard cuaca interaktif dengan visualisasi data, prakiraan 7 hari, dan peta cuaca. Menggunakan OpenWeatherMap API.",
    imageUrl: "/projects/weather.jpg",
    githubUrl: "https://github.com/andipratama/weather",
    liveUrl: "https://weather-demo.vercel.app",
    tags: ["React", "Recharts", "OpenWeatherMap", "CSS Modules"],
    userId: "1",
    createdAt: "2023-11-15T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
    views: 650,
    impressions: 1800,
  },
];

export const mockSkills: Skill[] = [
  { id: "s1", name: "React", level: "Expert", category: "Frontend" },
  { id: "s2", name: "TypeScript", level: "Expert", category: "Language" },
  { id: "s3", name: "Next.js", level: "Advanced", category: "Frontend" },
  { id: "s4", name: "Node.js", level: "Advanced", category: "Backend" },
  { id: "s5", name: "PostgreSQL", level: "Intermediate", category: "Database" },
  { id: "s6", name: "Docker", level: "Intermediate", category: "DevOps" },
  { id: "s7", name: "Tailwind CSS", level: "Expert", category: "Frontend" },
  { id: "s8", name: "Prisma", level: "Advanced", category: "Backend" },
  { id: "s9", name: "AWS", level: "Intermediate", category: "Cloud" },
  { id: "s10", name: "Git", level: "Expert", category: "Tools" },
  { id: "s11", name: "Python", level: "Intermediate", category: "Language" },
  { id: "s12", name: "GraphQL", level: "Intermediate", category: "Backend" },
];

export const mockCertificates: Certificate[] = [
  {
    id: "c1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024-02-15",
    description: "Sertifikasi arsitektur solusi cloud AWS yang mencakup desain sistem terdistribusi, keamanan, dan optimasi biaya.",
    url: "https://aws.amazon.com/certification",
  },
  {
    id: "c2",
    name: "Meta Front-End Developer Professional",
    issuer: "Meta (Coursera)",
    date: "2023-08-20",
    description: "Program sertifikasi profesional yang mencakup React, JavaScript, HTML/CSS, dan metodologi pengembangan modern.",
    url: "https://coursera.org",
  },
  {
    id: "c3",
    name: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    date: "2023-11-10",
    description: "Sertifikasi profesional untuk merancang dan membangun sistem pemrosesan data di Google Cloud Platform.",
  },
];

export const mockAnalytics: AnalyticsData[] = [
  { date: "2024-01", views: 320, impressions: 890, interactions: 45 },
  { date: "2024-02", views: 450, impressions: 1200, interactions: 67 },
  { date: "2024-03", views: 580, impressions: 1500, interactions: 89 },
  { date: "2024-04", views: 720, impressions: 1850, interactions: 112 },
  { date: "2024-05", views: 890, impressions: 2300, interactions: 145 },
  { date: "2024-06", views: 1100, impressions: 2800, interactions: 178 },
  { date: "2024-07", views: 1350, impressions: 3400, interactions: 210 },
];

export const mockDevelopers: User[] = [
  mockUser,
  {
    id: "2",
    name: "Sari Dewi",
    email: "sari@example.com",
    username: "saridewi",
    bio: "Front-end developer yang fokus pada UI/UX dan aksesibilitas. Berpengalaman dengan React dan Vue.js.",
    avatarUrl: null,
    role: "DEVELOPER",
    githubUrl: "https://github.com/saridewi",
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi@example.com",
    username: "budisantoso",
    bio: "Backend engineer dengan spesialisasi dalam microservices dan cloud architecture. AWS Certified.",
    avatarUrl: null,
    role: "DEVELOPER",
    githubUrl: "https://github.com/budisantoso",
    createdAt: "2024-03-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Maya Putri",
    email: "maya@example.com",
    username: "mayaputri",
    bio: "Mobile dan web developer. Passionate tentang React Native dan cross-platform development.",
    avatarUrl: null,
    role: "DEVELOPER",
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "5",
    name: "Reza Firmansyah",
    email: "reza@example.com",
    username: "rezafirmansyah",
    bio: "DevOps engineer dengan pengalaman dalam Kubernetes, Docker, dan CI/CD pipelines.",
    avatarUrl: null,
    role: "DEVELOPER",
    githubUrl: "https://github.com/rezafirmansyah",
    createdAt: "2024-04-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Lina Maharani",
    email: "lina@example.com",
    username: "linamaharani",
    bio: "Data scientist & ML engineer. Berpengalaman dengan Python, TensorFlow, dan analisis data besar.",
    avatarUrl: null,
    role: "DEVELOPER",
    createdAt: "2024-02-28T00:00:00Z",
  },
];
