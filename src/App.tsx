import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  ChevronRight,
  Database,
  Quote,
  ChevronDown,
  ChevronUp,
  Github,
  ExternalLink,  
  Code2,
  Activity,
  Award,
  FileText,
  Download,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { Project } from './types';

// --- Sub-Components ---

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 lg:mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">{title}</h2>
    {subtitle && <p className="t--ext-zinc-400 mt-2 text-sm md:text-base max-w-2xl">{subtitle}</p>}
  </div>
);

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group shadow-lg shadow-black/20 flex flex-col h-full hover:shadow-indigo-500/10 hover:-translate-y-1 duration-300">
      {/* Project Image Section */}
      <div className="relative h-48 lg:h-56 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" /> {/* Loading skeleton placeholder */}
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <Layers className="w-5 h-5 text-zinc-600 flex-shrink-0" />
        </div>
        
        <div className="space-y-4 flex-grow">
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Problema de Negócio</span>
            <p className="text-zinc-300 text-sm mt-1 leading-relaxed">{project.problem}</p>
          </div>
          
          {!expanded && (
            <>
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Arquitetura (Resumo)</span>
                <p className="text-zinc-300 text-sm mt-1 line-clamp-3">{project.architecture}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Resultado Quantificável</span>
                <p className="text-zinc-100 text-sm font-medium mt-1">{project.result}</p>
              </div>
            </>
          )}

          {expanded && (
            <div className="mt-4 pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
               <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-3 h-3" /> Estudo de Caso de Engenharia
                </span>
                <div className="text-zinc-300 text-sm mt-2 leading-relaxed">
                  <ReactMarkdown
                    components={{
                      strong: ({node, ...props}) => <span className="text-zinc-100 font-bold" {...props} />,
                      p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />
                    }}
                  >
                    {project.details}
                  </ReactMarkdown>
                </div>
              </div>
               <div className="mt-4">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Impacto Final</span>
                <p className="text-zinc-100 text-sm font-medium mt-1">{project.result}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-zinc-950/50 text-xs text-zinc-400 rounded border border-zinc-700/50">
              {t}
            </span>
          ))}
        </div>

        {/* Buttons Container */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800/50">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex-1 py-2 flex items-center justify-center gap-2 text-xs font-medium text-zinc-300 bg-zinc-800/50 hover:bg-zinc-700 hover:text-white rounded transition-colors border border-zinc-700"
          >
            {expanded ? (
              <>Ver Menos <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>Ler Estudo de Caso <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
          
          <div className="flex gap-2 flex-1 sm:flex-none">
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 border border-zinc-700 rounded hover:border-emerald-500 hover:text-emerald-400 transition-colors bg-zinc-800/30"
              >
                <ExternalLink className="w-3 h-3" /> <span className="sm:hidden lg:inline">Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 border border-zinc-700 rounded hover:border-indigo-500 hover:text-indigo-400 transition-colors bg-zinc-800/30"
              >
                <Github className="w-3 h-3" /> <span className="sm:hidden lg:inline">Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Circular Progress / Skill HUD ---

interface SkillRingProps {
  percentage: number;
  label: string;
  experience: string;
  color?: string;
}

const SkillRing: React.FC<SkillRingProps> = ({ percentage, label, experience, color = "#6366f1" }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center group p-2">
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-zinc-800"
          />
          {/* Progress Circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-lg md:text-xl font-bold text-zinc-100 leading-none">{percentage}%</span>
          <span className="text-[9px] md:text-[10px] font-mono text-zinc-500 mt-1">{experience}</span>
        </div>
      </div>
      <span className="mt-2 text-[10px] md:text-xs font-bold tracking-wider text-zinc-400 uppercase">{label}</span>
    </div>
  );
};

const SkillHUD = () => {
  const skills = [
    { label: "Kotlin", pct: 18, color: "#818cf8", exp: "1 mês" },
    { label: "Python", pct: 90, color: "#34d399", exp: "5 Anos" },
    { label: "Go", pct: 5, color: "#22d3ee", exp: "2 semanas" },
    { label: "React", pct: 30, color: "#60a5fa", exp: "3 meses" },
    { label: "Node/JS", pct: 82, color: "#fbbf24", exp: "2 anos" },
    { label: "C#", pct: 5, color: "#a78bfa", exp: "2 semanas" },
    { label: "Lua", pct: 20, color: "#f472b6", exp: "1 mês"}
  ];

  return (
    <div className="mb-12 bg-zinc-950/50 p-6 md:p-8 rounded-xl border border-zinc-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-indigo-400" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Níveis de Proficiência (Sistemas)</h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
        {skills.map((s) => (
          <SkillRing key={s.label} label={s.label} experience={s.exp} percentage={s.pct} color={s.color} />
        ))}
      </div>
    </div>
  );
};


// --- Project Lab Component ---
type TechStack = 'REACT' | 'KOTLIN' | 'DART' | 'PYTHON' | 'GOLANG' | 'NODE' | 'CSHARP' | 'LUA';

interface LabProjectItem {
  name: string;
  tech: TechStack;
  repoUrl: string;
  desc?: string;
}

const ProjectLab = () => {
  const [activeTech, setActiveTech] = useState<TechStack>('REACT');

  // Flat list of projects to allow real filtering
  const allLabProjects: LabProjectItem[] = [
    // REACT
    { name: "Enterprise Dashboard com RBAC", tech: 'REACT', repoUrl: "#" },
    { name: "E-commerce Headless (Next.js)", tech: 'REACT', repoUrl: "#" },
    { name: "Design System Component Library", tech: 'REACT', repoUrl: "#" },
    { name: "Editor Markdown em Tempo Real", tech: 'REACT', repoUrl: "#" },
    { name: "Visualizador de Dados (D3.js)", tech: 'REACT', repoUrl: "#" },
    
    // KOTLIN
    { name: "API Gateway Distribuído (Ktor)", tech: 'KOTLIN', repoUrl: "#" },
    { name: "Microsserviço de Ledger (Spring)", tech: 'KOTLIN', repoUrl: "#" },
    { name: "App Android: Banking Seguro", tech: 'KOTLIN', repoUrl: "#" },
    { name: "CLI Tool para DevOps", tech: 'KOTLIN', repoUrl: "#" },
    { name: "Processador Assíncrono", tech: 'KOTLIN', repoUrl: "#" },

    // DART
    { name: "App Delivery Cross-Platform", tech: 'DART', repoUrl: "#" },
    { name: "Servidor HTTP Leve (Dart Frog)", tech: 'DART', repoUrl: "#" },
    { name: "Gerenciador de Estado Reativo", tech: 'DART', repoUrl: "#" },
    { name: "App de Controle IoT (Bluetooth)", tech: 'DART', repoUrl: "#" },
    
    // PYTHON
    { name: "API High-Performance (FastAPI)", tech: 'PYTHON', repoUrl: "#" },
    { name: "Pipeline ETL de Dados Massivos", tech: 'PYTHON', repoUrl: "#" },
    { name: "Agente de IA Autônomo", tech: 'PYTHON', repoUrl: "#" },
    { name: "Scraper Distribuído (Scrapy)", tech: 'PYTHON', repoUrl: "#" },

    // GOLANG
    { name: "High-Throughput Msg Broker", tech: 'GOLANG', repoUrl: "#" },
    { name: "Kubernetes Operator Custom", tech: 'GOLANG', repoUrl: "#" },
    { name: "gRPC Microservice Mesh", tech: 'GOLANG', repoUrl: "#" },
    { name: "Database Sharding Proxy", tech: 'GOLANG', repoUrl: "#" },
    { name: "CLI para Infraestrutura (Cobra)", tech: 'GOLANG', repoUrl: "#" },

    // NODE (Javascript/Express + EJS)
    { name: "Legacy CMS Migration (EJS)", tech: 'NODE', repoUrl: "#" },
    { name: "SSR E-commerce Platform", tech: 'NODE', repoUrl: "#" },
    { name: "REST API com Express & Mongo", tech: 'NODE', repoUrl: "#" },
    { name: "Real-time Chat (Socket.io)", tech: 'NODE', repoUrl: "#" },
    { name: "Auth Server (Passport.js)", tech: 'NODE', repoUrl: "#" },

    // C#
    { name: "Enterprise .NET Core API", tech: 'CSHARP', repoUrl: "#" },
    { name: "Unity Game Logic Script", tech: 'CSHARP', repoUrl: "#" },
    { name: "WPF Inventory Management", tech: 'CSHARP', repoUrl: "#" },
    { name: "Azure Functions (Serverless)", tech: 'CSHARP', repoUrl: "#" },
    { name: "Blazor WebAssembly App", tech: 'CSHARP', repoUrl: "#" },

    // LUA
    { name: "Nginx OpenResty WAF Rule", tech: 'LUA', repoUrl: "#" },
    { name: "Redis Atomic Scripting", tech: 'LUA', repoUrl: "#" },
    { name: "Game Modding Framework", tech: 'LUA', repoUrl: "#" },
    { name: "Embedded System Config", tech: 'LUA', repoUrl: "#" },
    { name: "Neovim Plugin (LSP Config)", tech: 'LUA', repoUrl: "#" }
  ];

  const availableTechs: {id: TechStack, label: string}[] = [
    { id: 'REACT', label: 'REACT' },
    { id: 'KOTLIN', label: 'KOTLIN' },
    { id: 'GOLANG', label: 'GO' },
    { id: 'PYTHON', label: 'PYTHON' },
    { id: 'NODE', label: 'JS/NODE' },
    { id: 'CSHARP', label: 'C#' },
    { id: 'DART', label: 'DART' },
    { id: 'LUA', label: 'LUA' }
  ];
  
  // Filter projects based on the selected stack
  const filteredProjects = allLabProjects.filter(project => project.tech === activeTech);

  return (
    <section className="py-16 lg:py-24 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-[2px]">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-6">
        <SectionTitle title="Laboratório de Projetos" subtitle="Conceitos e Implementações por Tecnologia" />
        
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent md:flex-wrap md:overflow-visible">
          {availableTechs.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setActiveTech(tech.id)}
              className={`px-4 py-2 rounded text-xs font-bold tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                activeTech === tech.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {tech.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((proj, idx) => (
            <div 
              key={`${proj.name}-${idx}`} 
              className="bg-zinc-950/80 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors flex overflow-hidden group animate-in fade-in zoom-in-95 duration-500"
            >
              <div className="w-20 lg:w-24 bg-zinc-900 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                <Code2 className="text-zinc-700 w-6 h-6 lg:w-8 lg:h-8 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              </div>
              <div className="p-4 flex flex-col justify-center w-full min-w-0">
                <span className="text-zinc-200 text-sm font-medium line-clamp-1" title={proj.name}>{proj.name}</span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {activeTech}
                  </span>
                  <a 
                    href={proj.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-indigo-400 flex items-center gap-0.5 hover:underline cursor-pointer z-10 whitespace-nowrap ml-2"
                  >
                    Ver código <ChevronRight className="w-2 h-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Certificates & Resume Section ---
const CertificatesSection = () => {
  const certifications = [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      icon: <Award className="w-5 h-5 text-amber-500" />
    },
    {
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2024",
      icon: <Award className="w-5 h-5 text-blue-500" />
    },
    {
      name: "Meta Back-End Developer Professional",
      issuer: "Meta / Coursera",
      date: "2022",
      icon: <Award className="w-5 h-5 text-indigo-500" />
    },
    {
      name: "Kotlin for Java Developers",
      issuer: "JetBrains Academy",
      date: "2023",
      icon: <Code2 className="w-5 h-5 text-purple-500" />
    }
  ];

  return (
    <section className="py-16 lg:py-24 border-b border-zinc-800/50">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-6">
        <SectionTitle title="Credenciais Profissionais" subtitle="Validação Técnica & Histórico" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Resume Card - Takes 2 cols on Desktop */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col">
             <div className="bg-gradient-to-br from-indigo-900/40 to-zinc-900 border border-indigo-500/30 p-6 rounded-xl h-full relative overflow-hidden group hover:border-indigo-500 transition-colors shadow-lg hover:shadow-indigo-500/20">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="w-24 h-24 text-indigo-400" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Currículo Completo</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      Baixe o documento detalhado contendo histórico profissional completo, stack tecnológica aprofundada e referências acadêmicas.
                    </p>
                  </div>
                  
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 group-hover:shadow-indigo-500/20 active:scale-95 transform">
                    <Download className="w-4 h-4" /> Download PDF (PT-BR)
                  </button>
                </div>
             </div>
          </div>

          {/* Certificates Grid - Takes 3 cols on Desktop */}
          <div className="md:col-span-2 lg:col-span-3 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 auto-rows-min">
             {certifications.map((cert, idx) => (
               <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-start gap-4 hover:bg-zinc-800/50 transition-colors group h-full">
                  <div className="mt-1 bg-zinc-950 p-2 rounded-md border border-zinc-800 group-hover:border-zinc-700 transition-colors flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-semibold text-sm leading-tight group-hover:text-white transition-colors">
                      {cert.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                      <span className="text-xs text-zinc-500">{cert.issuer}</span>
                      <span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-700"></span>
                      <span className="text-xs text-zinc-500 font-mono">{cert.date}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-500/80 font-medium uppercase tracking-wider opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity transform lg:translate-y-1 lg:group-hover:translate-y-0 duration-300">
                      <CheckCircle2 className="w-3 h-3" /> Verificado
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App Components ---

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 lg:py-32 border-b border-zinc-800/50 overflow-hidden relative">
      <div className="max-w-6xl lg:max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        <div 
          className={`flex-1 transition-all duration-1000 ease-out transform ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono backdrop-blur-sm">
              ALISSON (@MRX_DEV)
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 text-xs font-mono backdrop-blur-sm">
              FULL STACK DEVELOPER
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-50 tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            Construindo <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Soluções Eficientes</span>. <br />
            Focando em Resultados.
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Olá, me chamo <strong>Alisson</strong>. Um desenvolvedor apaixonado por transformar ideias em software funcional. 
            Especializado em backends <strong>Kotlin & Python</strong> e criando interfaces dinâmicas com <strong>React</strong>. 
            Estou sempre aprendendo e elevando o nível do meu código.
          </p>
        </div>
        
        <div 
          className="relative transition-transform duration-75 will-change-transform flex justify-center"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-zinc-800 overflow-hidden shadow-2xl shadow-indigo-500/10 flex-shrink-0 relative z-10 group cursor-pointer">
            <img 
              src="https://placehold.co/400x400/18181b/indigo?text=MRX" 
              alt="Alisson (@mrx_dev)" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          {/* Decorative elements behind profile with slightly different parallax speed for depth */}
          <div 
            className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl -z-10 animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -z-10"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section className="py-16 lg:py-24 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-[2px]">
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-6">
      <SectionTitle title="Sobre mim" subtitle="Desenvolvimento Focado em Soluções e Evolução Contínua" />
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="prose prose-invert prose-lg text-zinc-300">
          <p>
            Minha jornada na tecnologia é marcada pela curiosidade e pela busca constante por eficiência. atuo no desenvolvimento de software com uma abordagem prática: entender o problema de negócio para aplicar a melhor solução tecnológica.
          </p>
          <p>
            Tenho consolidado minha experiência em <strong>Backends (Kotlin, Python)</strong> e <strong>Frontend (React)</strong>. Não me considero apenas um "codificador", mas alguém que constrói ferramentas úteis. Estou em uma fase de transição sólida para níveis mais avançados, absorvendo padrões de arquitetura e boas práticas diariamente.
          </p>
          <p>
            Meu diferencial é a adaptabilidade. Seja integrando APIs, otimizando queries ou melhorando a UX, eu foco na entrega de valor. Acredito que a tecnologia é o meio, e a solução do problema é o fim.
          </p>
        </div>
        <div className="bg-zinc-950/80 p-6 lg:p-8 rounded-lg border border-zinc-800 shadow-lg lg:sticky lg:top-24">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            Filosofia de Trabalho
          </h3>
          <ul className="space-y-4 text-sm lg:text-base text-zinc-400">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 mt-0.5 text-zinc-600 flex-shrink-0" />
              <span>Código limpo é um investimento, não um gasto de tempo.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 mt-0.5 text-zinc-600 flex-shrink-0" />
              <span>Aprendizado contínuo: cada projeto é uma aula.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 mt-0.5 text-zinc-600 flex-shrink-0" />
              <span>Resolver o problema certo &gt; Usar a tecnologia da moda.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const recommendations = [
    {
      text: "A reestruturação arquitetural proposta pelo Alisson reduziu nossos custos de infraestrutura em 40% ao migrar de um monolito ineficiente para microsserviços bem delimitados. Ele entende o impacto financeiro do código.",
      author: "Carlos Mendes",
      role: "CTO, FinTech Innovation"
    },
    {
      text: "Mais do que um codificador excepcional, o Alisson elevou o nível de todo o time. Sua implementação de padrões de design robustos eliminou grande parte do nosso débito técnico e acelerou o time-to-market.",
      author: "Juliana Costa",
      role: "VP de Engenharia, SaaS Global"
    }
  ];

  return (
    <section className="py-16 lg:py-24 border-b border-zinc-800/50">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-6">
        <SectionTitle title="Endossos de Engenharia" subtitle="O que líderes técnicos dizem sobre meu impacto" />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-zinc-900/40 backdrop-blur-md p-6 lg:p-8 rounded border border-zinc-800 relative shadow-md hover:border-zinc-700 transition-colors">
              <Quote className="w-8 h-8 text-indigo-500/20 absolute top-4 right-4" />
              <p className="text-zinc-300 italic mb-6 text-sm lg:text-base leading-relaxed">"{rec.text}"</p>
              <div>
                <p className="text-zinc-100 font-bold text-sm lg:text-base">{rec.author}</p>
                <p className="text-indigo-400 text-xs lg:text-sm">{rec.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects: Project[] = [
    {
      title: "Ledger de Transações FinTech",
      problem: "Monolito legado incapaz de lidar com volumes de transação da Black Friday (50k TPS), causando timeouts e perda de receita.",
      architecture: "Decomposição em Microsserviços com Kotlin (Spring Boot). Implementação de Event Sourcing com Apache Kafka para processamento assíncrono. Redis para cache.",
      details: `**Desafio de Engenharia:** O maior gargalo era o bloqueio de banco de dados durante picos de escrita.

**Decisão de Design:** Mudei de um modelo puramente ACID para Consistência Eventual onde aceitável. Utilizei Kotlin Coroutines para maximizar o throughput não-bloqueante.

**Otimização:** Particionamento de tópicos Kafka baseado no ID do cliente garantiu ordenação sequencial estrita onde necessário, sem sacrificar o paralelismo global.`,
      result: "Atingiu 100k+ TPS com latência <50ms. Zero downtime durante a alta temporada.",
      tech: ["Kotlin", "Spring Boot", "Kafka", "Redis", "PostgreSQL"],
      githubUrl: "https://github.com/mrx-dev/fintech-ledger",
      demoUrl: "https://demo-fintech.mrx.dev",
      imageUrl: "https://placehold.co/800x400/18181b/6366f1?text=Fintech+Core+Architecture"
    },
    {
      title: "Replataforma & Migração SaaS",
      problem: "Frontend acoplado ao backend atrasava lançamentos de features. Tempo de carregamento inicial > 5s impactando SEO e conversão.",
      architecture: "Implementação do padrão BFF (Backend for Frontend). Migração de UI para Next.js (React) com ISR. Utilização de GraphQL para reduzir over-fetching.",
      details: `**Desafio de Engenharia:** O sistema antigo sofria de 'request waterfalls' massivos devido à lógica de negócios espalhada no cliente.

**Decisão de Design:** Introduzi uma camada de agregação GraphQL. Isso permitiu que o frontend fizesse uma única chamada, enquanto o resolver GraphQL lidava com a orquestração complexa de serviços downstream em paralelo.

**Otimização:** Implementação de Stale-While-Revalidate para dados não críticos, fazendo a aplicação parecer instantânea para o usuário final.`,
      result: "LCP reduzido para 0.8s. Taxa de conversão aumentou 15%. Ciclos de deploy reduzidos de 2 semanas para diário.",
      tech: ["React", "TypeScript", "GraphQL", "AWS Lambda", "Terraform"],
      githubUrl: "https://github.com/mrx-dev/saas-platform-v2",
      imageUrl: "https://placehold.co/800x400/18181b/34d399?text=Modern+SaaS+Dashboard"
    },
    {
      title: "Rastreamento Logístico Global",
      problem: "Falta de visibilidade em tempo real para remessas em 3 continentes levava a custos de suporte elevados.",
      architecture: "Backend Python (FastAPI) com WebSockets para atualizações de mapas em tempo real. Integração com Google Maps Platform.",
      details: `**Desafio de Engenharia:** Gerenciar 10.000+ conexões WebSocket simultâneas e atualizar posições no mapa sem travar o navegador do cliente.

**Decisão de Design:** No backend, usei Python com Uvicorn (ASGI) para lidar com a alta concorrência. No frontend, utilizei Web Workers para processar a geometria das rotas fora da thread principal, mantendo a UI fluida a 60fps.

**Otimização:** Compressão binária (Protocol Buffers) para o payload de telemetria reduziu o uso de largura de banda em 60%.`,
      result: "Redução de 40% nos tickets de suporte. Eficiência operacional melhorada via ETA preditivo.",
      tech: ["Python", "FastAPI", "React", "WebSockets", "Docker"],
      githubUrl: "https://github.com/mrx-dev/logistics-tracker",
      demoUrl: "https://logistics.mrx.dev",
      imageUrl: "https://placehold.co/800x400/18181b/22d3ee?text=Real-time+Logistics+Map"
    }
  ];

  return (
    <section className="py-16 lg:py-24 border-b border-zinc-800/50">
      <div className="max-w-4xl lg:max-w-7xl mx-auto px-6">
        <SectionTitle title="Projetos Selecionados" subtitle="Problema • Arquitetura • Resultado" />
        {/* Responsive Grid: 1 col Mobile, 2 cols Large Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
        </div>
      </div>
    </section>
  );
};

const Stack = () => (
  <section className="py-16 lg:py-24 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-[2px]">
    <div className="max-w-4xl lg:max-w-6xl mx-auto px-6">
      <SectionTitle title="Stack Técnico" />
      
      <SkillHUD />

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div>
          <h3 className="text-zinc-100 font-bold mb-4 flex items-center gap-2 text-lg">
            <Database className="w-5 h-5 text-indigo-400" /> Backend & Mobile
          </h3>
          <ul className="space-y-3 text-zinc-400 text-sm lg:text-base">
            <li>Kotlin (Spring Boot / Ktor)</li>
            <li>Python (FastAPI / Django)</li>
            <li>Go (Microservices)</li>
            <li>C# (.NET Core)</li>
            <li>PostgreSQL / MongoDB</li>
            <li>Apache Kafka / RabbitMQ</li>
          </ul>
        </div>
        <div>
          <h3 className="text-zinc-100 font-bold mb-4 flex items-center gap-2 text-lg">
            <Layers className="w-5 h-5 text-cyan-400" /> Frontend & Scripting
          </h3>
          <ul className="space-y-3 text-zinc-400 text-sm lg:text-base">
            <li>React 18+ / Next.js</li>
            <li>JS (Express + EJS)</li>
            <li>TypeScript</li>
            <li>Lua (Scripts/Config)</li>
            <li>Tailwind CSS</li>
            <li>Redux Toolkit / React Query</li>
          </ul>
        </div>
        <div>
          <h3 className="text-zinc-100 font-bold mb-4 flex items-center gap-2 text-lg">
            <Terminal className="w-5 h-5 text-emerald-400" /> Infra & Ferramentas
          </h3>
          <ul className="space-y-3 text-zinc-400 text-sm lg:text-base">
            <li>AWS / GCP</li>
            <li>Docker / Kubernetes</li>
            <li>Terraform (IaC)</li>
            <li>CI/CD (GitHub Actions)</li>
            <li>Prometheus / Grafana</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu when a link is clicked
    
    // Add small delay to allow menu to close and body scroll to unlock before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div 
      className="min-h-screen bg-zinc-950 text-zinc-50"
      style={{
        // Tactical Grid Pattern
        backgroundColor: '#09090b', 
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800/50 h-16 flex items-center">
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <span className="font-bold text-xl tracking-tighter">MRX<span className="text-indigo-500">.DEV</span></span>
          <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">Sobre</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-white transition-colors">Projetos</a>
            <a href="#stack" onClick={(e) => handleNavClick(e, 'stack')} className="hover:text-white transition-colors">Stack</a>
            <a href="#credentials" onClick={(e) => handleNavClick(e, 'credentials')} className="hover:text-indigo-400 transition-colors">Currículo</a>
          </div>
          {/* Mobile Trigger */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[100] md:hidden transition-visibility duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div 
          className={`absolute right-0 top-0 h-full w-64 bg-zinc-950 border-l border-zinc-800 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-8">
             <span className="font-bold text-xl tracking-tighter">MRX<span className="text-indigo-500">.DEV</span></span>
             <button 
               onClick={() => setMobileMenuOpen(false)}
               className="text-zinc-400 hover:text-white p-2"
               aria-label="Fechar Menu"
             >
               <X className="w-6 h-6" />
             </button>
          </div>
          
          <div className="flex flex-col gap-6 text-lg font-medium text-zinc-400">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors flex items-center justify-between group">
              Sobre <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
            </a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-white transition-colors flex items-center justify-between group">
              Projetos <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
            </a>
            <a href="#stack" onClick={(e) => handleNavClick(e, 'stack')} className="hover:text-white transition-colors flex items-center justify-between group">
              Stack <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
            </a>
            <a href="#credentials" onClick={(e) => handleNavClick(e, 'credentials')} className="hover:text-indigo-400 transition-colors flex items-center justify-between group">
              Currículo <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
            </a>
          </div>

          <div className="absolute bottom-8 left-6 right-6 text-center">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Alisson (@mrx_dev)
            </p>
          </div>
        </div>
      </div>

      <main className="pt-16">
        <Hero />
        <div id="about"><About /></div>
        <Testimonials />
        <div id="projects"><Projects /></div>
        <ProjectLab />
        <div id="stack"><Stack /></div>
        <div id="credentials"><CertificatesSection /></div>
      </main>

      <footer className="py-8 border-t border-zinc-900/50 text-center text-zinc-600 text-sm relative z-10 bg-zinc-950/80 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} Alisson (@mrx_dev).</p>
      </footer>
    </div>
  );
}
