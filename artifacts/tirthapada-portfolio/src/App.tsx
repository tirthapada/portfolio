import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Atom, Battery, Binary, Bluetooth, BluetoothConnected, BrainCircuit, Calendar, Check, CheckCheck, CheckCircle, Clock,
  Code2, Coffee, Command, Copy, Cpu, Database, Download, ExternalLink, Eye, FileCode2, FileText, Folder, GitBranch, Github, HardDrive, Layers, Layout, LayoutGrid,
  Linkedin, LockKeyhole, Mail, MapPin, Maximize2, Menu, MessageSquareText, Minimize2, Minus, Monitor, Moon, Orbit, Palette, Pause, Play, Radio, RefreshCw, RotateCw,
  ScanLine, Search, Send, ShieldCheck, Sliders, Sparkles, Sun, Terminal, Trash2, Volume2, VolumeX, Wifi, WifiOff, X, Zap
} from 'lucide-react';
import './index.css';

const skills = ['Python', 'Java', 'C', 'C++', 'JavaScript', 'React.js', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'GitHub', 'AI/ML', 'Machine Learning', 'Cybersecurity', 'Data Structures & Algorithms', 'Computer Vision', 'NLP'];

export interface SkillDetail {
  name: string;
  category: string;
  level: number;
  levelLabel: string;
  desc: string;
  highlights: string[];
  projects: string[];
}

const skillsData: Record<string, SkillDetail> = {
  Python: {
    name: 'Python',
    category: 'CORE PROGRAMMING & AI',
    level: 95,
    levelLabel: 'Advanced Mastery',
    desc: 'Primary programming language utilized across machine learning pipelines, deep learning model inference, computer vision workflows, and backend API engineering.',
    highlights: [
      'Model training with PyTorch & TensorFlow',
      'Computer Vision image transformations with OpenCV',
      'Data preprocessing & feature engineering with NumPy & Pandas',
      'Backend REST API microservices with FastAPI & Flask'
    ],
    projects: ['Lunar AI Pathfinding', 'D-FUSE Disaster Fusion', 'UHIMS Heat Simulator', 'Voice Cloning Detection']
  },
  Java: {
    name: 'Java',
    category: 'OBJECT-ORIENTED SYSTEMS',
    level: 88,
    levelLabel: 'Proficient',
    desc: 'Strong object-oriented architecture, design patterns, clean class hierarchies, and robust multi-threaded software implementations.',
    highlights: [
      'OOP design principles & SOLID architecture',
      'Java Collections framework & memory management',
      'Multi-threading, synchronization & concurrency',
      'Complex Data Structures & Algorithms implementation'
    ],
    projects: ['Academic Core Software', 'Algorithm Benchmark Engine']
  },
  C: {
    name: 'C',
    category: 'SYSTEMS PROGRAMMING',
    level: 85,
    levelLabel: 'Proficient',
    desc: 'Foundational systems-level programming, direct pointer manipulation, manual memory management, and hardware-near execution model.',
    highlights: [
      'Dynamic memory allocation (malloc/free/calloc)',
      'Pointers, memory addressing, & struct memory layouts',
      'Bitwise operations & low-level hardware registers',
      'POSIX compliant system calls & execution speed'
    ],
    projects: ['Systems Programming Labs', 'Memory Optimization Modules']
  },
  'C++': {
    name: 'C++',
    category: 'HIGH-PERFORMANCE DSA',
    level: 90,
    levelLabel: 'Advanced',
    desc: 'High-performance computing, competitive programming, space-time complexity optimization, and Standard Template Library (STL) mastery.',
    highlights: [
      'STL mastery: vectors, unordered_maps, priority queues, sets',
      'A* pathfinding & Dijkstra graph algorithms',
      'Algorithmic time and memory complexity optimization',
      'Modern C++ references, moves, & templates'
    ],
    projects: ['Lunar AI Pathfinding Engine', 'Competitive Programming Solutions']
  },
  JavaScript: {
    name: 'JavaScript',
    category: 'WEB & FULL-STACK',
    level: 90,
    levelLabel: 'Advanced',
    desc: 'Modern ES6+ asynchronous programming, event loop mechanics, REST API consumption, DOM manipulation, and dynamic client-side applications.',
    highlights: [
      'Asynchronous workflows (Async/Await, Promises)',
      'Full-stack integration with Node.js & Express',
      'Event-driven architecture & state handling',
      'DOM optimization & micro-interaction performance'
    ],
    projects: ['QuickBite Food Platform', 'Interactive 3D Portfolio']
  },
  'React.js': {
    name: 'React.js',
    category: 'FRONTEND ARCHITECTURE',
    level: 92,
    levelLabel: 'Advanced',
    desc: 'Component-driven interactive web architecture, custom hooks, reactive state lifecycle, virtual DOM optimization, and modern UI engineering.',
    highlights: [
      'Custom React hooks & performance memoization',
      'Modular reusable design system & component trees',
      'Smooth client-side routing & modal workflows',
      'Integration with Three.js, Canvas & interactive graphs'
    ],
    projects: ['3D Developer Portfolio', 'QuickBite Responsive UI', 'Interactive PPT Viewer']
  },
  HTML: {
    name: 'HTML / HTML5',
    category: 'SEMANTIC WEB STANDARDS',
    level: 95,
    levelLabel: 'Advanced Mastery',
    desc: 'Semantic HTML5 architecture, accessibility (WCAG/ARIA) standards, SEO metadata optimization, and modern web multimedia integration.',
    highlights: [
      'Semantic document hierarchy & SEO structure',
      'Accessible web navigation & keyboard controls',
      'HTML5 Canvas, Audio, & Video streaming integration',
      'Cross-browser rendering standards & layout fidelity'
    ],
    projects: ['QuickBite Web App', 'Portfolio Web System']
  },
  CSS: {
    name: 'CSS / CSS3',
    category: 'MODERN DESIGN SYSTEMS',
    level: 92,
    levelLabel: 'Advanced',
    desc: 'Cutting-edge CSS architecture with Flexbox, CSS Grid, 3D hardware-accelerated transforms, glassmorphism, dynamic animations, and dark/light modes.',
    highlights: [
      'Complex responsive layouts with CSS Grid & Flexbox',
      '3D transforms, perspectives & cubic-bezier keyframes',
      'CSS custom properties / design tokens for theme swapping',
      'Glassmorphism, backdrop filters & neon aesthetics'
    ],
    projects: ['3D Portfolio Design System', 'Responsive Project Dashboards']
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    category: 'UTILITY-FIRST STYLING',
    level: 88,
    levelLabel: 'Proficient',
    desc: 'Rapid UI design with atomic CSS classes, responsive breakpoints, design token configuration, and streamlined layout prototyping.',
    highlights: [
      'Utility-first responsive layout rapid prototyping',
      'Custom theme extension & design system tokens',
      'Micro-interactions, pseudo-classes & transitions',
      'Mobile-first grid systems & component cleanups'
    ],
    projects: ['Rapid Web Prototypes', 'Full-Stack Landing Pages']
  },
  Git: {
    name: 'Git',
    category: 'VERSION CONTROL',
    level: 90,
    levelLabel: 'Advanced',
    desc: 'Distributed version control, branching strategies, merge conflict resolution, atomic commit hygiene, and repository maintenance.',
    highlights: [
      'Feature-branch workflows & trunk-based development',
      'Rebasing, interactive squashing & conflict resolution',
      'Version tagging, releases & history navigation',
      'Multi-contributor hackathon collaboration'
    ],
    projects: ['Team Chandra Repositories', 'All Academic & Open Source Projects']
  },
  GitHub: {
    name: 'GitHub',
    category: 'COLLABORATION & CI/CD',
    level: 92,
    levelLabel: 'Advanced',
    desc: 'Collaborative code review, pull requests, issue tracking, project boards, and automated continuous integration deployment pipelines.',
    highlights: [
      'Pull request peer reviews & branch protection',
      'GitHub Actions automated build & test workflows',
      'Project management & milestone tracking',
      'Documentation, README architecture & release assets'
    ],
    projects: ['IIT Guwahati Hackathon D-FUSE Repo', 'Lunar AI Open Source']
  },
  'AI/ML': {
    name: 'AI / Machine Learning',
    category: 'INTELLIGENT SYSTEMS',
    level: 92,
    levelLabel: 'Advanced',
    desc: 'Holistic artificial intelligence problem-solving, predictive modeling, heuristic search, data-driven decisions, and model deployment.',
    highlights: [
      'End-to-end ML lifecycle from raw data to inference',
      'Model evaluation: Precision, Recall, F1, ROC-AUC',
      'Feature engineering, normalization & correlation analysis',
      'Hybrid heuristic + deep learning decision architectures'
    ],
    projects: ['Lunar AI Rover Navigation', 'D-FUSE Evidence Fusion', 'UHIMS Urban Simulator']
  },
  'Machine Learning': {
    name: 'Machine Learning',
    category: 'PREDICTIVE ALGORITHMS',
    level: 90,
    levelLabel: 'Advanced',
    desc: 'Gradient boosted decision trees, ensemble learning, regression, classification pipelines, and mathematical optimization on tabular data.',
    highlights: [
      'XGBoost, Random Forests, & Gradient Boosting',
      'Scikit-Learn transformation & modeling pipelines',
      'Hyperparameter tuning with grid / Bayesian search',
      'K-Fold cross-validation & regularization methods'
    ],
    projects: ['UHIMS Heat Island Prediction Engine', 'Risk Assessment Models']
  },
  Cybersecurity: {
    name: 'Cybersecurity',
    category: 'DEFENSIVE SECURITY & AUDITING',
    level: 88,
    levelLabel: 'Proficient',
    desc: 'Threat modeling, network scanning, vulnerability assessment, synthetic attack vector mitigation, and defensive cybersecurity practices.',
    highlights: [
      'Network inspection & vulnerability reconnaissance (Nmap)',
      'Synthetic media & voice clone impersonation defenses',
      'OWASP Top 10 vulnerabilities & secure coding practices',
      'Cryptographic hashes, integrity verification & auditing'
    ],
    projects: ['AI-Powered Voice Cloning Detection', 'Interactive Security Terminal']
  },
  'Data Structures & Algorithms': {
    name: 'Data Structures & Algorithms',
    category: 'COMPUTER SCIENCE CORE',
    level: 92,
    levelLabel: 'Advanced Mastery',
    desc: 'Rigorous algorithmic thinking, optimal memory and time complexity analysis, graph theory, tree traversals, and dynamic programming.',
    highlights: [
      'A* Pathfinding & Dijkstra shortest path traversal',
      'Trees, Heaps, Disjoint Set Union (DSU) & Graph algorithms',
      'Dynamic programming & divide-and-conquer optimization',
      'Space-time Big-O benchmarking & asymptotic bounds'
    ],
    projects: ['Lunar AI Autonomous Pathfinding', 'High-Speed Grid Routing']
  },
  'Computer Vision': {
    name: 'Computer Vision',
    category: 'VISUAL PERCEPTION AI',
    level: 90,
    levelLabel: 'Advanced',
    desc: 'Object detection, semantic image segmentation, feature extraction, morphological filters, and satellite imagery analysis.',
    highlights: [
      'YOLOv8 deep learning hazard & object detection',
      'OpenCV image processing, filtering, & edge detection',
      'Satellite terrain segmentation with SegFormer / U-Net',
      'Elevation contour & surface roughness calculation'
    ],
    projects: ['Lunar AI Crater & Hazard Detection', 'UHIMS Satellite Thermal Segmentation']
  },
  NLP: {
    name: 'Natural Language Processing',
    category: 'LANGUAGE MODELS & TEXT AI',
    level: 88,
    levelLabel: 'Proficient',
    desc: 'Semantic embeddings, text deduplication, contradiction detection across unstructured data, and LLM-driven information extraction.',
    highlights: [
      'Vector semantic embeddings & cosine similarity clustering',
      'Contradiction identification across multi-source reports',
      'Entity extraction & text classification pipelines',
      'LLM prompt engineering & contextual decision synthesis'
    ],
    projects: ['D-FUSE Dynamic Disaster Evidence Fusion Engine']
  }
};

const skillDescriptions: Record<string, string> = Object.fromEntries(
  Object.entries(skillsData).map(([k, v]) => [k, v.desc])
);

function SkillIcon({ skill, size = 14 }: { skill: string; size?: number }) {
  switch (skill) {
    case 'Python': return <Code2 size={size} />;
    case 'Java': return <Coffee size={size} />;
    case 'C':
    case 'C++': return <Cpu size={size} />;
    case 'JavaScript': return <FileCode2 size={size} />;
    case 'React.js': return <Atom size={size} />;
    case 'HTML': return <Layout size={size} />;
    case 'CSS': return <Palette size={size} />;
    case 'Tailwind CSS': return <Layers size={size} />;
    case 'Git': return <GitBranch size={size} />;
    case 'GitHub': return <Github size={size} />;
    case 'AI/ML': return <BrainCircuit size={size} />;
    case 'Machine Learning': return <Sparkles size={size} />;
    case 'Cybersecurity': return <ShieldCheck size={size} />;
    case 'Data Structures & Algorithms': return <Binary size={size} />;
    case 'Computer Vision': return <Eye size={size} />;
    case 'NLP': return <MessageSquareText size={size} />;
    default: return <Code2 size={size} />;
  }
}
const lunarSlides = Array.from({ length: 22 }, (_, i) => `/assets/projects/lunar-ai/slide_${i + 1}.png`);
const dfuseSlides = Array.from({ length: 11 }, (_, i) => `/assets/projects/dfuse/slide_${i + 1}.png`);
const uhimsSlides = Array.from({ length: 10 }, (_, i) => `/assets/projects/uhims/slide_${i + 1}.png`);
const quickbiteSlides = Array.from({ length: 9 }, (_, i) => `/assets/projects/quickbite/slide_${i + 1}.png`);

const projects = [
  {
    number: '01',
    category: 'AI / COMPUTER VISION / SPACE TECH',
    title: 'LUNAR AI: TERRAIN ANALYSIS & SAFE ROVER NAVIGATION',
    desc: 'An AI-powered system for autonomous lunar landing site selection and safe rover path planning. Uses OpenCV and YOLO for hazard detection (craters, boulders, steep slopes) on NASA/ISRO satellite imagery, scoring candidate safety zones, and computing optimal traversal routes using A* pathfinding.',
    tags: ['Python', 'OpenCV', 'YOLO', 'TensorFlow', 'A* Algorithm', 'Flask'],
    image: '/assets/projects/lunar-ai/lunar_rover_ai.jpg',
    pptPdf: '/assets/projects/lunar-ai/lunar-ai.pdf',
    pptDownload: '/assets/projects/lunar-ai/HACKATHON PPT.pptx',
    pptFileName: 'HACKATHON PPT.pptx',
    pptSlides: lunarSlides,
    highlights: [
      'YOLO-based automated detection of craters & surface hazards',
      'Elevation & surface roughness classification pipeline',
      'A* path planning algorithm for energy-efficient rover traversal',
      'Built for NASA Artemis & ISRO Chandrayaan satellite datasets'
    ],
    presentation: 'Team Chandra · Hackathon Project',
    pptFile: 'projects/HACKATHON PPT.pptx'
  },
  {
    number: '02',
    category: 'AI / NLP / DISASTER RESPONSE',
    title: 'D-FUSE: DYNAMIC DISASTER EVIDENCE FUSION ENGINE',
    desc: 'An AI-driven decision engine designed to eliminate the "post-disaster information fog." Fuses unstructured multi-source data (citizen reports, field CSVs, PDFs, photos) using LLMs, NLP semantic deduplication, and uncertainty scoring to generate live priority rescue maps and resource recommendations.',
    tags: ['NLP / LLM', 'Computer Vision', 'FastAPI', 'PostgreSQL', 'Geospatial AI'],
    image: '/assets/projects/dfuse/disaster_system.jpg',
    pptPdf: '/assets/projects/dfuse/dfuse.pdf',
    pptDownload: '/assets/projects/dfuse/D-FUSE_SIH_Presentation.pptx',
    pptFileName: 'D-FUSE_IIT_Guwahati_Presentation.pptx',
    pptSlides: dfuseSlides,
    highlights: [
      'Multi-source evidence fusion (Text, PDF, CSV, Images, GPS)',
      'Semantic deduplication & contradiction detection across reports',
      'Explainable confidence & temporal trend monitoring (91%+ confidence)',
      'Automated rescue boat & medical team resource allocation'
    ],
    presentation: 'IIT Guwahati Hackathon Event · Team Chandra',
    pptFile: 'projects/D-FUSE_IIT_Guwahati_Presentation.pptx'
  },
  {
    number: '03',
    category: 'AI / GEOSPATIAL / CLIMATE TECH',
    title: 'UHIMS: URBAN HEAT ISLAND MITIGATION SIMULATOR',
    desc: 'An AI-driven simulator analyzing urban heat island (UHI) microclimate effects. Processes satellite imagery with computer vision segmentation (SegFormer / U-Net) and ML heat prediction (XGBoost) to evaluate localized temperature spikes and simulate cooling impacts of cool roofs and canopy expansion.',
    tags: ['Python', 'Flask', 'OpenCV', 'SegFormer', 'XGBoost', 'Leaflet GIS'],
    image: '/assets/projects/uhims/urban_heat_island.jpg',
    pptPdf: '/assets/projects/uhims/uhims.pdf',
    pptDownload: '/assets/projects/uhims/UHIMS.pptx',
    pptFileName: 'UHIMS_IIT_Guwahati_Presentation.pptx',
    pptSlides: uhimsSlides,
    highlights: [
      'Satellite image thermal prediction & surface segmentation',
      'Simulates localized heat reduction (e.g. +20% canopy cover)',
      'Leaflet GIS mapping for urban planner scenario testing',
      'Machine learning model benchmarking for thermal spikes'
    ],
    presentation: 'IIT Guwahati Hackathon Problem Statement · Team Chandra',
    pptFile: 'projects/UHIMS_IIT_Guwahati_Presentation.pptx'
  },
  {
    number: '04',
    category: 'FULL-STACK / WEB DEV / DATABASE',
    title: 'QUICKBITE: SMART FOOD ORDERING PLATFORM',
    desc: 'A full-stack food ordering web platform designed to streamline digital dining discovery. Features category-based browsing, real-time search & filtering, wishlist & cart state management, user order history, and a centralized database backend for admin menu management.',
    tags: ['Node.js', 'Express.js', 'JavaScript', 'HTML5/CSS3', 'MongoDB'],
    image: '/assets/projects/quickbite.jpg',
    pptPdf: '/assets/projects/quickbite/quickbite.pdf',
    pptDownload: '/assets/projects/quickbite/QuickBite_Review1.pptx',
    pptFileName: 'QuickBite_Review1.pptx',
    pptSlides: quickbiteSlides,
    highlights: [
      'Centralized web interface for category discovery & order flow',
      'Real-time search, filters, cart, and wishlist state management',
      'REST API backend with Node.js, Express, and database storage',
      'Admin control panel for food item management & tracking'
    ],
    presentation: 'GIET University · CSE Project',
    pptFile: 'projects/QuickBite_Review1.pptx'
  },
  {
    number: '05',
    category: 'AI / DEEP LEARNING / CYBERSECURITY',
    title: 'AI-POWERED VOICE CLONING DETECTION',
    desc: 'An intelligent audio analysis and cybersecurity system designed to identify deepfake audio, synthetic voice synthesis, and cloned voice impersonation attacks using deep neural networks and spectral feature analysis.',
    tags: ['AI', 'Deep Learning', 'Cybersecurity', 'Audio Analysis', 'Python'],
    image: '/assets/projects/voice-cloning.jpg',
    pptPdf: null,
    pptDownload: null,
    pptFileName: null,
    pptSlides: [
      '/assets/projects/voice-cloning.jpg'
    ],
    highlights: [
      'Spectral feature extraction & acoustic artifact analysis',
      'Detects neural text-to-speech and voice-cloned impersonation',
      'Built for defensive security & synthetic media verification'
    ],
    presentation: 'Cybersecurity & AI Project',
    pptFile: 'Voice_Cloning_Detection_Doc'
  }
];
interface ExpertiseItem {
  num: string;
  title: string;
  lines: string[];
  topics: string[];
  project: string;
}

const expertise: ExpertiseItem[] = [
  {
    num: '01',
    title: 'ARTIFICIAL INTELLIGENCE',
    lines: [
      'Architecting autonomous cognitive reasoning workflows, multi-agent systems, and neural pipelines that transform unstructured sensory inputs into high-confidence automated decisions.',
      'Core focus on Large Language Models (LLMs), prompt engineering, vector embeddings, semantic deduplication, and RAG knowledge retrieval systems.',
      'Deployed practical AI engines in competitive hackathons including D-FUSE (Disaster Intelligence Engine) and Autonomous Lunar Rover Pathfinding.'
    ],
    topics: ['Autonomous Agents', 'LLMs & Prompt Engineering', 'RAG Knowledge Systems', 'Multi-Agent Orchestration', 'Semantic Reasoning'],
    project: 'D-FUSE & Lunar AI'
  },
  {
    num: '02',
    title: 'MACHINE LEARNING',
    lines: [
      'End-to-end predictive modeling lifecycle from exploratory data analysis and statistical feature engineering to model training, cross-validation, and production inference.',
      'Practical mastery across supervised and unsupervised algorithms: gradient-boosted trees (XGBoost, LightGBM), Random Forests, SVMs, clustering, and deep neural networks.',
      'Real-world applications include satellite microclimate thermal spike prediction (UHIMS Urban Heat Island Simulator), regression microclimate modeling, and classification benchmarks.'
    ],
    topics: ['Supervised & Unsupervised Learning', 'XGBoost & Ensembles', 'Feature Engineering', 'Model Validation & Metrics', 'PyTorch & Scikit-Learn'],
    project: 'UHIMS Microclimate Simulator'
  },
  {
    num: '03',
    title: 'CYBERSECURITY',
    lines: [
      'Implementing secure-by-design principles, defensive system auditing, and AI-powered detection pipelines to safeguard distributed applications and digital communications.',
      'Specialization in deepfake audio detection using acoustic spectrogram artifact analysis, threat modeling, vulnerability assessments, and network traffic auditing.',
      'Designing robust authentication flows, role-based access control (RBAC), and cryptographic verification mechanisms for high-integrity software.'
    ],
    topics: ['Defensive Security', 'Threat Modeling & Auditing', 'Deepfake Audio Detection', 'Spectrogram Analysis', 'Network Auditing & RBAC'],
    project: 'AI Voice Cloning Detection'
  },
  {
    num: '04',
    title: 'SOFTWARE DEVELOPMENT',
    lines: [
      'Engineering maintainable, scalable, and modular software architectures adhering to clean code conventions, OOP design patterns, and automated CI/CD practices.',
      'Full-lifecycle delivery across backend REST microservices, stateful frontend user interfaces, relational and NoSQL database schemas, and asynchronous job processing.',
      'Proven track record delivering working MVPs under competitive hackathon timelines, including full-stack platforms, APIs, and simulation engines.'
    ],
    topics: ['Clean Architecture & OOP', 'RESTful Microservices', 'Database Schema Design', 'CI/CD & Git Workflows', 'Asynchronous Pipelines'],
    project: 'QuickBite & System Architecture'
  },
  {
    num: '05',
    title: 'DATA STRUCTURES & ALGORITHMS',
    lines: [
      'Designing mathematically rigorous, time-and-space optimal algorithmic routines to solve complex computational search, graph traversal, and spatial optimization problems.',
      'In-depth expertise in graph theory, heuristic A* pathfinding, dynamic programming, tree structures, hash tables, and priority queue management.',
      'Directly applied in real-world navigation algorithms for autonomous lunar rover terrain traversal and multi-source disaster emergency rescue boat routing.'
    ],
    topics: ['Graph Theory & Pathfinding (A*)', 'Dynamic Programming', 'Time/Space Complexity (O-Notation)', 'Spatial Traversal', 'Advanced Data Structures'],
    project: 'Lunar AI Pathfinding'
  },
  {
    num: '06',
    title: 'FULL-STACK WEB DEVELOPMENT',
    lines: [
      'Crafting responsive, accessible, and immersive web applications combining sleek futuristic design systems with scalable, production-grade cloud backends.',
      'Advanced proficiency in modern web ecosystems: React.js, TypeScript, Vite, Tailwind CSS, fluid HTML5 Canvas 3D rendering, and reactive state management.',
      'Backend engineering utilizing Node.js, Express, FastAPI, PostgreSQL, MongoDB, and secure WebSockets for real-time bi-directional telemetry streaming.'
    ],
    topics: ['React.js & TypeScript', 'FastAPI & Node.js', 'HTML5 Canvas & 3D Web', 'PostgreSQL & MongoDB', 'State Management & WebSockets'],
    project: 'QuickBite & 3D Web Portfolios'
  },
  {
    num: '07',
    title: 'COMPUTER VISION & SPATIAL AI',
    lines: [
      'Developing real-time image processing, object detection, and semantic segmentation pipelines for aerial, satellite, and environmental imagery.',
      'Hands-on implementation of YOLO object detection models, OpenCV image filtering, SegFormer transformer-based segmentation, and GeoTIFF satellite parsing.',
      'Powers autonomous lunar crater hazard detection (Lunar AI) and urban canopy / rooftop thermal segmentation (UHIMS).'
    ],
    topics: ['YOLO Object Detection', 'OpenCV Image Processing', 'SegFormer Segmentation', 'Satellite & GIS Data', 'Spatial Hazard Analysis'],
    project: 'Lunar AI & UHIMS Segmentation'
  }
];
const nodes = [
  { name: 'AI', x: '49%', y: '22%' }, { name: 'ML', x: '25%', y: '38%' }, { name: 'DEEP LEARNING', x: '70%', y: '35%' },
  { name: 'VISION', x: '31%', y: '67%' }, { name: 'NLP', x: '71%', y: '64%' }, { name: 'DATA', x: '49%', y: '52%' },
  { name: 'ALGORITHMS', x: '17%', y: '76%' }, { name: 'SECURITY', x: '84%', y: '80%' },
];
const orbSkills = ['AI', 'ML', 'CYBERSECURITY', 'PYTHON', 'C++', 'REACT'];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Loader({ done }: { done: boolean }) {
  return <div className={`loader ${done ? 'done' : ''}`} aria-hidden={done}>
    <div className="loader-inner">
      <div className="loader-mark">TIRTHAPADA<span>.</span></div>
      <div className="loader-log"><div><b>01</b> / INITIALIZING...</div><div><b>02</b> / LOADING PORTFOLIO...</div><div><b>03</b> / LOADING AI CORE...</div><div><b>04</b> / SYSTEM READY.</div></div>
      <div className="loader-bar"><span /></div>
    </div>
  </div>;
}

function Navigation({ open, setOpen, onBrand, onResume, theme, toggleTheme }: { open: boolean; setOpen: (open: boolean) => void; onBrand: () => void; onResume: () => void; theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const links = [['ABOUT', 'about'], ['WORK', 'work'], ['SKILLS', 'skills'], ['ACHIEVEMENTS', 'achievements'], ['TERMINAL', 'terminal'], ['CONTACT', 'contact']];
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && open) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open, setOpen]);

  return <nav className="nav">
    <div className="container-wide nav-inner">
      <button className="brand" data-testid="button-brand" onClick={() => { onBrand(); scrollToId('top'); }}>TIRTHAPADA<span>.</span></button>
      
      {open && <div className="nav-drawer-backdrop" onClick={() => setOpen(false)} aria-label="Close navigation" />}

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <div className="nav-drawer-header">
          <span className="eyebrow">MENU // 2026</span>
          <button className="nav-drawer-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="nav-links-list">
          {links.map(([label, id]) => (
            <a data-testid={`link-${id}`} key={id} href={`#${id}`} onClick={() => setOpen(false)} className="nav-link-item">
              <span>{label}</span>
              <ArrowUpRight size={13} className="nav-link-arrow" />
            </a>
          ))}
        </div>
        <div className="nav-drawer-footer">
          <button
            className="button button-primary nav-drawer-resume-btn"
            onClick={() => { setOpen(false); onResume(); }}
          >
            <ScanLine size={14} /> ACCESS RESUME (PDF)
          </button>
          <div className="nav-drawer-socials">
            <a href="https://github.com/tirthapada" target="_blank" rel="noreferrer" className="nav-drawer-social-link">
              <Github size={15} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/tirthapada-panda" target="_blank" rel="noreferrer" className="nav-drawer-social-link">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="mailto:tirthapadapanda@gmail.com" className="nav-drawer-social-link">
              <Mail size={15} /> Email
            </a>
          </div>
        </div>
      </div>
      
      <div className="nav-actions">
        <button
          className="nav-resume-btn"
          data-testid="button-nav-resume"
          onClick={onResume}
          title="Access Verified Resume"
        >
          <ScanLine size={13} />
          <span>RESUME</span>
        </button>
        <a
          href="https://github.com/tirthapada"
          target="_blank"
          rel="noreferrer"
          className="nav-social-btn nav-social-desktop"
          aria-label="GitHub Profile"
          title="GitHub: https://github.com/tirthapada"
        >
          <Github size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/tirthapada-panda"
          target="_blank"
          rel="noreferrer"
          className="nav-social-btn nav-social-desktop"
          aria-label="LinkedIn Profile"
          title="LinkedIn: https://www.linkedin.com/in/tirthapada-panda"
        >
          <Linkedin size={15} />
        </a>
        <button className="theme-toggle-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} data-testid="button-theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="nav-ping" aria-label="Scroll to contact" data-testid="button-nav-contact" onClick={() => scrollToId('contact')}><span /></button>
        <button className="menu-toggle" aria-label="Toggle menu" data-testid="button-menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
  </nav>;
}

function Hero({ onResume }: { onResume: () => void }) {
  return <section className="container-wide hero" id="top">
    <div className="hero-copy">
      <div className="hero-kicker"><span className="status-dot" /> <span className="eyebrow">AI/ML · CYBERSECURITY · SOFTWARE</span></div>
      <h1 className="hero-name-block">
        <span className="hero-firstname">TIRTHAPADA</span>
        <span className="hero-panda">PANDA.</span>
      </h1>
      <div className="hero-tagline">
        BUILDING INTELLIGENT SYSTEMS.
      </div>
      <p className="hero-description">I’m Tirthapada Panda, a computer science student passionate about Artificial Intelligence, Machine Learning, Cybersecurity and software development. I enjoy turning ideas into practical, intelligent and impactful projects.</p>
      <div className="actions">
        <a className="button button-primary" data-testid="link-view-work" href="#work">VIEW MY WORK <ArrowUpRight size={14} /></a>
        <button className="button button-ghost" data-testid="button-hero-resume" onClick={onResume}><ScanLine size={14} /> ACCESS RESUME</button>
        <a className="button button-ghost" data-testid="link-contact-hero" href="#contact"><span className="status-dot" /> CONTACT ME</a>
      </div>
    </div>
    <div className="id-stage">
      {/* Authentic Hanging ID Badge with Lanyard Ribbon — Click opens Resume Modal */}
      <div className="id-badge-hanging" data-testid="card-profile" onClick={onResume} title="Click to Access Verified Resume">
        {/* Authentic Lanyard Ribbon (Hangs cleanly from top of header section) */}
        <div className="badge-lanyard">
          {/* Woven Fabric Ribbon Strap */}
          <div className="lanyard-ribbon-strap">
            <span className="lanyard-ribbon-text">✦ TIRTHAPADA PANDA // DEVELOPER ✦</span>
          </div>

          {/* Authentic Badge Clip Assembly */}
          <div className="badge-clip">
            <div className="clip-metal-base" />
            <div className="clip-strap-loop">
              <div className="clip-snap-rivet" />
            </div>
          </div>
        </div>

        {/* Developer ID Card */}
        <div className="id-card">
          {/* Slot punch hole near top edge */}
          <div className="card-slot-punch" />

          {/* Card header stripe */}
          <div className="id-card-header">
            <span className="id-card-org">PORTFOLIO / 2026</span>
            <div className="id-card-logo">TP</div>
          </div>
          {/* Photo */}
          <div className="id-photo-wrap">
            <img className="id-photo" src="/assets/headshot.jpeg" alt="Tirthapada Panda" />
            <div className="id-photo-ring" />
          </div>
          {/* Info */}
          <div className="id-card-body">
            <div className="id-card-role">DEVELOPER ID</div>
            <h3 className="id-card-name">TIRTHAPADA<br />PANDA</h3>
            <p className="id-card-title">AI/ML · CYBERSECURITY · DEV</p>
            <div className="id-card-divider" />
            <div className="id-card-meta">
              <span><b>DEPT</b> Computer Science</span>
              <span><b>YEAR</b> 2026</span>
            </div>
            {/* Barcode */}
            <div className="id-barcode">
              <div className="id-barcode-bars" />
              <span>TP-2026-AIML-DEV</span>
            </div>
          </div>
          {/* Holographic shine overlay */}
          <div className="id-holo" />
        </div>
      </div>
      <div className="scroll-note"><span className="scroll-line" /> SCROLL TO EXPLORE <ArrowDown size={12} /></div>
    </div>
  </section>;
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="resume-modal-backdrop" onClick={onClose} data-testid="resume-modal-backdrop">
      <div className="resume-modal-card" onClick={e => e.stopPropagation()} data-testid="resume-modal-card">
        {/* Security Clearance Popout Banner */}
        <div className="resume-access-banner">
          <div className="access-banner-badge">
            <span className="access-dot" />
            <ShieldCheck size={15} />
            <strong>ACCESS GRANTED // VERIFIED RESUME TELEMETRY</strong>
          </div>
          <span className="access-code mono">CLEARANCE: VERIFIED</span>
        </div>

        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="resume-title-group">
            <div className="resume-badge-tag">OFFICIAL RESUME · 2026</div>
            <h3>TIRTHAPADA PANDA</h3>
            <p>
              B.Tech Computer Science & Engineering · GIET University · CGPA: 9.02 · AI/ML & Cybersecurity
            </p>
          </div>

          <div className="resume-modal-actions">
            <a
              href="/assets/resume.pdf"
              download="Tirthapada_Panda_Resume.pdf"
              className="button button-primary resume-action-btn"
              data-testid="button-download-resume"
            >
              <Download size={14} /> DOWNLOAD PDF
            </a>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="button button-ghost resume-action-btn"
              data-testid="button-tab-resume"
            >
              <ExternalLink size={14} /> NEW TAB
            </a>
            <button
              className="resume-modal-close"
              onClick={onClose}
              aria-label="Close resume viewer"
              data-testid="button-close-resume"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="resume-viewer-container">
          <iframe
            src="/assets/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
            title="Tirthapada Panda Verified Resume"
            className="resume-iframe"
          />
        </div>

        {/* Modal Footer */}
        <div className="resume-modal-footer">
          <div className="resume-meta-tags">
            <span className="meta-pill">FORMAT: PDF</span>
            <span className="meta-pill">SIZE: 135 KB</span>
            <span className="meta-pill">PHONE: +91 9348100256</span>
            <span className="meta-pill">STATUS: VERIFIED CANDIDATE</span>
          </div>

          <div className="resume-footer-links">
            <a href="mailto:tirthapadapanda@gmail.com" className="resume-channel-link">
              <Mail size={12} /> tirthapadapanda@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/tirthapada-panda" target="_blank" rel="noreferrer" className="resume-channel-link">
              <Linkedin size={12} /> LinkedIn
            </a>
            <a href="https://github.com/tirthapada" target="_blank" rel="noreferrer" className="resume-channel-link">
              <Github size={12} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillPopoutModal({
  skill,
  onClose,
  onSelectSkill
}: {
  skill: string;
  onClose: () => void;
  onSelectSkill: (s: string) => void;
}) {
  const detail = skillsData[skill] || {
    name: skill,
    category: 'TECHNICAL SKILL',
    level: 90,
    levelLabel: 'Advanced',
    desc: 'Core technology utilized in active software development, algorithm implementation, and system architecture.',
    highlights: ['Production-ready workflows', 'Clean code & optimization', 'Problem solving'],
    projects: ['Portfolio Projects']
  };

  const currentIndex = skills.indexOf(skill);
  const prevSkill = skills[(currentIndex - 1 + skills.length) % skills.length];
  const nextSkill = skills[(currentIndex + 1) % skills.length];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectSkill(prevSkill);
      if (e.key === 'ArrowRight') onSelectSkill(nextSkill);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prevSkill, nextSkill, onClose, onSelectSkill]);

  return (
    <div className="skill-modal-backdrop" onClick={onClose} data-testid="skill-modal-backdrop">
      <div className="skill-modal-card" onClick={e => e.stopPropagation()} data-testid="skill-modal-card">
        <div className="skill-modal-glow" />

        <div className="skill-modal-header">
          <div className="skill-modal-badge">
            <span className="skill-modal-cat">{detail.category}</span>
            <span className="skill-modal-level-tag">{detail.level}% · {detail.levelLabel}</span>
          </div>
          <button className="skill-modal-close" onClick={onClose} aria-label="Close modal" data-testid="button-close-skill-modal">
            <X size={18} />
          </button>
        </div>

        <div className="skill-modal-hero">
          <div className="skill-modal-icon-orb">
            <SkillIcon skill={skill} size={32} />
            <div className="skill-modal-orb-ring" />
          </div>
          <div className="skill-modal-name-group">
            <h3>{detail.name}</h3>
            <div className="skill-meter-wrap">
              <div className="skill-meter-bar" style={{ width: `${detail.level}%` }} />
            </div>
          </div>
        </div>

        <div className="skill-modal-body">
          <p className="skill-modal-desc">{detail.desc}</p>

          <div className="skill-modal-section">
            <span className="skill-modal-sec-title">CORE CAPABILITIES & ARCHITECTURE</span>
            <ul className="skill-modal-list">
              {detail.highlights.map((h, i) => (
                <li key={i}>
                  <CheckCircle size={13} style={{ color: '#00df8f', flexShrink: 0, marginTop: 3 }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="skill-modal-section">
            <span className="skill-modal-sec-title">APPLIED IN KEY PROJECTS</span>
            <div className="skill-modal-projects">
              {detail.projects.map((p, i) => (
                <span key={i} className="skill-project-tag">{p}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="skill-modal-footer">
          <button className="skill-modal-nav-btn" onClick={() => onSelectSkill(prevSkill)}>
            <ArrowLeft size={13} /> {prevSkill}
          </button>
          <span className="skill-modal-counter">
            {currentIndex + 1} / {skills.length}
          </span>
          <button className="skill-modal-nav-btn" onClick={() => onSelectSkill(nextSkill)}>
            {nextSkill} <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function About({ selected, setSelected }: { selected: string; setSelected: (value: string) => void }) {
  const [popoutSkill, setPopoutSkill] = useState<string | null>(null);

  const handleSkillClick = (skill: string) => {
    setSelected(skill);
    setPopoutSkill(skill);
  };

  return <section className="section" id="about">
    <div className="container-wide">
      <div className="section-heading"><div><div className="eyebrow">01 / ORIGIN</div><h2>BUILDING<br />WITH PURPOSE.</h2></div></div>
      <div className="about-grid">
        <div className="about-copy">
          <p>I’m currently exploring the intersection of Artificial Intelligence, Machine Learning, Cybersecurity and Software Development.</p>
          <p>I enjoy learning by building — from intelligent systems and AI-powered applications to cybersecurity-focused projects and full-stack web experiences.</p>
          <div className="stats"><div className="stat"><strong>9.02</strong><span>CURRENT CGPA</span></div><div className="stat"><strong>3</strong><span>HACKATHONS</span></div><div className="stat"><strong>1</strong><span>HACKATHON WIN</span></div></div>
        </div>
        <div className="toolkit" id="skills">
          <div className="toolkit-head">
            <span>02 / TOOLKIT</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <b>MY TOOLKIT</b>
              <span className="toolkit-hint">(CLICK ANY ICON TO POP OUT)</span>
            </div>
          </div>
          <div className="skill-chips">
            {skills.map((skill) => (
              <button
                data-testid={`button-skill-${skill.replaceAll(' ', '-').replaceAll('&', 'and')}`}
                className={`skill-chip ${selected === skill ? 'selected' : ''}`}
                key={skill}
                onClick={() => handleSkillClick(skill)}
                title={`Click to inspect ${skill}`}
              >
                <span className="skill-chip-icon"><SkillIcon skill={skill} size={13} /></span>
                <span>{skill}</span>
              </button>
            ))}
          </div>
          <div className="skill-focus" data-testid="text-selected-skill">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SkillIcon skill={selected} size={16} />
                <strong>{selected}</strong>
              </div>
              <button
                className="skill-focus-popout-btn"
                onClick={() => setPopoutSkill(selected)}
                data-testid="button-popout-selected-skill"
              >
                POP OUT SPEC ↗
              </button>
            </div>
            <p style={{ margin: '8px 0 0' }}>{skillDescriptions[selected] ?? 'A technology in the toolkit — selected for continued learning, building and experimentation.'}</p>
          </div>
        </div>
      </div>
    </div>

    {popoutSkill && (
      <SkillPopoutModal
        skill={popoutSkill}
        onClose={() => setPopoutSkill(null)}
        onSelectSkill={(s) => {
          setSelected(s);
          setPopoutSkill(s);
        }}
      />
    )}
  </section>;
}

function PptViewerModal({ project, onClose, onNext }: { project: typeof projects[0]; onClose: () => void; onNext: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'slides' | 'pdf'>('slides');
  const slides = project.pptSlides || [project.image];

  useEffect(() => {
    setSlideIdx(0);
    setViewMode('slides');
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (viewMode === 'slides' && slides.length > 1) {
        if (e.key === 'ArrowLeft') setSlideIdx(prev => (prev - 1 + slides.length) % slides.length);
        if (e.key === 'ArrowRight') setSlideIdx(prev => (prev + 1) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slides.length, onClose, viewMode]);

  return (
    <div className="ppt-modal-backdrop" onClick={onClose} data-testid="ppt-modal-backdrop">
      <div className="ppt-modal" onClick={e => e.stopPropagation()} data-testid="ppt-modal">
        {/* Verification / Security Clearance Banner */}
        <div className="resume-access-banner" style={{ marginBottom: 18 }}>
          <div className="access-banner-badge">
            <span className="access-dot" />
            <ShieldCheck size={15} />
            <strong>ACCESS GRANTED // VERIFIED PROJECT PRESENTATION DECK</strong>
          </div>
          <span className="access-code mono">CLEARANCE: VERIFIED</span>
        </div>

        {/* Modal Header */}
        <div className="ppt-modal-header">
          <div className="ppt-modal-title">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="mono" style={{ fontSize: 11, color: '#00df8f', letterSpacing: '.12em' }}>PROJECT / {project.number}</span>
              <span className="mono" style={{ fontSize: 10, color: '#9cb2ad', background: 'rgba(255,255,255,.06)', padding: '3px 8px', borderRadius: 4 }}>{project.category}</span>
              {project.presentation && (
                <span className="mono" style={{ fontSize: 10, color: '#00df8f', background: 'rgba(0,223,143,.1)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(0,223,143,.25)' }}>
                  {project.presentation}
                </span>
              )}
            </div>
            <h2>{project.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {project.pptDownload && (
              <a
                href={project.pptDownload}
                download={project.pptFileName || 'presentation.pptx'}
                className="button button-primary"
                style={{ height: 38, minHeight: 38, padding: '0 16px', fontSize: 11 }}
                data-testid="button-download-pptx"
                title="Download verified PowerPoint (.pptx) file"
              >
                <Download size={14} /> DOWNLOAD PPTX
              </a>
            )}
            {project.pptPdf && (
              <a
                href={project.pptPdf}
                target="_blank"
                rel="noreferrer"
                className="button button-ghost"
                style={{ height: 38, minHeight: 38, padding: '0 14px', fontSize: 11 }}
                data-testid="button-tab-ppt-pdf"
                title="Open full PDF presentation in new tab"
              >
                <ExternalLink size={14} /> PDF VIEW
              </a>
            )}
            <button className="ppt-modal-close" onClick={onClose} aria-label="Close presentation viewer" data-testid="button-close-ppt-modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* View Mode Switcher (Slides vs PDF) */}
        {project.pptPdf && (
          <div className="ppt-tab-switcher">
            <button
              className={`ppt-tab-btn ${viewMode === 'slides' ? 'active' : ''}`}
              onClick={() => setViewMode('slides')}
            >
              <Layers size={14} /> SLIDE CAROUSEL ({slides.length} SLIDES)
            </button>
            <button
              className={`ppt-tab-btn ${viewMode === 'pdf' ? 'active' : ''}`}
              onClick={() => setViewMode('pdf')}
            >
              <FileText size={14} /> EMBEDDED PDF DOCUMENT VIEWER
            </button>
          </div>
        )}

        {/* Presentation Body: Either 1080p Slide Carousel or PDF iframe */}
        {viewMode === 'pdf' && project.pptPdf ? (
          <div className="ppt-pdf-container" style={{ width: '100%', height: 560, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,223,143,0.25)', marginBottom: 20 }}>
            <iframe
              src={`${project.pptPdf}#toolbar=1&navpanes=0&scrollbar=1`}
              title={`${project.title} Presentation PDF`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        ) : (
          <>
            <div className="ppt-viewer-stage">
              <img src={slides[slideIdx]} alt={`${project.title} slide ${slideIdx + 1}`} className="ppt-viewer-img" />
              {slides.length > 1 && (
                <>
                  <button className="ppt-nav-btn prev" aria-label="Previous slide" onClick={() => setSlideIdx((slideIdx - 1 + slides.length) % slides.length)}>
                    <ArrowLeft size={18} />
                  </button>
                  <button className="ppt-nav-btn next" aria-label="Next slide" onClick={() => setSlideIdx((slideIdx + 1) % slides.length)}>
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
              <div style={{ position: 'absolute', bottom: 12, right: 16, font: '600 11px var(--app-font-mono)', background: 'rgba(0,0,0,0.85)', color: '#00df8f', padding: '5px 12px', borderRadius: 12, border: '1px solid rgba(0,223,143,0.35)', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                SLIDE {slideIdx + 1} / {slides.length}
              </div>
            </div>

            {slides.length > 1 && (
              <div className="ppt-thumbs">
                {slides.map((s, i) => (
                  <button
                    key={i}
                    className={`ppt-thumb-btn ${i === slideIdx ? 'active' : ''}`}
                    onClick={() => setSlideIdx(i)}
                    title={`Jump to slide ${i + 1}`}
                  >
                    <img src={s} alt={`Slide ${i + 1} thumbnail`} />
                    <span className="ppt-thumb-num">{i + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Project Description & Architecture Highlights */}
        <div style={{ margin: '20px 0' }}>
          <p style={{ color: '#a0b2ad', font: '400 15px/1.7 var(--app-font-sans)', margin: '0 0 18px' }}>{project.desc}</p>
          
          {project.highlights && (
            <div className="project-highlights">
              <span className="highlights-title">KEY PRESENTATION SLIDES & ARCHITECTURE HIGHLIGHTS</span>
              <ul className="highlights-list">
                {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}

          <div className="tag-row">{project.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
          
          {(project.pptDownload || project.pptPdf) && (
            <div style={{ marginTop: 15, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', font: '500 11px var(--app-font-mono)', color: '#6a827b' }}>
              {project.pptDownload && (
                <span><a href={project.pptDownload} download style={{ color: '#00df8f', textDecoration: 'underline' }}>Download .pptx ({project.pptFileName})</a></span>
              )}
              {project.pptPdf && (
                <span>· <a href={project.pptPdf} download style={{ color: '#00df8f', textDecoration: 'underline' }}>Download .pdf</a></span>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(200,230,220,0.12)' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.pptDownload && (
              <a href={project.pptDownload} download className="button button-ghost" style={{ fontSize: 11 }}>
                <Download size={13} /> PPTX FILE
              </a>
            )}
            {project.pptPdf && (
              <a href={project.pptPdf} download className="button button-ghost" style={{ fontSize: 11 }}>
                <FileText size={13} /> PDF FILE
              </a>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="button button-ghost" onClick={onClose}>CLOSE VIEWER</button>
            <button className="button button-primary" onClick={onNext}>NEXT PROJECT PPT <ArrowRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const project = projects[active];
  return <section className="section" id="work">
    <div className="container-wide">
      <div className="section-heading"><div><div className="eyebrow">03 / OUTPUT</div><h2>SELECTED<br />PROJECTS.</h2></div></div>
      <div className="projects-layout">
        <div>
          <div className="stack-wrap" data-testid="project-stack">
            {projects.map((item, index) => {
              const diff = (index - active + projects.length) % projects.length;
              return <button data-testid={`button-project-card-${item.number}`} key={item.number} className="project-card" onClick={() => setActive(index)} style={{ transform: `translateY(${diff * 32}px) scale(${1 - diff * .04}) rotateX(${diff * 2}deg)`, zIndex: projects.length - diff, opacity: diff > 2 ? .15 : 1, pointerEvents: diff > 2 ? 'none' : 'auto' }}>
                <img src={item.image} alt={item.title} className="project-card-image" />
                <div className="project-meta"><small>PROJECT / {item.number} • {item.category}</small><h3>{item.title}</h3></div>
              </button>;
            })}
          </div>
          <div className="stack-controls"><button className="square-button" aria-label="Previous project" data-testid="button-project-prev" onClick={() => setActive((active - 1 + projects.length) % projects.length)}><ArrowLeft size={15} /></button><button className="square-button" aria-label="Next project" data-testid="button-project-next" onClick={() => setActive((active + 1) % projects.length)}><ArrowRight size={15} /></button><span className="mono muted" style={{ fontSize: 10, padding: '12px 5px' }}>CLICK A CARD TO BRING IT FORWARD ({active + 1}/{projects.length})</span></div>
        </div>
        <div className="project-info" data-testid="panel-project-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span className="info-num">PROJECT {project.number} / SELECTED</span>
            {project.presentation && <span className="mono" style={{ fontSize: 10, color: '#00df8f', background: 'rgba(0,223,143,0.1)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(0,223,143,0.25)', letterSpacing: '.05em' }}>{project.presentation}</span>}
          </div>
          <h3>{project.title}</h3>
          <p>{project.desc}</p>
          
          {project.highlights && (
            <div className="project-highlights">
              <span className="highlights-title">KEY PPT HIGHLIGHTS & MODULES</span>
              <ul className="highlights-list">
                {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}

          <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <button className="button button-primary" data-testid="button-explore-project" onClick={() => setModalOpen(true)}>EXPLORE PPT PRESENTATION <ArrowUpRight size={14} /></button>
        </div>
      </div>
    </div>

    {modalOpen && <PptViewerModal project={project} onClose={() => setModalOpen(false)} onNext={() => setActive((active + 1) % projects.length)} />}
  </section>;
}

interface AiCoreNode {
  id: string;
  name: string;
  shortName: string;
  category: string;
  cluster: 'core' | 'perception' | 'language' | 'learning' | 'security';
  efficiency: string;
  synapses: number;
  throughput: string;
  desc: string;
  highlights: string[];
  projects: string[];
  color: string;
  x: number;
  y: number;
  z: number;
  connections: string[];
}

const aiCoreNodes: AiCoreNode[] = [
  {
    id: 'data',
    name: 'DATA & FOUNDATION PIPELINES',
    shortName: 'DATA',
    category: 'FOUNDATION KNOWLEDGE',
    cluster: 'core',
    efficiency: '99.4%',
    synapses: 8,
    throughput: '64.8 GB/s Preprocessed',
    desc: 'The foundational lifeblood of every intelligent system. Powers multimodal telemetry ingestion, tensor normalization, spatial masking, and clean vector representations across raw satellite and sensor datasets.',
    highlights: ['Multi-Sensor Geospatial Preprocessing', 'Continuous Clean Vector Serialization', 'Zero-Loss Telemetry Pipelines'],
    projects: ['Lunar Terrain Datasets', 'UHIMS Thermal GeoTIFFs', 'Disaster Telemetry Streams'],
    color: '#00df8f',
    x: 0,
    y: 0.05,
    z: 0,
    connections: ['ai', 'ml', 'dl', 'vision', 'nlp', 'algo', 'sec']
  },
  {
    id: 'ai',
    name: 'AUTONOMOUS REASONING & AI',
    shortName: 'AI',
    category: 'COGNITIVE SYSTEMS',
    cluster: 'core',
    efficiency: '97.8%',
    synapses: 6,
    throughput: '14.2 TFLOPS Inference',
    desc: 'High-level cognitive orchestration, autonomous state planning, and multi-agent synthesis that transform raw multi-modal environmental perception into mission-critical automated execution.',
    highlights: ['Multi-Agent Goal Planning & State Machines', 'Context-Aware Risk Assessment Heuristics', 'Autonomous Trajectory Scoring'],
    projects: ['Autonomous Lunar Rover Navigation', 'IIT Guwahati Hackathon D-FUSE Engine'],
    color: '#00ffb2',
    x: 0,
    y: -0.78,
    z: 0.25,
    connections: ['data', 'ml', 'dl', 'nlp', 'vision']
  },
  {
    id: 'ml',
    name: 'MACHINE LEARNING',
    shortName: 'ML',
    category: 'PREDICTIVE MODELING',
    cluster: 'learning',
    efficiency: '95.8%',
    synapses: 5,
    throughput: '8.4k Predictions/sec',
    desc: 'Supervised and unsupervised statistical modeling, gradient boosting, Bayesian optimization, and feature importance tuning engineered for high-precision environmental analytics.',
    highlights: ['Gradient Boosting & Ensemble Classifiers', 'Bayesian Hyperparameter Optimization', 'Thermal Surface Trend Regression'],
    projects: ['UHIMS Urban Heat Island Predictor', 'Automated Risk Classification'],
    color: '#38ef7d',
    x: -0.72,
    y: -0.32,
    z: 0.42,
    connections: ['data', 'ai', 'dl', 'algo']
  },
  {
    id: 'dl',
    name: 'DEEP LEARNING ARCHITECTURES',
    shortName: 'DEEP LEARNING',
    category: 'NEURAL NETWORKS',
    cluster: 'learning',
    efficiency: '97.4%',
    synapses: 6,
    throughput: '18.6 TFLOPS Neural Engine',
    desc: 'Hierarchical feature representations, multi-scale convolutional networks, and transformer attention mechanisms engineered for dense feature extraction and complex semantic classification.',
    highlights: ['Feature Pyramid Networks (FPN)', 'Transformer Attention Mechanisms', 'Residual Backbones & Depthwise Convolutions'],
    projects: ['YOLOv8 Hazard Detection', 'SegFormer Satellite Terrain Segmentation'],
    color: '#00f0ff',
    x: 0.72,
    y: -0.32,
    z: 0.42,
    connections: ['data', 'ai', 'ml', 'vision', 'nlp']
  },
  {
    id: 'vision',
    name: 'COMPUTER VISION',
    shortName: 'VISION',
    category: 'VISUAL PERCEPTION AI',
    cluster: 'perception',
    efficiency: '96.6%',
    synapses: 5,
    throughput: '45 FPS @ 4K Spatial',
    desc: 'Real-time spatial perception, edge extraction, crater detection, morphological filtering, and satellite terrain hazard classification for planetary mobility and autonomous mapping.',
    highlights: ['YOLO Real-Time Obstacle Detection', 'Morphological Edge & Shadow Filtering', 'Surface Roughness Contour Mapping'],
    projects: ['Lunar AI Crater & Hazard Detection', 'UHIMS Thermal Satellite Segmentation'],
    color: '#63c6eb',
    x: -0.62,
    y: 0.42,
    z: -0.38,
    connections: ['data', 'ai', 'dl', 'algo']
  },
  {
    id: 'nlp',
    name: 'NATURAL LANGUAGE PROCESSING',
    shortName: 'NLP',
    category: 'LANGUAGE & SEMANTIC AI',
    cluster: 'language',
    efficiency: '95.1%',
    synapses: 5,
    throughput: '1.2k Tokens/sec Streamed',
    desc: 'Semantic embeddings, high-dimensional cosine similarity clustering, contradiction detection across unstructured reports, and LLM-driven incident reconciliation for crisis management.',
    highlights: ['Vector Semantic Embeddings & Clustering', 'Multi-Source Contradiction Resolution', 'Dynamic Disaster Evidence Synthesis'],
    projects: ['D-FUSE Disaster Evidence Fusion Engine'],
    color: '#80ffea',
    x: 0.62,
    y: 0.42,
    z: -0.38,
    connections: ['data', 'ai', 'dl', 'sec']
  },
  {
    id: 'algo',
    name: 'ALGORITHMS & GRAPH THEORY',
    shortName: 'ALGORITHMS',
    category: 'COMPUTATIONAL CORE',
    cluster: 'core',
    efficiency: '99.2%',
    synapses: 6,
    throughput: 'O(N log N) Traversal',
    desc: 'Optimal graph algorithms, A* heuristic pathfinding, dynamic programming, and memory-aligned structures for energy-optimal robotic trajectory planning and shortest-path routing.',
    highlights: ['A* Heuristic Rover Pathfinding', 'Disjoint Set Union & Min Spanning Trees', 'Asymptotic Space-Time Optimization'],
    projects: ['Lunar Rover Safe Traversal Planner', 'High-Speed Grid Routing Engine'],
    color: '#00df8f',
    x: -0.42,
    y: 0.82,
    z: 0.28,
    connections: ['data', 'ml', 'vision', 'sec']
  },
  {
    id: 'sec',
    name: 'CYBERSECURITY & DEFENSE',
    shortName: 'SECURITY',
    category: 'DEFENSIVE AI & ZERO-TRUST',
    cluster: 'security',
    efficiency: '98.5%',
    synapses: 5,
    throughput: 'SHA-256 / Spectral Verified',
    desc: 'Adversarial machine learning defense, synthetic voice impersonation detection via spectral audio analysis, and zero-trust cryptographic verification across distributed systems.',
    highlights: ['Deepfake Audio Spectral Decomposition', 'Cryptographic Integrity Auditing', 'Vulnerability Reconnaissance & Mitigation'],
    projects: ['AI Voice Cloning Detection Engine', 'Interactive Security Terminal'],
    color: '#00e676',
    x: 0.42,
    y: 0.82,
    z: 0.28,
    connections: ['data', 'nlp', 'algo', 'ai']
  }
];

function AiCore() {
  const [selectedId, setSelectedId] = useState<string>('data');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCluster, setActiveCluster] = useState<'all' | 'core' | 'perception' | 'language' | 'learning' | 'security'>('all');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [pulseTimestamp, setPulseTimestamp] = useState<number>(Date.now());
  const [isPulsing, setIsPulsing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotYRef = useRef<number>(0.35);
  const rotXRef = useRef<number>(0.12);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const projectedNodesRef = useRef<Map<string, { x: number; y: number; z: number; depth: number }>>(new Map());

  const selectedNode = useMemo(() => {
    return aiCoreNodes.find(n => n.id === selectedId) || aiCoreNodes[0];
  }, [selectedId]);

  const triggerPulse = () => {
    setPulseTimestamp(Date.now());
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 800);
  };

  const resetTilt = () => {
    rotXRef.current = 0.12;
    rotYRef.current = 0.35;
    triggerPulse();
  };

  const nextNode = () => {
    const currentIndex = aiCoreNodes.findIndex(n => n.id === selectedId);
    const nextIndex = (currentIndex + 1) % aiCoreNodes.length;
    setSelectedId(aiCoreNodes[nextIndex].id);
    triggerPulse();
  };

  const prevNode = () => {
    const currentIndex = aiCoreNodes.findIndex(n => n.id === selectedId);
    const prevIndex = (currentIndex - 1 + aiCoreNodes.length) % aiCoreNodes.length;
    setSelectedId(aiCoreNodes[prevIndex].id);
    triggerPulse();
  };

  // 3D Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Auto rotation
      if (isAutoRotate && !isDraggingRef.current) {
        rotYRef.current += 0.004;
        rotXRef.current = 0.12 + Math.sin(Date.now() * 0.0006) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.40;
      const camDist = 2.4;
      const rotY = rotYRef.current;
      const rotX = rotXRef.current;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Draw 3D Holographic Orbit Rings
      const now = Date.now() * 0.001;
      
      // Ring 1
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.05, radius * 0.42, rotY * 0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 223, 143, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 12]);
      ctx.lineDashOffset = -now * 15;
      ctx.stroke();
      ctx.restore();

      // Ring 2 (tilted counter angle)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 0.88, radius * 0.32, -0.65 + Math.sin(now * 0.4) * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 198, 235, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 16]);
      ctx.lineDashOffset = now * 10;
      ctx.stroke();
      ctx.restore();

      // Project all 3D Nodes
      const projected = new Map<string, { x: number; y: number; z: number; depth: number; node: AiCoreNode }>();
      aiCoreNodes.forEach(node => {
        // Rotate Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        // Rotate X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const depth = camDist / (camDist + z2);
        const screenX = centerX + x1 * radius * depth;
        const screenY = centerY + y2 * radius * depth;

        projected.set(node.id, { x: screenX, y: screenY, z: z2, depth, node });
      });

      projectedNodesRef.current = projected;

      // Draw 3D Synapse Connection Lines & Animated Electrical Pulses
      const drawnLines = new Set<string>();

      aiCoreNodes.forEach(source => {
        const p1 = projected.get(source.id);
        if (!p1) return;

        source.connections.forEach(targetId => {
          const lineKey = [source.id, targetId].sort().join('-');
          if (drawnLines.has(lineKey)) return;
          drawnLines.add(lineKey);

          const p2 = projected.get(targetId);
          if (!p2) return;

          const isConnectedToSelected = source.id === selectedId || targetId === selectedId;
          const isConnectedToHovered = source.id === hoveredId || targetId === hoveredId;
          const matchesCluster = activeCluster === 'all' || source.cluster === activeCluster || aiCoreNodes.find(n => n.id === targetId)?.cluster === activeCluster;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (isConnectedToSelected || isConnectedToHovered) {
            ctx.strokeStyle = 'rgba(0, 223, 143, 0.75)';
            ctx.lineWidth = 2.2;
            ctx.shadowColor = '#00df8f';
            ctx.shadowBlur = 10;
          } else if (!matchesCluster) {
            ctx.strokeStyle = 'rgba(0, 223, 143, 0.06)';
            ctx.lineWidth = 0.8;
          } else {
            ctx.strokeStyle = 'rgba(0, 223, 143, 0.22)';
            ctx.lineWidth = 1.2;
          }
          ctx.stroke();
          ctx.restore();

          // Animated Electrical Pulses along this synapse
          if (matchesCluster || isConnectedToSelected) {
            const speed = isConnectedToSelected ? 0.8 : 0.4;
            const offset = (source.id.charCodeAt(0) * 17 + targetId.charCodeAt(0) * 23) % 100 / 100;
            const t = (now * speed + offset) % 1;

            const pulseX = p1.x + (p2.x - p1.x) * t;
            const pulseY = p1.y + (p2.y - p1.y) * t;
            const pulseDepth = p1.depth + (p2.depth - p1.depth) * t;

            ctx.save();
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, (isConnectedToSelected ? 3.5 : 2) * pulseDepth, 0, Math.PI * 2);
            ctx.fillStyle = isConnectedToSelected ? '#afffe4' : '#00df8f';
            ctx.shadowColor = '#00df8f';
            ctx.shadowBlur = isConnectedToSelected ? 12 : 6;
            ctx.fill();
            ctx.restore();
          }
        });
      });

      // Pulse Shockwave Animation
      const pulseAge = (Date.now() - pulseTimestamp) / 1000;
      if (pulseAge < 0.9) {
        const selP = projected.get(selectedId) || { x: centerX, y: centerY };
        const waveProgress = pulseAge / 0.9;
        const waveRadius = waveProgress * radius * 1.2;
        const waveAlpha = (1 - waveProgress) * 0.7;

        ctx.save();
        ctx.beginPath();
        ctx.arc(selP.x, selP.y, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 223, 143, ${waveAlpha})`;
        ctx.lineWidth = 3 * (1 - waveProgress) + 0.5;
        ctx.shadowColor = '#00df8f';
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.restore();
      }

      // Sort Nodes by Z (back to front) for accurate 3D layering
      const sortedProjected = Array.from(projected.values()).sort((a, b) => a.z - b.z);

      // Draw Nodes
      sortedProjected.forEach(({ x, y, depth, node }) => {
        const isSelected = node.id === selectedId;
        const isHovered = node.id === hoveredId;
        const inCluster = activeCluster === 'all' || node.cluster === activeCluster;
        const baseRadius = (isSelected ? 10 : isHovered ? 8 : 6) * depth;
        const alpha = inCluster ? 1 : 0.25;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer Glow
        const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, baseRadius * 4);
        glowGrad.addColorStop(0, isSelected ? 'rgba(0, 223, 143, 0.65)' : 'rgba(0, 223, 143, 0.3)');
        glowGrad.addColorStop(1, 'rgba(0, 223, 143, 0)');
        ctx.beginPath();
        ctx.arc(x, y, baseRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Selected Target Brackets / Rotating Ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(x, y, baseRadius * 2.2, now * 2, now * 2 + Math.PI * 1.5);
          ctx.strokeStyle = '#00df8f';
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#00df8f';
          ctx.shadowBlur = 8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, baseRadius * 2.2, now * 2 + Math.PI, now * 2 + Math.PI * 2.5);
          ctx.strokeStyle = '#63c6eb';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

        // Inner Core Dot
        ctx.beginPath();
        ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#ffffff' : node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 16 : 8;
        ctx.fill();

        // High-Contrast Monospace HUD Label Pill
        const label = node.shortName;
        ctx.font = `${isSelected ? '700' : '600'} ${Math.max(10, Math.round(11 * depth))}px 'IBM Plex Mono', monospace`;
        const textMetrics = ctx.measureText(label);
        const pillWidth = textMetrics.width + 14;
        const pillHeight = Math.max(18, Math.round(20 * depth));
        const pillX = x + baseRadius + 8;
        const pillY = y - pillHeight / 2;

        // Label Pill Background
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 4);
        ctx.fillStyle = isSelected ? 'rgba(0, 223, 143, 0.95)' : isHovered ? 'rgba(10, 26, 28, 0.95)' : 'rgba(5, 14, 16, 0.82)';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#8affd1' : isHovered ? '#00df8f' : 'rgba(0, 223, 143, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label Pill Text
        ctx.fillStyle = isSelected ? '#051411' : isHovered ? '#edf7f3' : '#a8c2bc';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, pillX + 7, y);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [selectedId, hoveredId, activeCluster, isAutoRotate, pulseTimestamp]);

  // Canvas Mouse & Drag Interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMouseRef.current.x;
      const deltaY = e.clientY - lastMouseRef.current.y;
      rotYRef.current += deltaX * 0.008;
      rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current - deltaY * 0.008));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Hover hit test
    let foundId: string | null = null;
    projectedNodesRef.current.forEach((proj, id) => {
      const dist = Math.hypot(mouseX - proj.x, mouseY - proj.y);
      if (dist < 28) {
        foundId = id;
      }
    });

    setHoveredId(foundId);
    canvas.style.cursor = isDraggingRef.current ? 'grabbing' : foundId ? 'pointer' : 'grab';
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      const deltaDist = Math.hypot(e.clientX - lastMouseRef.current.x, e.clientY - lastMouseRef.current.y);
      isDraggingRef.current = false;
      if (deltaDist > 6) return; // was dragging, not click
    }

    // Node click hit test
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    projectedNodesRef.current.forEach((proj, id) => {
      const dist = Math.hypot(mouseX - proj.x, mouseY - proj.y);
      if (dist < 32) {
        setSelectedId(id);
        triggerPulse();
      }
    });
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setHoveredId(null);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - lastMouseRef.current.x;
      const deltaY = e.touches[0].clientY - lastMouseRef.current.y;
      rotYRef.current += deltaX * 0.01;
      rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current - deltaY * 0.01));
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="section" id="core">
      <div className="container-wide core-wrap">
        {/* Left Side: Command Telemetry & 3D Interactive Controls */}
        <div className="core-copy">
          <div className="eyebrow">04 / INTELLIGENCE MAP</div>
          <h2>
            THE<br />
            <span className="outline">AI CORE.</span>
          </h2>
          <p>
            A multi-dimensional neural constellation representing the interconnected reasoning systems, 
            visual perception models, and algorithmic foundations I actively engineer and optimize.
          </p>

          {/* 3D Cluster Filter Pills */}
          <div style={{ marginBottom: 10 }}>
            <span className="mono" style={{ fontSize: 10, color: '#79958e', letterSpacing: '.1em', display: 'block', marginBottom: 8 }}>
              FILTER NEURAL CLUSTER // 3D SELECT
            </span>
            <div className="core-cluster-filters">
              {(
                [
                  ['all', 'ALL NODES'],
                  ['core', 'CORE'],
                  ['perception', 'PERCEPTION'],
                  ['learning', 'LEARNING'],
                  ['language', 'LANGUAGE'],
                  ['security', 'SECURITY']
                ] as const
              ).map(([clusterKey, label]) => (
                <button
                  key={clusterKey}
                  className={`button-3d button-3d-sm ${activeCluster === clusterKey ? 'active' : 'button-3d-secondary'}`}
                  onClick={() => {
                    setActiveCluster(clusterKey);
                    triggerPulse();
                  }}
                  data-testid={`button-cluster-${clusterKey}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* System Diagnostic Panel */}
          <div className="core-diagnostic-panel">
            <div className="core-diagnostic-item">
              <span>CORE STATUS</span>
              <strong><span className="core-pulse-dot" style={{ width: 6, height: 6 }} /> ONLINE // SYNCED</strong>
            </div>
            <div className="core-diagnostic-item">
              <span>ACTIVE CLUSTER</span>
              <strong style={{ color: '#63c6eb' }}>{activeCluster.toUpperCase()} MATRIX</strong>
            </div>
            <div className="core-diagnostic-item">
              <span>INTERCONNECTS</span>
              <strong>21 ACTIVE SYNAPSES</strong>
            </div>
            <div className="core-diagnostic-item">
              <span>INFERENCE PIPELINE</span>
              <strong style={{ color: '#8affd1' }}>REAL-TIME 45 FPS</strong>
            </div>
          </div>

          {/* 3D Master Trigger Button */}
          <button
            className={`button-3d ${isPulsing ? 'pressed active' : ''}`}
            style={{ width: '100%', padding: '14px 20px', fontSize: 12 }}
            onClick={triggerPulse}
            data-testid="button-pulse-cascade"
          >
            <Zap size={16} /> FIRE FULL SYNAPTIC CASCADE
          </button>
        </div>

        {/* Right Side: 3D Holographic Visual Hub & Interactive HUD */}
        <div className="core-visual-hub" data-testid="visual-ai-core">
          {/* Hub Header */}
          <div className="core-hub-header">
            <div className="core-hub-status">
              <span className="core-pulse-dot" />
              <span>LIVE NEURAL SYNAPSE MATRIX</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ color: '#00df8f' }}>SYS-ID: TP-CORE // v3.4</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ color: '#63c6eb' }}>ACTIVE: {selectedNode.shortName}</span>
            </div>
          </div>

          {/* 3D Canvas Stage */}
          <div className="core-canvas-stage">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              title="Click and drag to rotate 3D neural constellation. Click any node to inspect telemetry."
            />
            <div className="core-stage-overlay-hint">
              <Orbit size={13} style={{ color: '#00df8f' }} />
              <span>DRAG TO ROTATE 3D CONSTELATION · CLICK NODE TO INSPECT</span>
            </div>
          </div>

          {/* Node Inspector Bottom Panel */}
          <div className="core-hud-inspector" data-testid="text-node-info">
            <div className="core-inspector-top">
              <div className="core-inspector-title">
                <span className="core-inspector-badge">
                  <Activity size={13} /> {selectedNode.category}
                </span>
                <h3>{selectedNode.name}</h3>
              </div>
              <div className="core-inspector-metrics">
                <div className="core-metric-pill">
                  EFFICIENCY: <strong>{selectedNode.efficiency}</strong>
                </div>
                <div className="core-metric-pill">
                  SYNAPSES: <strong>{selectedNode.synapses} CHANNELS</strong>
                </div>
                <div className="core-metric-pill">
                  THROUGHPUT: <strong>{selectedNode.throughput}</strong>
                </div>
              </div>
            </div>

            <p className="core-inspector-desc">{selectedNode.desc}</p>

            {/* Architecture Highlights */}
            <div className="core-inspector-highlights">
              {selectedNode.highlights.map((h, i) => (
                <span key={i} className="core-highlight-chip">
                  • {h}
                </span>
              ))}
            </div>

            {/* Powered Projects & 3D Interactive Control Actions */}
            <div className="core-inspector-actions">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="mono" style={{ fontSize: 10, color: '#79958e' }}>POWERS:</span>
                {selectedNode.projects.map((p, i) => (
                  <span
                    key={i}
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: '#00df8f',
                      background: 'rgba(0, 223, 143, 0.08)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      border: '1px solid rgba(0, 223, 143, 0.22)'
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* 3D Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <button
                  className="button-3d button-3d-sm"
                  onClick={triggerPulse}
                  title="Fire energy impulse through active synapses"
                  data-testid="button-pulse-active-node"
                >
                  <Zap size={12} /> PULSE
                </button>
                <button
                  className={`button-3d button-3d-sm ${isAutoRotate ? 'active' : 'button-3d-secondary'}`}
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  title="Toggle continuous 3D constellation auto-orbit"
                  data-testid="button-toggle-orbit"
                >
                  <Orbit size={12} /> {isAutoRotate ? 'ORBIT: ON' : 'ORBIT: OFF'}
                </button>
                <button
                  className="button-3d button-3d-sm button-3d-secondary"
                  onClick={resetTilt}
                  title="Reset 3D perspective to default"
                  data-testid="button-reset-tilt"
                >
                  <RotateCw size={12} /> RESET
                </button>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    className="button-3d button-3d-sm button-3d-secondary"
                    onClick={prevNode}
                    title="Previous Intelligence Node"
                    data-testid="button-prev-node"
                  >
                    ◀
                  </button>
                  <button
                    className="button-3d button-3d-sm button-3d-secondary"
                    onClick={nextNode}
                    title="Next Intelligence Node"
                    data-testid="button-next-node"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const skillCodeSnippets: Record<string, string> = {
  Python: `# Multi-Modal Lunar Terrain Hazard Detection
import cv2, torch, numpy as np
from ultralytics import YOLO

model = YOLO('models/lunar_hazard_yolov8.pt')
results = model.predict(source=sat_frame, conf=0.85)
safe_waypoints = compute_a_star_path(hazard_map)
print(f"[STATUS] Extracted {len(safe_waypoints)} optimal safe waypoints.")`,
  
  'React.js': `// 3D Hardware-Accelerated Interactive Interface
import { useRef, useEffect } from 'react';

export function HologramCanvas({ activeNode }) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.4;
  });
  return <mesh ref={meshRef}><sphereGeometry args={[1, 32, 32]} /></mesh>;
}`,

  'C++': `// High-Speed A* Pathfinding Heuristic Traversal
#include <vector>
#include <queue>

template<typename Graph>
std::vector<Point3D> solveOptimalTrajectory(const Graph& terrain) {
    std::priority_queue<Node, std::vector<Node>, HeuristicCost> openSet;
    openSet.push({startNode, 0.0f, heuristic(startNode, target)});
    return reconstructPath(cameFrom, target); // O(N log N)
}`,

  Java: `// Multi-Threaded Concurrent Pipeline
public class TelemetryWorkerPool {
    private final ExecutorService executor = Executors.newFixedThreadPool(8);
    public CompletableFuture<AnalysisReport> dispatch(SensorFrame frame) {
        return CompletableFuture.supplyAsync(() -> processInference(frame), executor);
    }
}`,

  C: `// Low-Level Pointer Memory Addressing & Registers
#include <stdio.h>
#include <stdlib.h>

typedef struct { uint32_t timestamp; float sensor_val; } TelemetryPacket;
void parse_raw_buffer(uint8_t* stream, size_t len) {
    TelemetryPacket* pkt = (TelemetryPacket*)stream;
    asm volatile("nop"); // Low latency memory barrier
}`,

  JavaScript: `// Asynchronous WebSocket Telemetry Stream
const socket = new WebSocket('wss://stream.core.ai/v2/telemetry');
socket.onmessage = (event) => {
  const { node_id, sync_rate } = JSON.parse(event.data);
  dispatchAction({ type: 'SYNC_UPDATE', payload: { node_id, sync_rate } });
};`,

  HTML: `<!-- Semantic Accessible Document Layout -->
<section id="workstation" aria-label="Cyber Developer Console">
  <div class="monitor-chassis" role="region" aria-live="polite">
    <header class="terminal-bar">TIRTHAPADA_OS / ACTIVE</header>
    <main class="code-execution-pane"></main>
  </div>
</section>`,

  CSS: `/* 3D Hardware-Accelerated Bevels & Depth Transforms */
.button-3d-cyber {
  transform: perspective(600px) translateZ(12px);
  box-shadow: 0 6px 0 #006f47, 0 12px 24px rgba(0, 223, 143, 0.4);
  transition: all 0.15s cubic-bezier(0.2, 0, 0.2, 1);
  backdrop-filter: blur(12px);
}`,

  'Tailwind CSS': `// Atomic Utility Architecture
<div className="relative flex items-center justify-between p-4 bg-slate-950/80 border border-emerald-500/30 rounded-xl backdrop-blur-md shadow-2xl hover:border-emerald-400">
  <span className="font-mono text-xs text-emerald-400">STATUS // ACTIVE</span>
</div>`,

  Git: `// Distributed Version Control Hygiene
git checkout -b feature/neural-constellation
git commit -m "feat(ai-core): integrate real-time 3D canvas and tactile buttons"
git rebase origin/main
git push --force-with-lease origin feature/neural-constellation`,

  GitHub: `// CI/CD Automated Build & Verification Pipeline
name: Production Matrix Verification
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install && pnpm build`,

  'AI/ML': `// Multi-Sensor Environmental Prediction Model
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error

model = XGBRegressor(n_estimators=300, learning_rate=0.03, max_depth=6)
model.fit(X_train_geo, y_train_lst)
pred_uhi = model.predict(X_satellite_test)
# Score: R2=0.942 | Inference: 4.2ms`,

  'Machine Learning': `// Supervised Feature Importance Extraction
from sklearn.ensemble import RandomForestClassifier
clf = RandomForestClassifier(n_estimators=200, random_state=42)
clf.fit(X_spatial_features, y_hazard_labels)
top_features = clf.feature_importances_[:5]`,

  Cybersecurity: `// Synthetic Voice Impersonation Spectral Auditing
import librosa, hashlib

def verify_voice_integrity(audio_stream):
    mel_spec = librosa.feature.melspectrogram(y=audio_stream, sr=22050)
    anomaly_score = detector_model.predict(mel_spec)
    return {
        "verdict": "VERIFIED_AUTHENTIC" if anomaly_score < 0.12 else "SYNTHETIC_CLONE",
        "hash": hashlib.sha256(audio_stream).hexdigest()
    }`,

  'Data Structures & Algorithms': `// Disjoint Set Union (DSU) with Path Compression
struct DSU {
    vector<int> parent, rank;
    DSU(int n) : parent(n), rank(n, 0) { iota(parent.begin(), parent.end(), 0); }
    int find(int i) { return parent[i] == i ? i : parent[i] = find(parent[i]); }
    void unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) swap(rootI, rootJ);
            parent[rootJ] = rootI;
            if (rank[rootI] == rank[rootJ]) rank[rootI]++;
        }
    }
};`,

  'Computer Vision': `// Lunar Crater Boundary & Morphological Extraction
import cv2

edges = cv2.Canny(sat_image, threshold1=50, threshold2=150)
contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
hazard_polygons = [c for c in contours if cv2.contourArea(c) > 250]
cv2.drawContours(annotated_surface, hazard_polygons, -1, (0, 255, 143), 2)`,

  NLP: `// D-FUSE Disaster Field Report Semantic Clustering
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

encoder = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = encoder.encode(field_reports)
similarity_matrix = cosine_similarity(embeddings)
contradictions = find_evidence_conflicts(similarity_matrix, threshold=0.88)`
};

function WorkstationPopoutModal({ skill, onClose }: { skill: string; onClose: () => void }) {
  const data = skillsData[skill] || {
    name: skill,
    category: 'SOFTWARE ENGINEERING',
    level: 90,
    levelLabel: 'Advanced',
    desc: skillDescriptions[skill] || 'A core technology explored and applied across projects.',
    highlights: ['Production software implementation', 'Algorithm & memory optimization', 'Clean architecture & testing'],
    projects: ['Team Chandra Repositories', 'Academic & Hackathon Projects']
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="skill-popout-backdrop" onClick={onClose} data-testid="skill-popout-backdrop">
      <div className="skill-popout-modal" onClick={e => e.stopPropagation()} data-testid="skill-popout-modal">
        {/* Clearance Banner */}
        <div className="resume-access-banner" style={{ marginBottom: 20 }}>
          <div className="access-banner-badge">
            <span className="access-dot" />
            <ShieldCheck size={15} />
            <strong>ACCESS GRANTED // TOOLKIT MODULE SPECIFICATION</strong>
          </div>
          <span className="access-code mono">MODULE: {skill.toUpperCase()}</span>
        </div>

        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 20, borderBottom: '1px solid rgba(0,223,143,0.18)', paddingBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="screen-skill-icon-wrap" style={{ width: 52, height: 52 }}>
              <SkillIcon skill={skill} size={24} />
            </div>
            <div>
              <span className="mono" style={{ fontSize: 10, color: '#00df8f', letterSpacing: '.12em' }}>{data.category}</span>
              <h2 style={{ margin: '4px 0 0', font: '700 28px var(--app-font-display)', color: '#edf5f1' }}>{data.name}</h2>
            </div>
          </div>
          <button className="ppt-modal-close" onClick={onClose} aria-label="Close modal" data-testid="button-close-skill-modal">
            <X size={18} />
          </button>
        </div>

        {/* Level & Description */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '600 11px var(--app-font-mono)', color: '#8fa8a2', marginBottom: 6 }}>
            <span>PROFICIENCY LEVEL: <strong style={{ color: '#00df8f' }}>{data.level}%</strong></span>
            <span>{data.levelLabel.toUpperCase()}</span>
          </div>
          <div className="level-meter-track" style={{ height: 8 }}>
            <div className="level-meter-fill" style={{ width: `${data.level}%` }} />
          </div>
        </div>

        <p style={{ color: '#a2b8b2', font: '400 14px/1.7 var(--app-font-sans)', marginBottom: 22 }}>{data.desc}</p>

        {/* Highlights */}
        <div style={{ marginBottom: 22 }}>
          <span className="mono" style={{ fontSize: 11, color: '#79958e', letterSpacing: '.08em', display: 'block', marginBottom: 8 }}>
            PRODUCTION ARCHITECTURE HIGHLIGHTS:
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, font: '500 12px var(--app-font-mono)', color: '#cadbd4', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 6, border: '1px solid rgba(0,223,143,0.15)' }}>
                <Check size={14} style={{ color: '#00df8f', flexShrink: 0 }} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet in Popout */}
        <div style={{ marginBottom: 24 }}>
          <span className="mono" style={{ fontSize: 11, color: '#79958e', letterSpacing: '.08em', display: 'block', marginBottom: 8 }}>
            LIVE CODE IMPLEMENTATION:
          </span>
          <div style={{ background: '#020608', borderRadius: 8, padding: 16, border: '1px solid rgba(0,223,143,0.25)', font: '400 11px/1.65 "IBM Plex Mono", monospace', color: '#a3c2ba', overflowX: 'auto' }}>
            <pre style={{ margin: 0 }}>{skillCodeSnippets[skill] || `// Implementation snippet for ${skill}\n// Optimized for low-latency production execution\n`}</pre>
          </div>
        </div>

        {/* Projects */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid rgba(0,223,143,0.15)', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 11, color: '#79958e' }}>DEPLOYED IN:</span>
            {data.projects.map((p, i) => (
              <span key={i} className="mono" style={{ fontSize: 11, color: '#00df8f', background: 'rgba(0,223,143,0.1)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(0,223,143,0.25)' }}>
                {p}
              </span>
            ))}
          </div>
          <button className="button-3d button-3d-sm" onClick={onClose}>
            RETURN TO WORKSTATION
          </button>
        </div>
      </div>
    </div>
  );
}

const AppleLogoSvg = () => (
  <svg width="13" height="15" viewBox="0 0 170 170" fill="currentColor" style={{ display: 'block' }}>
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.98-14.42-5.74-8.8-10.19-18.77-13.34-29.91-3.15-11.14-4.73-21.72-4.73-31.75 0-14.46 3.73-26.47 11.18-36.03 7.45-9.56 16.9-14.46 28.34-14.7 5.2 0 10.74 1.34 16.62 4.02 5.88 2.68 9.77 4.09 11.67 4.23 1.52-.14 5.6-1.57 12.24-4.3 6.64-2.72 12.23-3.95 16.78-3.7 12.63.78 22.84 5.34 30.63 13.68-11.06 6.74-16.48 16.03-16.27 27.87.21 9.4 3.73 17.26 10.56 23.58 6.83 6.32 14.86 9.87 24.1 10.65-2.29 6.96-5.07 14.18-8.35 21.66zM119.22 32.64c0-7.24 2.67-14.07 8.01-20.49 5.34-6.42 12.02-10.47 20.04-12.15.54 1.52.82 3.18.82 4.97 0 7.35-2.82 14.46-8.45 21.32-5.64 6.86-12.44 10.82-20.42 11.89z"/>
  </svg>
);

const ControlCenterIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" style={{ display: 'block' }}>
    <path d="M2.5 4a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 4zm2 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zM2.5 10.5a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1-1.5-1.5zm6.5 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0z" />
  </svg>
);

function Workstation({ selectedSkill, setSelectedSkill }: { selectedSkill: string; setSelectedSkill: (skill: string) => void }) {
  const activeKey = selectedSkill || 'Python';
  const data = skillsData[activeKey] || skillsData['Python'];
  const [popoutSkill, setPopoutSkill] = useState<string | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkLog, setBenchmarkLog] = useState<string | null>(null);

  // macOS OS Window State: 'open' | 'minimized' | 'closed'
  const [windowState, setWindowState] = useState<'open' | 'minimized' | 'closed'>('open');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [activeApp, setActiveApp] = useState<'studio' | 'terminal' | 'neural' | 'activity' | 'finder'>('studio');
  const [showLaunchpad, setShowLaunchpad] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('12:00:00 PM');

  // macOS Interactive Menus & Control Center
  const [openMenu, setOpenMenu] = useState<string | null>(null); // 'apple' | 'app' | 'file' | 'edit' | 'view' | 'kernel' | 'wifi' | 'controlCenter' | 'battery' | 'clock' | null
  const [showAboutMac, setShowAboutMac] = useState<boolean>(false);
  const [wifiEnabled, setWifiEnabled] = useState<boolean>(true);
  const [currentNetwork, setCurrentNetwork] = useState<string>('Tirthapada-Quantum-5G');
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean>(true);
  const [airdropEnabled, setAirdropEnabled] = useState<boolean>(true);
  const [displayBrightness, setDisplayBrightness] = useState<number>(100);
  const [soundVolume, setSoundVolume] = useState<number>(85);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [lowPowerMode, setLowPowerMode] = useState<boolean>(false);
  const [showSpotlight, setShowSpotlight] = useState<boolean>(false);
  const [spotlightQuery, setSpotlightQuery] = useState<string>('');
  const [hudToast, setHudToast] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; desc: string; time: string }>>([
    { id: '1', title: 'Workstation GPU Engine', desc: 'Hardware FP16 tensor core acceleration active.', time: 'Just now' },
    { id: '2', title: 'Darwin Kernel 24.0.0', desc: 'All system microservices initialized and stable.', time: '3m ago' },
    { id: '3', title: 'Portfolio Workstation Live', desc: 'Local dev server operational on port 5173.', time: '8m ago' }
  ]);

  const triggerToast = (msg: string) => {
    setHudToast(msg);
    setTimeout(() => {
      setHudToast(curr => curr === msg ? null : curr);
    }, 2400);
  };

  const fullDateString = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }, []);

  const desktopRef = useRef<HTMLDivElement>(null);

  // Terminal State
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState<Array<{ type: 'cmd' | 'output' | 'info' | 'success'; text: string }>>([
    { type: 'info', text: 'TIRTHAPADA_OS Darwin 24.0.0 (x86_64/arm64-apple-darwin24) [CUDA ACTIVE]' },
    { type: 'info', text: 'System boot optimal. Last login: Today on console.' },
    { type: 'info', text: 'Type "help" or click any shortcut chip below to execute commands.' },
    { type: 'cmd', text: 'whoami' },
    { type: 'success', text: 'Tirthapada Panda // AI/ML & Cyber Defense Engineer // IIT Guwahati Hackathon Finalist' }
  ]);

  // Neural Lab State
  const [neuralModel, setNeuralModel] = useState<'lunar' | 'dfuse' | 'uhims' | 'deepseek'>('lunar');
  const [neuralPrompt, setNeuralPrompt] = useState('Analyze lunar crater relief topography for obstacle-free path planning.');
  const [neuralOutput, setNeuralOutput] = useState<string>('Ready to initiate forward inference pass across hardware tensor cores.');
  const [isInferencing, setIsInferencing] = useState(false);

  // Close menus when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.mac-menubar') &&
        !target.closest('.mac-dropdown-menu') &&
        !target.closest('.mac-control-center-panel') &&
        !target.closest('.mac-calendar-tray') &&
        !target.closest('.mac-spotlight-modal')
      ) {
        setOpenMenu(null);
        setShowSpotlight(false);
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const primarySkills = [
    'Python', 'C++', 'Java', 'JavaScript', 'React.js', 'HTML', 'CSS',
    'Tailwind CSS', 'Git', 'GitHub', 'AI/ML', 'Cybersecurity',
    'Data Structures & Algorithms', 'Computer Vision', 'NLP'
  ];

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);
    setBenchmarkLog('Executing static analysis & inference benchmark...');
    setTimeout(() => {
      setBenchmarkLog(`[SUCCESS] ${activeKey} compilation verified. Latency: 3.8ms | Memory: Optimal`);
      setIsBenchmarking(false);
    }, 900);
  };

  const handleTermCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;
    const newHist = [...termHistory, { type: 'cmd' as const, text: `$ ${cmdStr}` }];
    if (trimmed === 'clear') {
      setTermHistory([]);
      setTermInput('');
      return;
    }
    if (trimmed === 'help') {
      newHist.push({
        type: 'output',
        text: 'Available Commands:\n  whoami       - Display developer profile & clearance\n  cat resume   - View verified academic credentials & CGPA\n  ls projects  - List deployed repository architectures\n  skills       - Print core technical proficiencies\n  run ai       - Run simulated neural tensor inference\n  benchmark    - Execute compiler & hardware latency test\n  neofetch     - Display system info & ASCII badge\n  clear        - Clear terminal console'
      });
    } else if (trimmed === 'whoami') {
      newHist.push({
        type: 'success',
        text: 'USER: Tirthapada Panda\nROLE: Computer Science Student, AI/ML Researcher, Cyber Defense Enthusiast\nEVENT: IIT Guwahati Hackathon Finalist (Team Chandra)\nSTATUS: Systems Operational | Clearance: VERIFIED'
      });
    } else if (trimmed === 'cat resume' || trimmed === 'resume') {
      newHist.push({
        type: 'output',
        text: 'EDUCATION: GIET University (B.Tech CSE, 2023-2027) | CGPA: 8.41\nACHIEVEMENT: IIT Guwahati Hackathon (Team Chandra - Disaster Mitigation & AI Nav)\nSPECIALIZATIONS: Artificial Intelligence, Deep Learning, Computer Vision, Cybersecurity\nPROJECTS: Lunar AI Rover, D-FUSE Multi-Sensor, UHIMS Heat Islands, QuickBite, Voice Cloning'
      });
    } else if (trimmed.startsWith('ls')) {
      newHist.push({
        type: 'output',
        text: 'drwxr-xr-x  42M  lunar-ai-rover/          (Autonomous navigation & SLAM)\ndrwxr-xr-x  85M  dfuse-disaster-system/   (IIT Guwahati multi-sensor fusion)\ndrwxr-xr-x  64M  uhims-urban-heat-island/ (IIT Guwahati climate digital twin)\ndrwxr-xr-x  28M  quickbite-campus-app/    (Fullstack high-concurrency food delivery)\ndrwxr-xr-x  52M  voice-cloning-tts/       (Neural vocoder & speech synthesis)\n-rw-r--r--   2M  Professional_Resume.pdf  (Clearance Verified)'
      });
    } else if (trimmed === 'skills') {
      newHist.push({
        type: 'output',
        text: 'SKILL                      LEVEL    CATEGORY\n--------------------------------------------------------------\nPython                     95%      CORE PROGRAMMING & AI\nAI/ML & Deep Learning      92%      INTELLIGENT SYSTEMS\nCybersecurity & Defense    88%      SYSTEM SECURITY\nReact.js & Modern Web      90%      INTERFACE ENGINEERING\nC / C++                    86%      SYSTEMS & ALGORITHMS\nComputer Vision & NLP      89%      PERCEPTION & LANGUAGE'
      });
    } else if (trimmed === 'run ai') {
      newHist.push({
        type: 'info',
        text: '[PyTorch CUDA:0] Allocating 2048x2048 FP16 tensor...\nForward pass latency: 3.4ms | Throughput: 142 tok/s\nModel output: Autonomous rover obstacle avoidance path computed. Trajectory safety: 99.8%'
      });
    } else if (trimmed === 'benchmark') {
      newHist.push({
        type: 'info',
        text: 'Benchmarking hardware rig...\n[CUDA Core Clock]: 2450 MHz\n[VRAM Bandwidth]: 512 GB/s\n[Memory Allocation]: 1.2 GB / 32 GB\n[Benchmark Score]: 99.4/100 (Optimal Ultra-Low Latency Execution)'
      });
    } else if (trimmed === 'neofetch') {
      newHist.push({
        type: 'info',
        text: `       .:'       OS: TIRTHAPADA_OS 4.2 Pro (Sonoma Edition)
      __ :'__     Host: Apple Silicon M3 Max Workstation (Emulated)
   .'\`__\`-'__\`.   Kernel: Darwin 24.0.0 (x86_64/arm64)
  :__________.-'  Shell: zsh 5.9 (ttys001)
  :_________:     Display: 3440x1440 Curved 165Hz
   :_________.\`   CPU: 16-Core Neural Processing Rig
    \`.__.-.__.'   GPU: NVIDIA RTX / Metal Accelerated CUDA
                  Memory: 15.2 GB / 32 GB LPDDR5`
      });
    } else {
      newHist.push({
        type: 'output',
        text: `zsh: command not found: ${trimmed}. Type "help" for a list of valid commands.`
      });
    }
    setTermHistory(newHist);
    setTermInput('');
  };

  const handleRunInference = () => {
    setIsInferencing(true);
    setNeuralOutput('Connecting to PyTorch CUDA backend... Loading FP16 model weights...');
    setTimeout(() => {
      if (neuralModel === 'lunar') {
        setNeuralOutput(`[CHANDRA-LUNAR-NAV INFERENCE COMPLETE]\n\nTrajectory: Waypoint [Lat: -84.2, Lon: 12.6, Alt: 14m]\nObstacle Assessment: Hazard probability 0.04% (Low-risk boulder field)\nNavigation Decision: Engage differential wheel steer +12° azimuth\nConfidence Score: 99.6% | Latency: 12.8ms | GPU Tensor Cores: 94%`);
      } else if (neuralModel === 'dfuse') {
        setNeuralOutput(`[D-FUSE DISASTER REASONING COMPLETE]\n\nSensor Streams: Acoustic 16kHz + Thermal FLIR + Optical Drone Feed\nEarly Fusion Output: Survivor distress pattern localized at Grid Sector 4B\nDisaster Alert: Severity Level 4. Drone routing payload dispatched\nConfidence Score: 98.9% | Latency: 15.1ms | Multi-modal Fusion: OK`);
      } else if (neuralModel === 'uhims') {
        setNeuralOutput(`[UHIMS THERMAL TWIN SIMULATION COMPLETE]\n\nUrban Parameter: +20% Tree Canopy Cover across Sector 7\nPredicted Surface Temp: 38.4°C → 34.2°C (-4.2°C Localized Heat Mitigation)\nGIS Heat Index: Reduced from Critical (Amber) to Nominal (Green)\nConfidence Score: 97.8% | Latency: 18.2ms | Simulation Status: Converged`);
      } else {
        setNeuralOutput(`[DEEPSEEK-CODER-PRO OUTPUT]\n\nGenerated CUDA Kernel:\n__global__ void fused_attention_kernel(const half* Q, const half* K, half* Out) {\n    int idx = blockIdx.x * blockDim.x + threadIdx.x;\n    // Hardware accelerated low-latency GEMM execution\n}\nLatency: 9.6ms | Throughput: 164 tok/s | Memory Footprint: 2.1 GB`);
      }
      setIsInferencing(false);
    }, 900);
  };

  const handleCopyBuffer = () => {
    if (activeApp === 'terminal') {
      const text = termHistory.map(h => h.text).join('\n');
      navigator.clipboard?.writeText?.(text);
      triggerToast('Terminal console log copied to clipboard!');
    } else if (activeApp === 'neural') {
      navigator.clipboard?.writeText?.(neuralOutput);
      triggerToast('Neural inference log copied to clipboard!');
    } else {
      const text = `Skill: ${data.name}\nCategory: ${data.category}\nLevel: ${data.level}%\nHighlights:\n${data.highlights.join('\n')}`;
      navigator.clipboard?.writeText?.(text);
      triggerToast(`Copied ${data.name} code spec to clipboard!`);
    }
  };

  const handleClearScreen = () => {
    if (activeApp === 'terminal') {
      setTermHistory([]);
      setTermInput('');
      triggerToast('Terminal history cleared');
    } else if (activeApp === 'neural') {
      setNeuralOutput('Neural cache cleared. Ready for next inference prompt.');
      triggerToast('Neural cache cleared');
    } else {
      triggerToast('Workspace view refreshed');
    }
  };

  const handleRestartKernel = () => {
    setWindowState('open');
    setActiveApp('terminal');
    handleTermCommand('neofetch');
    triggerToast('Kernel Restarted // Darwin 24.0.0 [CUDA ACTIVE]');
  };

  const spotlightResults = useMemo(() => {
    const allItems: Array<{ type: 'app' | 'skill' | 'action'; id: string; title: string; subtitle: string; icon: any; action: () => void }> = [
      {
        type: 'app',
        id: 'studio',
        title: 'Skill Studio.app',
        subtitle: 'Applications • Deep Tech Stacks & Mastery Matrix',
        icon: <Code2 size={16} style={{ color: '#00df8f' }} />,
        action: () => { setWindowState('open'); setActiveApp('studio'); setShowSpotlight(false); }
      },
      {
        type: 'app',
        id: 'terminal',
        title: 'Terminal.sh',
        subtitle: 'Applications • UNIX Shell, Commands & Neofetch',
        icon: <Terminal size={16} style={{ color: '#38bdf8' }} />,
        action: () => { setWindowState('open'); setActiveApp('terminal'); setShowSpotlight(false); }
      },
      {
        type: 'app',
        id: 'neural',
        title: 'Neural Lab.ai',
        subtitle: 'Applications • Real-time AI Model Inference Lab',
        icon: <BrainCircuit size={16} style={{ color: '#c084fc' }} />,
        action: () => { setWindowState('open'); setActiveApp('neural'); setShowSpotlight(false); }
      },
      {
        type: 'app',
        id: 'activity',
        title: 'Activity Monitor.app',
        subtitle: 'Applications • Real-time Hardware Telemetry & RAM',
        icon: <Activity size={16} style={{ color: '#fb7185' }} />,
        action: () => { setWindowState('open'); setActiveApp('activity'); setShowSpotlight(false); }
      },
      {
        type: 'app',
        id: 'finder',
        title: 'Project Finder.app',
        subtitle: 'Applications • Engineered Systems & Case Studies',
        icon: <Folder size={16} style={{ color: '#ffd043' }} />,
        action: () => { setWindowState('open'); setActiveApp('finder'); setShowSpotlight(false); }
      },
      {
        type: 'action',
        id: 'aboutMac',
        title: 'About This Mac',
        subtitle: 'System Info • Apple Silicon Hardware Specs',
        icon: <AppleLogoSvg />,
        action: () => { setShowAboutMac(true); setShowSpotlight(false); }
      },
      {
        type: 'action',
        id: 'benchmark',
        title: 'Run Hardware Benchmark',
        subtitle: 'System Action • Execute Hardware Diagnostics',
        icon: <Cpu size={16} style={{ color: '#ffd043' }} />,
        action: () => {
          setWindowState('open');
          setActiveApp('terminal');
          handleTermCommand('benchmark');
          setShowSpotlight(false);
          triggerToast('Executing Hardware Rig Benchmark...');
        }
      },
      {
        type: 'action',
        id: 'fullscreen',
        title: 'Toggle Fullscreen Mode',
        subtitle: 'Window Action • Maximize Workstation Screen',
        icon: <Maximize2 size={16} style={{ color: '#38bdf8' }} />,
        action: () => {
          setIsMaximized(m => !m);
          setShowSpotlight(false);
          triggerToast('Toggled Display Mode');
        }
      }
    ];

    skills.forEach(skill => {
      allItems.push({
        type: 'skill',
        id: `skill-${skill}`,
        title: `${skill} Mastery`,
        subtitle: `Skill Studio • ${skillsData[skill]?.category || 'Core Skill'}`,
        icon: <Code2 size={16} style={{ color: '#00df8f' }} />,
        action: () => {
          setSelectedSkill(skill);
          setWindowState('open');
          setActiveApp('studio');
          setShowSpotlight(false);
          triggerToast(`Loaded ${skill} in Skill Studio`);
        }
      });
    });

    if (!spotlightQuery.trim()) {
      return allItems.slice(0, 8);
    }
    const q = spotlightQuery.toLowerCase();
    return allItems.filter(item => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)).slice(0, 10);
  }, [spotlightQuery, activeApp, data, setSelectedSkill]);

  return (
    <section className="workstation section" id="workstation">
      <div className="container-wide">
        <div className="eyebrow" style={{ textAlign: 'center' }}>05 / INTERFACE LAB</div>
        <h2>WORKSTATION</h2>

        <div className="workstation-rig">
          {/* Upper Tier: Curved Cyber Ultra-Wide Monitor */}
          <div className="workstation-monitor-frame">
            <span className="monitor-cam-dot" />
            <span className="monitor-power-led" title="Monitor Power: 165Hz Active" />

            <div className="workstation-screen">
              {/* macOS Top Menu Bar */}
              <div className="mac-menubar">
                <div className="mac-menu-left">
                  {/* Apple Logo Menu */}
                  <div style={{ position: 'relative' }}>
                    <div
                      className={`mac-apple-logo ${openMenu === 'apple' ? 'is-active' : ''}`}
                      title="Apple Menu"
                      onClick={() => setOpenMenu(curr => curr === 'apple' ? null : 'apple')}
                      style={{ color: openMenu === 'apple' ? '#00df8f' : '#edf5f1', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <AppleLogoSvg />
                    </div>

                    {openMenu === 'apple' && (
                      <div className="mac-dropdown-menu mac-apple-dropdown">
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setShowAboutMac(true);
                            setOpenMenu(null);
                          }}
                        >
                          <span>About This Mac</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('open');
                            setActiveApp('activity');
                            setOpenMenu(null);
                          }}
                        >
                          <span>System Settings...</span>
                          <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘,</span>
                        </div>
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('open');
                            setActiveApp('finder');
                            setOpenMenu(null);
                          }}
                        >
                          <span>App Store...</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('closed');
                            setOpenMenu(null);
                            triggerToast('Workstation Window Closed');
                          }}
                        >
                          <span>Force Quit Applications...</span>
                          <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌥⌘⎋</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('minimized');
                            setOpenMenu(null);
                            triggerToast('Workstation Put to Sleep');
                          }}
                        >
                          <span>Sleep</span>
                        </div>
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            handleRestartKernel();
                            setOpenMenu(null);
                          }}
                        >
                          <span>Restart...</span>
                        </div>
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('closed');
                            setOpenMenu(null);
                            triggerToast('System Shut Down');
                          }}
                        >
                          <span>Shut Down...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active App Menu */}
                  <div style={{ position: 'relative' }}>
                    <span
                      className={`mac-menu-app-name ${openMenu === 'app' ? 'is-active' : ''}`}
                      onClick={() => setOpenMenu(curr => curr === 'app' ? null : 'app')}
                    >
                      {activeApp === 'studio' ? 'SkillStudio' : activeApp === 'terminal' ? 'Terminal' : activeApp === 'neural' ? 'NeuralLab' : activeApp === 'activity' ? 'ActivityMonitor' : 'Finder'}
                    </span>

                    {openMenu === 'app' && (
                      <div className="mac-dropdown-menu mac-app-dropdown">
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            triggerToast(`${activeApp.toUpperCase()} // Version 4.2 Pro (Optimized)`);
                            setOpenMenu(null);
                          }}
                        >
                          <span>About {activeApp === 'studio' ? 'SkillStudio' : activeApp === 'terminal' ? 'Terminal' : activeApp === 'neural' ? 'NeuralLab' : activeApp === 'activity' ? 'ActivityMonitor' : 'Finder'}</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('open');
                            setActiveApp('activity');
                            setOpenMenu(null);
                          }}
                        >
                          <span>Preferences...</span>
                          <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘,</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('minimized');
                            setOpenMenu(null);
                            triggerToast(`Hidden ${activeApp}`);
                          }}
                        >
                          <span>Hide {activeApp}</span>
                          <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘H</span>
                        </div>
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('open');
                            setOpenMenu(null);
                            triggerToast('All Windows Restored');
                          }}
                        >
                          <span>Show All</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('closed');
                            setOpenMenu(null);
                            triggerToast(`Quit ${activeApp}`);
                          }}
                        >
                          <span>Quit {activeApp}</span>
                          <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘Q</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Standard Menu Items */}
                  <div className="mac-menu-items">
                    {/* File Menu */}
                    <div style={{ position: 'relative' }}>
                      <span
                        className={`mac-menu-item ${openMenu === 'file' ? 'is-active' : ''}`}
                        onClick={() => setOpenMenu(curr => curr === 'file' ? null : 'file')}
                      >
                        File
                      </span>

                      {openMenu === 'file' && (
                        <div className="mac-dropdown-menu mac-file-dropdown">
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('studio');
                              setOpenMenu(null);
                              triggerToast('New Studio Session Ready');
                            }}
                          >
                            <span>New Workspace Tab</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘N</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('finder');
                              setOpenMenu(null);
                              triggerToast('Opened Project Finder');
                            }}
                          >
                            <span>Open Project Finder...</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘O</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              handleCopyBuffer();
                              setOpenMenu(null);
                            }}
                          >
                            <span>Export Buffer to Clipboard</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘S</span>
                          </div>
                          <div className="mac-dropdown-divider" />
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('closed');
                              setOpenMenu(null);
                              triggerToast('Window Closed');
                            }}
                          >
                            <span>Close Window</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘W</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Edit Menu */}
                    <div style={{ position: 'relative' }}>
                      <span
                        className={`mac-menu-item ${openMenu === 'edit' ? 'is-active' : ''}`}
                        onClick={() => setOpenMenu(curr => curr === 'edit' ? null : 'edit')}
                      >
                        Edit
                      </span>

                      {openMenu === 'edit' && (
                        <div className="mac-dropdown-menu mac-edit-dropdown">
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              triggerToast('Undo Action Dispatched');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Undo</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘Z</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              triggerToast('Redo Action Dispatched');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Redo</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⇧⌘Z</span>
                          </div>
                          <div className="mac-dropdown-divider" />
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              handleCopyBuffer();
                              setOpenMenu(null);
                            }}
                          >
                            <span>Copy Output / Buffer</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘C</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              handleClearScreen();
                              setOpenMenu(null);
                            }}
                          >
                            <span>Clear Screen / History</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘K</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              triggerToast('Selected full buffer');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Select All</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘A</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* View Menu */}
                    <div style={{ position: 'relative' }}>
                      <span
                        className={`mac-menu-item ${openMenu === 'view' ? 'is-active' : ''}`}
                        onClick={() => setOpenMenu(curr => curr === 'view' ? null : 'view')}
                      >
                        View
                      </span>

                      {openMenu === 'view' && (
                        <div className="mac-dropdown-menu mac-view-dropdown">
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setIsMaximized(m => !m);
                              setOpenMenu(null);
                              triggerToast(isMaximized ? 'Windowed Mode' : 'Fullscreen Display Mode');
                            }}
                          >
                            <span>Toggle Fullscreen</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌃⌘F</span>
                          </div>
                          <div className="mac-dropdown-divider" />
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('studio');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Skill Studio</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘1</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('terminal');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Terminal CLI Shell</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘2</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('neural');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Neural Lab AI</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘3</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('activity');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Activity Monitor</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘4</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('finder');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Project Finder</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘5</span>
                          </div>
                          <div className="mac-dropdown-divider" />
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setDisplayBrightness(100);
                              setOpenMenu(null);
                              triggerToast('Display Brightness Reset to 100%');
                            }}
                          >
                            <span>Reset Brightness (100%)</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Kernel / Window Menu */}
                    <div style={{ position: 'relative' }}>
                      <span
                        className={`mac-menu-item ${openMenu === 'kernel' ? 'is-active' : ''}`}
                        onClick={() => setOpenMenu(curr => curr === 'kernel' ? null : 'kernel')}
                      >
                        Kernel
                      </span>

                      {openMenu === 'kernel' && (
                        <div className="mac-dropdown-menu mac-kernel-dropdown">
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('terminal');
                              handleTermCommand('benchmark');
                              setOpenMenu(null);
                              triggerToast('Running Compiler Benchmark...');
                            }}
                          >
                            <span>Run Hardware Benchmark</span>
                            <span className="mono" style={{ fontSize: 9, color: '#6e8d84' }}>⌘R</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setNeuralOutput('Neural cache flushed. All tensor core memory free.');
                              setOpenMenu(null);
                              triggerToast('Neural cache flushed');
                            }}
                          >
                            <span>Clear Neural Cache</span>
                          </div>
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              handleRestartKernel();
                              setOpenMenu(null);
                            }}
                          >
                            <span>Restart Kernel (Darwin 24.0.0)</span>
                          </div>
                          <div className="mac-dropdown-divider" />
                          <div
                            className="mac-dropdown-item"
                            onClick={() => {
                              setWindowState('open');
                              setActiveApp('activity');
                              setOpenMenu(null);
                            }}
                          >
                            <span>Hardware Telemetry Diagnostics</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Launchpad Menu Button */}
                    <span
                      className="mac-menu-item"
                      onClick={() => {
                        setShowLaunchpad(l => !l);
                        setOpenMenu(null);
                      }}
                    >
                      Launchpad
                    </span>
                  </div>
                </div>

                <div className="mac-menu-right" style={{ position: 'relative' }}>
                  {/* Wi-Fi Button & Settings Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <span
                      title={`Wi-Fi: ${wifiEnabled ? currentNetwork : 'Off'}`}
                      onClick={() => setOpenMenu(curr => curr === 'wifi' ? null : 'wifi')}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '1px 4px', borderRadius: 4, background: openMenu === 'wifi' ? 'rgba(0, 223, 143, 0.15)' : 'transparent' }}
                    >
                      {wifiEnabled ? <Wifi size={12} style={{ color: '#edf5f1' }} /> : <WifiOff size={12} style={{ color: '#ff5f57' }} />}
                    </span>

                    {openMenu === 'wifi' && (
                      <div className="mac-dropdown-menu mac-wifi-dropdown">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px' }}>
                          <span style={{ fontWeight: 600, fontSize: 12, color: '#edf5f1' }}>Wi-Fi</span>
                          <div
                            className={`mac-toggle-switch ${wifiEnabled ? 'is-active' : ''}`}
                            onClick={() => {
                              setWifiEnabled(w => !w);
                              triggerToast(!wifiEnabled ? 'Wi-Fi Enabled' : 'Wi-Fi Turned Off');
                            }}
                          >
                            <div className="mac-toggle-knob" />
                          </div>
                        </div>

                        {wifiEnabled ? (
                          <>
                            <div className="mac-dropdown-divider" />
                            <div className="mac-dropdown-header">Known Network</div>
                            <div
                              className="mac-dropdown-item"
                              style={{ background: 'rgba(0, 223, 143, 0.14)', border: '1px solid rgba(0, 223, 143, 0.28)' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Check size={12} style={{ color: '#00df8f' }} />
                                <div>
                                  <div style={{ fontWeight: 600, color: '#edf5f1' }}>{currentNetwork}</div>
                                  <div style={{ fontSize: 9, color: '#00df8f' }}>Connected • 1.2 Gbps • 6GHz WPA3</div>
                                </div>
                              </div>
                              <Wifi size={12} style={{ color: '#00df8f' }} />
                            </div>

                            <div className="mac-dropdown-header" style={{ marginTop: 6 }}>Available Networks</div>
                            {['NeuralNet-Mesh-Lab', 'Starlink-CyberDesk-99', 'IITG-Research-5G'].map((net) => (
                              <div
                                key={net}
                                className="mac-dropdown-item"
                                onClick={() => {
                                  setCurrentNetwork(net);
                                  triggerToast(`Connected to ${net}`);
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <LockKeyhole size={11} style={{ color: '#82a39b' }} />
                                  <span>{net}</span>
                                </div>
                                <Wifi size={11} style={{ color: '#82a39b' }} />
                              </div>
                            ))}

                            <div className="mac-dropdown-divider" />
                            <div
                              className="mac-dropdown-item"
                              onClick={() => {
                                setWindowState('open');
                                setActiveApp('activity');
                                setOpenMenu(null);
                              }}
                            >
                              <span>Wi-Fi Settings...</span>
                            </div>
                          </>
                        ) : (
                          <div style={{ padding: '10px', textAlign: 'center', color: '#8da8a0', fontSize: 11 }}>
                            Wi-Fi is currently turned off.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Control Center Toolbutton */}
                  <div style={{ position: 'relative' }}>
                    <span
                      title="Control Center (Display, Sound, Wi-Fi, Bluetooth)"
                      onClick={() => setOpenMenu(curr => curr === 'controlCenter' ? null : 'controlCenter')}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '1px 4px', borderRadius: 4, color: openMenu === 'controlCenter' ? '#00df8f' : '#edf5f1', background: openMenu === 'controlCenter' ? 'rgba(0, 223, 143, 0.15)' : 'transparent' }}
                    >
                      <ControlCenterIcon />
                    </span>

                    {openMenu === 'controlCenter' && (
                      <div className="mac-control-center-panel">
                        {/* Top Connectivity Grid */}
                        <div className="mac-cc-grid">
                          <div className="mac-cc-tile-group">
                            <div
                              className="mac-cc-tile"
                              onClick={() => {
                                setWifiEnabled(w => !w);
                                triggerToast(!wifiEnabled ? 'Wi-Fi Enabled' : 'Wi-Fi Off');
                              }}
                            >
                              <div className={`mac-cc-icon ${wifiEnabled ? 'is-active' : ''}`}>
                                <Wifi size={13} />
                              </div>
                              <div className="mac-cc-tile-info">
                                <span className="mac-cc-tile-title">Wi-Fi</span>
                                <span className="mac-cc-tile-sub">{wifiEnabled ? currentNetwork : 'Off'}</span>
                              </div>
                            </div>

                            <div
                              className="mac-cc-tile"
                              onClick={() => {
                                setBluetoothEnabled(b => !b);
                                triggerToast(!bluetoothEnabled ? 'Bluetooth Connected: AirPods Pro Max' : 'Bluetooth Off');
                              }}
                            >
                              <div className={`mac-cc-icon ${bluetoothEnabled ? 'is-active' : ''}`}>
                                <Bluetooth size={13} />
                              </div>
                              <div className="mac-cc-tile-info">
                                <span className="mac-cc-tile-title">Bluetooth</span>
                                <span className="mac-cc-tile-sub">{bluetoothEnabled ? 'AirPods Pro Max' : 'Off'}</span>
                              </div>
                            </div>

                            <div
                              className="mac-cc-tile"
                              onClick={() => {
                                setAirdropEnabled(a => !a);
                                triggerToast(!airdropEnabled ? 'AirDrop Active' : 'AirDrop Off');
                              }}
                            >
                              <div className={`mac-cc-icon ${airdropEnabled ? 'is-active' : ''}`}>
                                <Radio size={13} />
                              </div>
                              <div className="mac-cc-tile-info">
                                <span className="mac-cc-tile-title">AirDrop</span>
                                <span className="mac-cc-tile-sub">{airdropEnabled ? 'Contacts Only' : 'Off'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mac-cc-tile-group" style={{ justifyContent: 'center' }}>
                            <div className="mac-cc-tile" onClick={() => triggerToast('Stage Manager Active')}>
                              <div className="mac-cc-icon is-active">
                                <Layers size={13} />
                              </div>
                              <div className="mac-cc-tile-info">
                                <span className="mac-cc-tile-title">Stage Manager</span>
                                <span className="mac-cc-tile-sub">Active</span>
                              </div>
                            </div>

                            <div
                              className="mac-cc-tile"
                              onClick={() => {
                                setIsMaximized(m => !m);
                                triggerToast(!isMaximized ? 'Fullscreen Display Mode' : 'Windowed Display Mode');
                              }}
                            >
                              <div className={`mac-cc-icon ${isMaximized ? 'is-active' : ''}`}>
                                <Monitor size={13} />
                              </div>
                              <div className="mac-cc-tile-info">
                                <span className="mac-cc-tile-title">Display Mode</span>
                                <span className="mac-cc-tile-sub">{isMaximized ? 'Fullscreen' : 'Windowed'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Display Brightness Slider */}
                        <div className="mac-cc-slider-card">
                          <div className="mac-cc-slider-header">
                            <span>Display Brightness</span>
                            <span className="mono">{displayBrightness}%</span>
                          </div>
                          <div className="mac-cc-slider-bar">
                            <Sun size={13} style={{ color: '#ffd043', flexShrink: 0 }} />
                            <input
                              type="range"
                              min="30"
                              max="100"
                              value={displayBrightness}
                              onChange={(e) => setDisplayBrightness(Number(e.target.value))}
                              className="mac-cc-slider-input"
                            />
                          </div>
                        </div>

                        {/* Sound Volume Slider */}
                        <div className="mac-cc-slider-card">
                          <div className="mac-cc-slider-header">
                            <span>Sound Volume</span>
                            <span className="mono">{soundVolume}%</span>
                          </div>
                          <div className="mac-cc-slider-bar">
                            {soundVolume > 0 ? (
                              <Volume2 size={13} style={{ color: '#00df8f', flexShrink: 0 }} />
                            ) : (
                              <VolumeX size={13} style={{ color: '#ff5f57', flexShrink: 0 }} />
                            )}
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={soundVolume}
                              onChange={(e) => setSoundVolume(Number(e.target.value))}
                              className="mac-cc-slider-input"
                            />
                          </div>
                        </div>

                        {/* Now Playing Audio Card */}
                        <div className="mac-cc-tile-group" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #00df8f, #025034)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                              <Atom size={14} style={{ color: '#03080a' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                              <span style={{ fontSize: 10, fontWeight: 600, color: '#edf5f1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                Neural Resonance // Lo-Fi
                              </span>
                              <span style={{ fontSize: 9, color: '#7e9e95' }}>Tirthapada Studio</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setIsPlayingMusic(p => !p);
                              triggerToast(!isPlayingMusic ? 'Resumed Neural Resonance Audio' : 'Paused Audio');
                            }}
                            style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#edf5f1', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                          >
                            {isPlayingMusic ? <Pause size={12} /> : <Play size={12} />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Battery Button & Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <span
                      title="Battery: 100% (Apple Silicon MagSafe)"
                      onClick={() => setOpenMenu(curr => curr === 'battery' ? null : 'battery')}
                      style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '1px 4px', borderRadius: 4, background: openMenu === 'battery' ? 'rgba(0, 223, 143, 0.15)' : 'transparent', color: lowPowerMode ? '#ffd043' : '#edf5f1' }}
                    >
                      <Battery size={13} />
                    </span>

                    {openMenu === 'battery' && (
                      <div className="mac-dropdown-menu mac-battery-dropdown">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px' }}>
                          <span style={{ fontWeight: 600, fontSize: 12, color: '#edf5f1' }}>Battery</span>
                          <span className="mono" style={{ fontSize: 11, color: '#00df8f', fontWeight: 600 }}>100%</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div className="mac-dropdown-header">Power Source</div>
                        <div className="mac-dropdown-item" style={{ cursor: 'default' }}>
                          <span>MagSafe 140W Fast Charger</span>
                          <span className="mono" style={{ fontSize: 9, color: '#00df8f' }}>Connected</span>
                        </div>
                        <div className="mac-dropdown-item" style={{ cursor: 'default' }}>
                          <span>Battery Health</span>
                          <span className="mono" style={{ fontSize: 9, color: '#00df8f' }}>Normal (100%)</span>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setLowPowerMode(l => !l);
                            triggerToast(!lowPowerMode ? 'Low Power Mode Enabled' : 'High Performance Mode Active');
                          }}
                        >
                          <span>Low Power Mode</span>
                          <div className={`mac-toggle-switch ${lowPowerMode ? 'is-active' : ''}`}>
                            <div className="mac-toggle-knob" />
                          </div>
                        </div>
                        <div className="mac-dropdown-divider" />
                        <div
                          className="mac-dropdown-item"
                          onClick={() => {
                            setWindowState('open');
                            setActiveApp('activity');
                            setOpenMenu(null);
                          }}
                        >
                          <span>Battery Settings...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Spotlight Search Button */}
                  <span
                    title="Spotlight Search (⌘Space)"
                    onClick={() => {
                      setShowSpotlight(s => !s);
                      setOpenMenu(null);
                    }}
                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '1px 4px', borderRadius: 4, background: showSpotlight ? 'rgba(0, 223, 143, 0.15)' : 'transparent', color: showSpotlight ? '#00df8f' : '#74968d' }}
                  >
                    <Search size={11} />
                  </span>

                  {/* Digital Clock & Calendar Tray Button */}
                  <div style={{ position: 'relative' }}>
                    <span
                      title={`Today: ${fullDateString}`}
                      onClick={() => setOpenMenu(curr => curr === 'clock' ? null : 'clock')}
                      className="mono"
                      style={{ color: openMenu === 'clock' ? '#00df8f' : '#edf5f1', fontWeight: 600, cursor: 'pointer', padding: '1px 4px', borderRadius: 4, background: openMenu === 'clock' ? 'rgba(0, 223, 143, 0.15)' : 'transparent' }}
                    >
                      {currentTime}
                    </span>

                    {openMenu === 'clock' && (
                      <div className="mac-calendar-tray">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Calendar size={13} style={{ color: '#00df8f' }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#edf5f1' }}>{fullDateString}</span>
                          </div>
                          <Clock size={12} style={{ color: '#7e9e95' }} />
                        </div>

                        {/* System Notifications */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span className="mac-dropdown-header" style={{ padding: 0 }}>Recent Alerts</span>
                            {notifications.length > 0 && (
                              <span
                                onClick={() => setNotifications([])}
                                style={{ fontSize: 9, color: '#00df8f', cursor: 'pointer' }}
                              >
                                Clear All
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto' }}>
                            {notifications.length > 0 ? (
                              notifications.map(n => (
                                <div key={n.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '6px 8px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: '#edf5f1' }}>{n.title}</span>
                                    <span style={{ fontSize: 8, color: '#7e9e95' }}>{n.time}</span>
                                  </div>
                                  <div style={{ fontSize: 9, color: '#a0bcb3' }}>{n.desc}</div>
                                </div>
                              ))
                            ) : (
                              <div style={{ fontSize: 10, color: '#7e9e95', textAlign: 'center', padding: '10px 0' }}>
                                No new notifications
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Spotlight Search Overlay */}
              {showSpotlight && (
                <div className="mac-spotlight-modal">
                  <div className="mac-spotlight-input-row">
                    <Search size={16} style={{ color: '#00df8f' }} />
                    <input
                      type="text"
                      placeholder="Spotlight Search: Launch apps, skills, benchmarks, specs..."
                      value={spotlightQuery}
                      onChange={(e) => setSpotlightQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setShowSpotlight(false);
                        if (e.key === 'Enter' && spotlightResults.length > 0) {
                          spotlightResults[0].action();
                        }
                      }}
                      autoFocus
                      className="mac-spotlight-input"
                    />
                    <span
                      onClick={() => setShowSpotlight(false)}
                      style={{ cursor: 'pointer', color: '#74968d', display: 'flex', alignItems: 'center' }}
                    >
                      <X size={14} />
                    </span>
                  </div>

                  <div className="mac-spotlight-results">
                    {spotlightResults.map((item) => (
                      <div
                        key={item.id}
                        className="mac-spotlight-item"
                        onClick={item.action}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center' }}>
                            {item.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#edf5f1' }}>{item.title}</div>
                            <div style={{ fontSize: 9, color: '#7e9e95' }}>{item.subtitle}</div>
                          </div>
                        </div>
                        <span className="mono" style={{ fontSize: 9, color: '#00df8f' }}>↵ Return</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* macOS HUD Toast Notification */}
              {hudToast && (
                <div className="mac-hud-toast">
                  <Sparkles size={14} style={{ color: '#00df8f' }} />
                  <span>{hudToast}</span>
                </div>
              )}

              {/* macOS Desktop Area */}
              <div
                className="mac-desktop"
                ref={desktopRef}
                style={{ filter: `brightness(${displayBrightness}%)` }}
              >
                <div className="mac-desktop-grid-bg" />

                {/* Floating Draggable Desktop Folders & Shortcuts */}
                {[
                  { id: 'projects', label: 'Projects.folder', icon: <Folder size={22} style={{ color: '#ffd043' }} />, app: 'finder', top: 18, right: 18 },
                  { id: 'studio', label: 'Skill Studio.app', icon: <Code2 size={20} style={{ color: '#00df8f' }} />, app: 'studio', top: 104, right: 18 },
                  { id: 'terminal', label: 'Terminal.sh', icon: <Terminal size={20} style={{ color: '#38bdf8' }} />, app: 'terminal', top: 190, right: 18 },
                  { id: 'neural', label: 'Neural Lab.ai', icon: <BrainCircuit size={20} style={{ color: '#c084fc' }} />, app: 'neural', top: 276, right: 18 },
                  { id: 'activity', label: 'Activity.app', icon: <Activity size={20} style={{ color: '#fb7185' }} />, app: 'activity', top: 362, right: 18 },
                ].map(item => (
                  <motion.div
                    key={item.id}
                    className="mac-desktop-shortcut mac-floating-item"
                    drag
                    dragConstraints={desktopRef}
                    dragElastic={0.08}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.15, zIndex: 120, cursor: 'grabbing', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.7))' }}
                    whileHover={{ scale: 1.06 }}
                    onClick={() => {
                      setWindowState('open');
                      setActiveApp(item.app as any);
                    }}
                    title={`Drag to any corner • Click to open ${item.label}`}
                    style={{
                      position: 'absolute',
                      top: item.top,
                      right: item.right,
                      cursor: 'grab',
                      zIndex: 10
                    }}
                  >
                    <div className="mac-shortcut-icon">
                      {item.icon}
                    </div>
                    <span className="mac-shortcut-label">{item.label}</span>
                  </motion.div>
                ))}

                {/* Desktop Empty State: When Window is Closed */}
                {windowState === 'closed' && (
                  <div className="mac-desktop-empty-state">
                    <div className="mac-empty-state-card">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#00df8f', marginBottom: 12 }}>
                        <Monitor size={28} />
                        <span className="mono" style={{ fontSize: 13, letterSpacing: '0.12em', fontWeight: 700 }}>TIRTHAPADA_OS 4.2 PRO [DESKTOP]</span>
                      </div>
                      <h3 style={{ margin: '0 0 10px 0', font: '700 20px var(--app-font-display)', color: '#edf5f1' }}>
                        Active Window Closed
                      </h3>
                      <p style={{ margin: '0 0 18px 0', font: '400 13px/1.6 var(--app-font-sans)', color: '#9cb0aa' }}>
                        All application processes are running in background. Click any application icon or floating folder to launch.
                      </p>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="button-3d button-3d-sm" onClick={() => { setWindowState('open'); setActiveApp('studio'); }}>
                          <Code2 size={13} /> LAUNCH SKILL STUDIO
                        </button>
                        <button className="button-3d button-3d-sm button-3d-secondary" onClick={() => { setWindowState('open'); setActiveApp('terminal'); }}>
                          <Terminal size={13} /> OPEN BASH TERMINAL
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* The Active macOS Window with Genie Minimize Animation */}
                <AnimatePresence mode="wait">
                  {windowState === 'open' && (
                    <motion.div
                      key={`window-${activeApp}`}
                      className={`mac-window ${isMaximized ? 'is-maximized' : ''}`}
                      drag={!isMaximized}
                      dragConstraints={desktopRef}
                      dragElastic={0.04}
                      dragMomentum={false}
                      initial={{ opacity: 0, scale: 0.85, y: 35 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        scaleY: 1,
                        transition: {
                          type: 'spring',
                          damping: 26,
                          stiffness: 300
                        }
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.06,
                        scaleY: 0.03,
                        y: 280,
                        transformOrigin: 'bottom center',
                        transition: {
                          duration: 0.38,
                          ease: [0.32, 0, 0.67, 0] // Authentic macOS genie minimize suction
                        }
                      }}
                      style={{ zIndex: 30 }}
                    >
                    {/* Window Titlebar & Traffic Light Controls */}
                    <div className="mac-titlebar">
                      <div className="mac-traffic-lights">
                        <button
                          className="traffic-btn close"
                          onClick={() => setWindowState('closed')}
                          title="Close Window (⌘W)"
                          aria-label="Close Window"
                        >
                          ✕
                        </button>
                        <button
                          className="traffic-btn minimize"
                          onClick={() => setWindowState('minimized')}
                          title="Minimize Window to Dock (⌘M)"
                          aria-label="Minimize Window"
                        >
                          –
                        </button>
                        <button
                          className="traffic-btn maximize"
                          onClick={() => setIsMaximized(m => !m)}
                          title={isMaximized ? "Restore Window Size" : "Maximize / Fullscreen"}
                          aria-label="Toggle Fullscreen"
                        >
                          {isMaximized ? '⤡' : '⤢'}
                        </button>
                      </div>

                      <div className="mac-window-title">
                        {activeApp === 'studio' && (
                          <>
                            <Code2 size={12} style={{ color: '#00df8f' }} />
                            <span>TIRTHAPADA_OS // SKILL_STUDIO — {activeKey}.ts</span>
                          </>
                        )}
                        {activeApp === 'terminal' && (
                          <>
                            <Terminal size={12} style={{ color: '#00df8f' }} />
                            <span>TIRTHAPADA_OS // BASH_TERMINAL — zsh (80x24)</span>
                          </>
                        )}
                        {activeApp === 'neural' && (
                          <>
                            <BrainCircuit size={12} style={{ color: '#00df8f' }} />
                            <span>TIRTHAPADA_OS // NEURAL_LAB — INFERENCE_ENGINE</span>
                          </>
                        )}
                        {activeApp === 'activity' && (
                          <>
                            <Activity size={12} style={{ color: '#00df8f' }} />
                            <span>TIRTHAPADA_OS // ACTIVITY_MONITOR — HARDWARE TELEMETRY</span>
                          </>
                        )}
                        {activeApp === 'finder' && (
                          <>
                            <Folder size={12} style={{ color: '#00df8f' }} />
                            <span>TIRTHAPADA_OS // FINDER — PROJECTS_EXPLORER</span>
                          </>
                        )}
                      </div>

                      <div className="mac-window-actions">
                        <span className="mono" style={{ color: '#00df8f' }}>SYS: OPTIMAL</span>
                        <span>|</span>
                        <span>GPU: CUDA ONLINE</span>
                      </div>
                    </div>

                    {/* Window Body depending on activeApp */}
                    <div className="mac-window-body">
                      {/* 1. Skill Studio View */}
                      {activeApp === 'studio' && (
                        <div className="mac-studio-body">
                          {/* Left: Telemetry */}
                          <div className="screen-info-side">
                            <div>
                              <div className="screen-skill-header">
                                <div className="screen-skill-icon-wrap">
                                  <SkillIcon skill={activeKey} size={22} />
                                </div>
                                <div>
                                  <span>{data.category}</span>
                                  <h3>{data.name}</h3>
                                </div>
                              </div>

                              <div className="screen-level-meter">
                                <div className="level-meter-labels">
                                  <span>PROFICIENCY MASTERY</span>
                                  <span style={{ color: '#00df8f' }}>{data.level}% // {data.levelLabel.toUpperCase()}</span>
                                </div>
                                <div className="level-meter-track">
                                  <div className="level-meter-fill" style={{ width: `${data.level}%` }} />
                                </div>
                              </div>

                              <p className="screen-skill-desc">{data.desc}</p>

                              <div className="screen-tags-row">
                                {data.highlights.map((h, i) => (
                                  <span key={i} className="screen-tag-pill">• {h}</span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                                <span className="mono" style={{ fontSize: 10, color: '#79958e' }}>DEPLOYED IN:</span>
                                {data.projects.map((p, i) => (
                                  <span
                                    key={i}
                                    className="mono"
                                    style={{
                                      fontSize: 10,
                                      color: '#00df8f',
                                      background: 'rgba(0, 223, 143, 0.08)',
                                      padding: '3px 8px',
                                      borderRadius: 4,
                                      border: '1px solid rgba(0, 223, 143, 0.22)'
                                    }}
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>

                              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                <button
                                  className="button-3d button-3d-sm"
                                  onClick={() => setPopoutSkill(activeKey)}
                                  data-testid="button-popout-skill"
                                  title="Pop out this skill card into a full modal"
                                >
                                  <ExternalLink size={12} /> POP OUT FULL VIEW
                                </button>
                                <button
                                  className={`button-3d button-3d-sm ${isBenchmarking ? 'pressed' : 'button-3d-secondary'}`}
                                  onClick={handleRunBenchmark}
                                  data-testid="button-benchmark-skill"
                                >
                                  <Zap size={12} /> RUN BENCHMARK
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Right: Code Specification */}
                          <div className="screen-terminal-side">
                            <div className="screen-term-header">
                              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Code2 size={12} style={{ color: '#00df8f' }} />
                                {activeKey.toLowerCase().replace(/[^a-z0-9]/g, '_')}_spec.ts
                              </span>
                              <span style={{ color: '#00df8f' }}>READ-ONLY // LIVE</span>
                            </div>

                            <div className="screen-term-body">
                              <pre>{skillCodeSnippets[activeKey] || `// Production specification for ${activeKey}\n// Optimized for low-latency hardware execution`}</pre>
                            </div>

                            <div className="screen-term-actions">
                              <span className="mono" style={{ fontSize: 10, color: isBenchmarking ? '#63c6eb' : benchmarkLog ? '#00df8f' : '#6f8b83' }}>
                                {benchmarkLog || 'READY TO COMPILE & EXECUTE'}
                              </span>
                              <button
                                className="button-3d button-3d-sm button-3d-secondary"
                                style={{ padding: '4px 10px', fontSize: 9 }}
                                onClick={() => setPopoutSkill(activeKey)}
                                title="Inspect full details"
                              >
                                <ExternalLink size={10} /> INSPECT
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. Interactive Terminal View */}
                      {activeApp === 'terminal' && (
                        <div className="mac-terminal-view">
                          <div className="mac-term-history">
                            {termHistory.map((item, idx) => (
                              <div key={idx} className={`mac-term-line ${item.type}`}>
                                {item.text}
                              </div>
                            ))}
                          </div>

                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              handleTermCommand(termInput);
                            }}
                            className="mac-term-input-row"
                          >
                            <span style={{ color: '#00df8f', fontWeight: 600 }}>tirthapada@workstation:~$</span>
                            <input
                              type="text"
                              className="mac-term-input"
                              value={termInput}
                              onChange={e => setTermInput(e.target.value)}
                              placeholder="Type command ('help', 'whoami', 'cat resume', 'ls projects', 'benchmark')..."
                              autoFocus
                            />
                            <button type="submit" className="button-3d button-3d-sm" style={{ padding: '3px 8px', fontSize: 10 }}>
                              EXEC
                            </button>
                          </form>

                          <div className="mac-term-quick-chips">
                            <span className="mono" style={{ fontSize: 10, color: '#6e8c84' }}>QUICK COMMANDS:</span>
                            {['help', 'whoami', 'cat resume', 'ls projects', 'skills', 'run ai', 'benchmark', 'neofetch', 'clear'].map(cmd => (
                              <button key={cmd} className="mac-chip-btn" onClick={() => handleTermCommand(cmd)}>
                                {cmd}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Neural AI Playground View */}
                      {activeApp === 'neural' && (
                        <div className="mac-neural-view">
                          <div className="mac-neural-controls">
                            <div>
                              <span className="mono" style={{ fontSize: 10, color: '#79958e', letterSpacing: '.08em', display: 'block', marginBottom: 8 }}>
                                SELECT AI ARCHITECTURE // PYTORCH FP16:
                              </span>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {[
                                  { id: 'lunar' as const, name: 'Chandra-Lunar-Nav', desc: 'Autonomous Terrain SLAM' },
                                  { id: 'dfuse' as const, name: 'D-FUSE Multi-Sensor', desc: 'IIT Guwahati Disaster Model' },
                                  { id: 'uhims' as const, name: 'UHIMS Thermal-Twin', desc: 'IIT Guwahati Heat Simulator' },
                                  { id: 'deepseek' as const, name: 'DeepSeek-Coder-Pro', desc: 'Hardware CUDA Kernels' },
                                ].map(m => (
                                  <button
                                    key={m.id}
                                    className={`button-3d button-3d-sm ${neuralModel === m.id ? 'active' : 'button-3d-secondary'}`}
                                    style={{ textAlign: 'left', padding: '8px 10px', height: 'auto' }}
                                    onClick={() => setNeuralModel(m.id)}
                                  >
                                    <div style={{ fontWeight: 700, fontSize: 11 }}>{m.name}</div>
                                    <div style={{ fontSize: 9, opacity: 0.8 }}>{m.desc}</div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="mono" style={{ fontSize: 10, color: '#79958e', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>
                                INFERENCE PROMPT INPUT:
                              </span>
                              <textarea
                                value={neuralPrompt}
                                onChange={e => setNeuralPrompt(e.target.value)}
                                rows={3}
                                style={{
                                  width: '100%',
                                  background: 'rgba(2, 6, 8, 0.85)',
                                  border: '1px solid rgba(0, 223, 143, 0.25)',
                                  borderRadius: 8,
                                  padding: 10,
                                  color: '#e1f5ee',
                                  font: '400 12px var(--app-font-mono)',
                                  resize: 'none'
                                }}
                              />
                            </div>

                            <button
                              className={`button-3d ${isInferencing ? 'pressed' : ''}`}
                              onClick={handleRunInference}
                              disabled={isInferencing}
                            >
                              <Zap size={14} /> {isInferencing ? 'GENERATING TENSORS...' : 'RUN LIVE INFERENCE'}
                            </button>
                          </div>

                          <div className="mac-neural-output">
                            <div className="screen-term-header">
                              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Sparkles size={12} style={{ color: '#00df8f' }} />
                                LIVE INFERENCE STREAM [CUDA:0]
                              </span>
                              <span style={{ color: '#00df8f' }}>FP16 // 165Hz</span>
                            </div>
                            <div className="screen-term-body" style={{ color: isInferencing ? '#63c6eb' : '#a3c2ba' }}>
                              <pre>{neuralOutput}</pre>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. Activity Monitor Telemetry View */}
                      {activeApp === 'activity' && (
                        <div className="mac-activity-view">
                          <div className="mac-telemetry-grid">
                            <div className="mac-stat-card">
                              <span className="mono" style={{ fontSize: 10, color: '#79958e' }}>CPU UTILIZATION</span>
                              <strong style={{ fontSize: 18, color: '#00df8f' }}>28.4%</strong>
                              <div className="level-meter-track" style={{ height: 4 }}>
                                <div className="level-meter-fill" style={{ width: '28%' }} />
                              </div>
                              <span style={{ fontSize: 9, color: '#688981' }}>16 Cores Active</span>
                            </div>
                            <div className="mac-stat-card">
                              <span className="mono" style={{ fontSize: 10, color: '#79958e' }}>GPU CUDA ENGINE</span>
                              <strong style={{ fontSize: 18, color: '#63c6eb' }}>82.1%</strong>
                              <div className="level-meter-track" style={{ height: 4 }}>
                                <div className="level-meter-fill" style={{ width: '82%', background: '#63c6eb' }} />
                              </div>
                              <span style={{ fontSize: 9, color: '#688981' }}>Temp: 49°C | VRAM: 6.4 GB</span>
                            </div>
                            <div className="mac-stat-card">
                              <span className="mono" style={{ fontSize: 10, color: '#79958e' }}>MEMORY (LPDDR5)</span>
                              <strong style={{ fontSize: 18, color: '#00df8f' }}>15.2 GB</strong>
                              <div className="level-meter-track" style={{ height: 4 }}>
                                <div className="level-meter-fill" style={{ width: '47%' }} />
                              </div>
                              <span style={{ fontSize: 9, color: '#688981' }}>32.0 GB Total Physical</span>
                            </div>
                            <div className="mac-stat-card">
                              <span className="mono" style={{ fontSize: 10, color: '#79958e' }}>NETWORK LATENCY</span>
                              <strong style={{ fontSize: 18, color: '#00df8f' }}>11.2 ms</strong>
                              <div className="level-meter-track" style={{ height: 4 }}>
                                <div className="level-meter-fill" style={{ width: '95%' }} />
                              </div>
                              <span style={{ fontSize: 9, color: '#688981' }}>Throughput: 840 MB/s</span>
                            </div>
                          </div>

                          <div>
                            <span className="mono" style={{ fontSize: 10, color: '#79958e', letterSpacing: '.08em', display: 'block', marginBottom: 8 }}>
                              ACTIVE PRODUCTION PROCESSES:
                            </span>
                            <table className="mac-process-table">
                              <thead>
                                <tr>
                                  <th>PROCESS NAME</th>
                                  <th>PID</th>
                                  <th>CPU %</th>
                                  <th>MEMORY</th>
                                  <th>STATUS</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>tirthapada_portfolio.worker</td>
                                  <td>4091</td>
                                  <td style={{ color: '#00df8f' }}>24.2%</td>
                                  <td>1.2 GB</td>
                                  <td>RUNNING</td>
                                </tr>
                                <tr>
                                  <td>pytorch_cuda_inference</td>
                                  <td>5182</td>
                                  <td style={{ color: '#63c6eb' }}>31.8%</td>
                                  <td>2.8 GB</td>
                                  <td>RUNNING</td>
                                </tr>
                                <tr>
                                  <td>uhims_urban_simulator</td>
                                  <td>3820</td>
                                  <td>18.5%</td>
                                  <td>890 MB</td>
                                  <td>ACTIVE</td>
                                </tr>
                                <tr>
                                  <td>dfuse_sensor_fusion</td>
                                  <td>2190</td>
                                  <td>12.0%</td>
                                  <td>620 MB</td>
                                  <td>ACTIVE</td>
                                </tr>
                                <tr>
                                  <td>vite_hmr_daemon</td>
                                  <td>1044</td>
                                  <td>2.8%</td>
                                  <td>180 MB</td>
                                  <td>IDLE</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 5. Finder Projects View */}
                      {activeApp === 'finder' && (
                        <div className="mac-finder-view">
                          <div className="mac-finder-sidebar">
                            <span className="mono" style={{ fontSize: 10, color: '#79958e', marginBottom: 8 }}>FAVORITES</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00df8f', fontSize: 11, cursor: 'pointer' }}>
                              <Folder size={12} /> Projects (5)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9cb5af', fontSize: 11, cursor: 'pointer' }}>
                              <FileText size={12} /> Credentials (1)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9cb5af', fontSize: 11, cursor: 'pointer' }}>
                              <Database size={12} /> Datasets (3)
                            </div>
                          </div>

                          <div className="mac-finder-files">
                            {[
                              { name: '01_Lunar_AI_Rover', ext: 'proj', size: '42 MB', desc: 'Autonomous Navigation' },
                              { name: '02_DFUSE_IIT_Guwahati', ext: 'proj', size: '85 MB', desc: 'Multi-Sensor Fusion' },
                              { name: '03_UHIMS_Heat_Island', ext: 'proj', size: '64 MB', desc: 'Climate Digital Twin' },
                              { name: '04_QuickBite_App', ext: 'proj', size: '28 MB', desc: 'High-Concurrency Ordering' },
                              { name: '05_Voice_Cloning_TTS', ext: 'proj', size: '52 MB', desc: 'Neural Speech Vocoder' },
                              { name: 'Tirthapada_Academic_Resume', ext: 'pdf', size: '2.4 MB', desc: 'Clearance: Verified' },
                            ].map((f, i) => (
                              <div
                                key={i}
                                className="mac-desktop-shortcut"
                                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(0, 223, 143, 0.15)', padding: 12 }}
                                onClick={() => {
                                  if (f.ext === 'pdf') {
                                    window.open('/attached_assets/Professional_Resume_for_Former_Academic_(2)_1789013621655.pdf', '_blank');
                                  } else {
                                    const el = document.getElementById('work');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }}
                              >
                                <div className="mac-shortcut-icon" style={{ width: 44, height: 44 }}>
                                  {f.ext === 'pdf' ? <FileText size={22} /> : <Folder size={22} />}
                                </div>
                                <span className="mac-shortcut-label" style={{ fontWeight: 600 }}>{f.name}.{f.ext}</span>
                                <span style={{ fontSize: 9, color: '#74948c' }}>{f.size} • {f.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

                {/* Launchpad Overlay inside Monitor */}
                {showLaunchpad && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(3, 8, 10, 0.94)',
                      backdropFilter: 'blur(20px)',
                      zIndex: 35,
                      padding: '30px 24px 90px 24px',
                      overflowY: 'auto',
                      animation: 'fadeIn 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#00df8f' }}>
                        <LayoutGrid size={20} />
                        <h3 style={{ margin: 0, font: '700 18px var(--app-font-display)', color: '#edf5f1' }}>
                          ALL SKILLS LAUNCHPAD // 17 MODULES
                        </h3>
                      </div>
                      <button className="ppt-modal-close" onClick={() => setShowLaunchpad(false)}>
                        <X size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
                      {primarySkills.map(skill => (
                        <button
                          key={skill}
                          className="mac-desktop-shortcut"
                          style={{
                            width: '100%',
                            background: activeKey === skill ? 'rgba(0, 223, 143, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: `1px solid ${activeKey === skill ? '#00df8f' : 'rgba(0, 223, 143, 0.2)'}`,
                            padding: 12
                          }}
                          onClick={() => {
                            setSelectedSkill(skill);
                            setWindowState('open');
                            setActiveApp('studio');
                            setShowLaunchpad(false);
                          }}
                        >
                          <div className="mac-shortcut-icon" style={{ width: 42, height: 42 }}>
                            <SkillIcon skill={skill} size={20} />
                          </div>
                          <span className="mac-shortcut-label" style={{ fontWeight: 600, color: '#edf5f1' }}>{skill}</span>
                          <span style={{ fontSize: 9, color: '#00df8f' }}>{skillsData[skill]?.level || 90}%</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* macOS Floating Taskbar / Dock inside Monitor */}
                <div className="mac-dock" role="toolbar" aria-label="macOS Application Dock">
                  {/* Finder */}
                  <div
                    className="mac-dock-item"
                    onClick={() => {
                      if (activeApp === 'finder' && windowState === 'open') {
                        setWindowState('minimized');
                      } else {
                        setWindowState('open');
                        setActiveApp('finder');
                      }
                    }}
                  >
                    <span className="mac-dock-tooltip">Finder // Projects</span>
                    <button className={`mac-dock-btn ${activeApp === 'finder' && windowState === 'open' ? 'is-active' : ''}`} aria-label="Finder">
                      <Folder size={18} />
                    </button>
                    {activeApp === 'finder' && (
                      <span className={`mac-dock-dot ${windowState === 'minimized' ? 'minimized' : ''}`} />
                    )}
                  </div>

                  {/* Skill Studio */}
                  <div
                    className="mac-dock-item"
                    onClick={() => {
                      if (activeApp === 'studio' && windowState === 'open') {
                        setWindowState('minimized');
                      } else {
                        setWindowState('open');
                        setActiveApp('studio');
                      }
                    }}
                  >
                    <span className="mac-dock-tooltip">Skill Studio // {activeKey}</span>
                    <button className={`mac-dock-btn ${activeApp === 'studio' && windowState === 'open' ? 'is-active' : ''}`} aria-label="Skill Studio">
                      <Code2 size={18} />
                    </button>
                    {activeApp === 'studio' && (
                      <span className={`mac-dock-dot ${windowState === 'minimized' ? 'minimized' : ''}`} />
                    )}
                  </div>

                  {/* Terminal */}
                  <div
                    className="mac-dock-item"
                    onClick={() => {
                      if (activeApp === 'terminal' && windowState === 'open') {
                        setWindowState('minimized');
                      } else {
                        setWindowState('open');
                        setActiveApp('terminal');
                      }
                    }}
                  >
                    <span className="mac-dock-tooltip">Cyber Terminal // zsh</span>
                    <button className={`mac-dock-btn ${activeApp === 'terminal' && windowState === 'open' ? 'is-active' : ''}`} aria-label="Terminal">
                      <Terminal size={18} />
                    </button>
                    {activeApp === 'terminal' && (
                      <span className={`mac-dock-dot ${windowState === 'minimized' ? 'minimized' : ''}`} />
                    )}
                  </div>

                  {/* Neural Lab */}
                  <div
                    className="mac-dock-item"
                    onClick={() => {
                      if (activeApp === 'neural' && windowState === 'open') {
                        setWindowState('minimized');
                      } else {
                        setWindowState('open');
                        setActiveApp('neural');
                      }
                    }}
                  >
                    <span className="mac-dock-tooltip">Neural Lab // AI Inference</span>
                    <button className={`mac-dock-btn ${activeApp === 'neural' && windowState === 'open' ? 'is-active' : ''}`} aria-label="Neural Lab">
                      <BrainCircuit size={18} />
                    </button>
                    {activeApp === 'neural' && (
                      <span className={`mac-dock-dot ${windowState === 'minimized' ? 'minimized' : ''}`} />
                    )}
                  </div>

                  {/* Activity Monitor */}
                  <div
                    className="mac-dock-item"
                    onClick={() => {
                      if (activeApp === 'activity' && windowState === 'open') {
                        setWindowState('minimized');
                      } else {
                        setWindowState('open');
                        setActiveApp('activity');
                      }
                    }}
                  >
                    <span className="mac-dock-tooltip">Activity Monitor // Telemetry</span>
                    <button className={`mac-dock-btn ${activeApp === 'activity' && windowState === 'open' ? 'is-active' : ''}`} aria-label="Activity Monitor">
                      <Activity size={18} />
                    </button>
                    {activeApp === 'activity' && (
                      <span className={`mac-dock-dot ${windowState === 'minimized' ? 'minimized' : ''}`} />
                    )}
                  </div>

                  {/* Launchpad Skills Drawer */}
                  <div
                    className="mac-dock-item"
                    onClick={() => setShowLaunchpad(s => !s)}
                  >
                    <span className="mac-dock-tooltip">Launchpad // All Skills</span>
                    <button className={`mac-dock-btn ${showLaunchpad ? 'is-active' : ''}`} aria-label="Launchpad">
                      <LayoutGrid size={18} />
                    </button>
                  </div>

                  <div className="mac-dock-separator" />

                  {/* Quick Skill Direct Launches */}
                  {['Python', 'AI/ML', 'React.js', 'Cybersecurity', 'C++'].map(sk => {
                    const isCur = activeKey === sk;
                    return (
                      <div
                        key={sk}
                        className="mac-dock-item"
                        onClick={() => {
                          setSelectedSkill(sk);
                          setWindowState('open');
                          setActiveApp('studio');
                        }}
                      >
                        <span className="mac-dock-tooltip">{sk}</span>
                        <button className={`mac-dock-btn ${isCur && activeApp === 'studio' && windowState === 'open' ? 'is-active' : ''}`} aria-label={sk}>
                          <SkillIcon skill={sk} size={16} />
                        </button>
                        {isCur && activeApp === 'studio' && (
                          <span className={`mac-dock-dot ${windowState === 'minimized' ? 'minimized' : ''}`} />
                        )}
                      </div>
                    );
                  })}

                  <div className="mac-dock-separator" />

                  {/* Reset / Clean */}
                  <div
                    className="mac-dock-item"
                    onClick={() => {
                      setTermHistory([
                        { type: 'info', text: 'TIRTHAPADA_OS Darwin 24.0.0 (x86_64/arm64) [CUDA ACTIVE]' },
                        { type: 'info', text: 'Console buffer cleared. Workstation state reset to default.' }
                      ]);
                      setBenchmarkLog(null);
                      setWindowState('open');
                      setActiveApp('studio');
                    }}
                  >
                    <span className="mac-dock-tooltip">Reset Workstation</span>
                    <button className="mac-dock-btn" aria-label="Reset OS">
                      <RotateCw size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor Heavy-Duty Stand */}
          <div className="workstation-stand" />
          <div className="workstation-stand-base" />

        </div>
      </div>

      {/* Pop-Out Skill Specification Modal */}
      {popoutSkill && (
        <WorkstationPopoutModal
          skill={popoutSkill}
          onClose={() => setPopoutSkill(null)}
        />
      )}

      {/* About This Mac Modal */}
      {showAboutMac && (
        <div className="mac-about-backdrop" onClick={() => setShowAboutMac(false)}>
          <div className="mac-about-card" onClick={e => e.stopPropagation()}>
            <button className="mac-about-close" onClick={() => setShowAboutMac(false)}>✕</button>
            <div style={{ color: '#edf5f1', marginBottom: 12 }}>
              <AppleLogoSvg />
            </div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: 18, color: '#edf5f1', fontWeight: 700 }}>
              MacBook Pro
            </h3>
            <div style={{ fontSize: 11, color: '#8ba69e', marginBottom: 16 }}>16-inch, 2026 (Apple Silicon Architecture)</div>

            <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 10, padding: '12px 14px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7e9e95' }}>Chip</span>
                <span style={{ color: '#edf5f1', fontWeight: 600 }}>Apple M3 Max (16-Core CPU / 40-Core GPU)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7e9e95' }}>Memory</span>
                <span style={{ color: '#edf5f1', fontWeight: 600 }}>64 GB Unified LPDDR5X</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7e9e95' }}>Startup Disk</span>
                <span style={{ color: '#edf5f1', fontWeight: 600 }}>Macintosh HD (2TB NVMe)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7e9e95' }}>macOS</span>
                <span style={{ color: '#00df8f', fontWeight: 600 }}>Sequoia 15.4 (Neural Edition)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#7e9e95' }}>Serial Number</span>
                <span className="mono" style={{ color: '#d1ece4' }}>TP-AI-99482-XDR</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="button-3d button-3d-sm"
                onClick={() => {
                  setShowAboutMac(false);
                  setWindowState('open');
                  setActiveApp('terminal');
                  handleTermCommand('neofetch');
                }}
              >
                More Info...
              </button>
              <button
                className="button-3d button-3d-sm button-3d-secondary"
                onClick={() => setShowAboutMac(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Expertise() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="expertise">
      <div className="container-wide">
        <div className="section-heading">
          <div>
            <div className="eyebrow">06 / DIRECTION</div>
            <h2>AREAS OF<br /><span className="outline">EXPERTISE.</span></h2>
          </div>
        </div>

        <div className="expertise-list">
          {expertise.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.num} className={`expertise-item ${isOpen ? 'open' : ''}`}>
                <button
                  data-testid={`button-expertise-${item.num}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="expertise-btn"
                  aria-expanded={isOpen}
                >
                  <div className="expertise-btn-left">
                    <span className="expertise-num">{item.num}</span>
                    <strong className="expertise-title">{item.title}</strong>
                  </div>
                  <span className="expertise-toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="expertise-body">
                    <div className="expertise-lines">
                      {item.lines.map((line, lIdx) => (
                        <div key={lIdx} className="expertise-line">
                          <span className="expertise-line-bullet">▸</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>

                    <div className="expertise-meta-row">
                      <span className="expertise-meta-label">TOPICS COVERED:</span>
                      {item.topics.map((t) => (
                        <span key={t} className="expertise-chip">{t}</span>
                      ))}
                      <span className="expertise-project-badge">DEPLOYED IN: {item.project}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const [certOpen, setCertOpen] = useState('');
  const certs = ['AI / MACHINE LEARNING', 'CYBERSECURITY', 'PROGRAMMING'];
  return <section className="section" id="achievements">
    <div className="container-wide"><div className="section-heading"><div><div className="eyebrow">07 / PROOF OF WORK</div><h2>ACHIEVEMENTS.</h2></div></div><div className="achievements-grid"><article className="achievement featured"><span className="corner">01</span><div className="big">IIT<br />GUWAHATI</div><h3>HACKATHON EVENT</h3><p>Developed D-FUSE (Disaster Evidence Fusion Engine) & UHIMS (Urban Heat Island Mitigation Simulator) for emergency and climate intelligence.</p></article><article className="achievement"><span className="corner">02</span><div className="big">9.02</div><h3>CURRENT CGPA</h3></article><article className="achievement"><span className="corner">03</span><div className="big">3</div><h3>HACKATHONS PARTICIPATED</h3></article><article className="achievement"><span className="corner">04</span><div className="big">1</div><h3>HACKATHON WIN</h3></article></div><div className="archive"><div className="archive-title"><h3>KNOWLEDGE ARCHIVE</h3><span className="eyebrow">CERTIFICATIONS / DETAILS PENDING</span></div><div className="cert-list">{certs.map((cert) => <button data-testid={`button-cert-${cert.split(' ')[0]}`} key={cert} className={`cert ${certOpen === cert ? 'open' : ''}`} onClick={() => setCertOpen(certOpen === cert ? '' : cert)}><small>ARCHIVE NODE</small><strong>{cert}</strong>{certOpen === cert && <p>Editable placeholder — certification name, issuer and verification link will be added when provided.</p>}</button>)}</div></div></div>
  </section>;
}

interface TermLine {
  id: string;
  type: 'cmd' | 'output' | 'error' | 'success' | 'banner';
  text: string | React.ReactNode;
}

function TerminalSection({
  onResume,
  onToggleTheme,
  currentTheme
}: {
  onResume: () => void;
  onToggleTheme: () => void;
  currentTheme: 'dark' | 'light';
}) {
  const [history, setHistory] = useState<TermLine[]>([
    {
      id: 'b1',
      type: 'banner',
      text: '========================================================================'
    },
    {
      id: 'b2',
      type: 'banner',
      text: '  TIRTHAPADA PANDA // INTERACTIVE DEVELOPER CONSOLE [v2.6.4-prod]'
    },
    {
      id: 'b3',
      type: 'banner',
      text: '  Status: ONLINE (Secure) | Target: AI/ML & Cyber Defense Workstation'
    },
    {
      id: 'b4',
      type: 'banner',
      text: "  Type 'help' to inspect system commands, or click any command chip below."
    },
    {
      id: 'b5',
      type: 'banner',
      text: '========================================================================'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) {
      setHistory(prev => [...prev, { id: String(Date.now()), type: 'cmd', text: '' }]);
      return;
    }

    setCmdHistory(prev => [cmd, ...prev.filter(c => c !== cmd)]);
    setHistoryIdx(-1);

    const newItems: TermLine[] = [
      { id: String(Date.now()), type: 'cmd', text: cmd }
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    }

    if (lower === 'help' || lower === 'commands' || lower === '?') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div className="term-table">
            <div className="term-row"><b className="term-hl">about / bio</b><span>Developer background, academic standing & mission</span></div>
            <div className="term-row"><b className="term-hl">skills / toolkit</b><span>Inspect categorized technical skill set</span></div>
            <div className="term-row"><b className="term-hl">projects</b><span>List all 5 flagship projects with tech stacks</span></div>
            <div className="term-row"><b className="term-hl">contact</b><span>View contact channels, email & social links</span></div>
            <div className="term-row"><b className="term-hl">achievements</b><span>Hackathon wins, IIT Guwahati, CGPA 9.02</span></div>
            <div className="term-row"><b className="term-hl">python train.py</b><span>Execute simulated deep learning training epochs</span></div>
            <div className="term-row"><b className="term-hl">python analyze.py</b><span>Execute telemetry & signal pattern analysis</span></div>
            <div className="term-row"><b className="term-hl">nmap -sV / scan</b><span>Run vulnerability & network service audit</span></div>
            <div className="term-row"><b className="term-hl">matrix / hack</b><span>Execute visual cybersecurity telemetry stream</span></div>
            <div className="term-row"><b className="term-hl">theme [dark|light]</b><span>Toggle live site theme (Current: {currentTheme})</span></div>
            <div className="term-row"><b className="term-hl">resume</b><span>Access verified developer resume</span></div>
            <div className="term-row"><b className="term-hl">ls / dir</b><span>List virtual filesystem files</span></div>
            <div className="term-row"><b className="term-hl">cat &lt;file&gt;</b><span>Read file contents (e.g. cat bio.txt, cat skills.json)</span></div>
            <div className="term-row"><b className="term-hl">whoami</b><span>Print active session identity</span></div>
            <div className="term-row"><b className="term-hl">date</b><span>Print current local timestamp</span></div>
            <div className="term-row"><b className="term-hl">clear / cls</b><span>Clear console display</span></div>
          </div>
        )
      });
    } else if (lower === 'about' || lower === 'bio') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div>
            <div style={{ color: '#00df8f', fontWeight: 700 }}>TIRTHAPADA PANDA // DEVELOPER PROFILE</div>
            <div>Computer Science Engineering student at GIET University (Current CGPA: 9.02).</div>
            <div>Passionate about Artificial Intelligence, Machine Learning, Cybersecurity & full-stack development.</div>
            <div>Experienced in hackathon building (3 hackathons, 1 win including IIT Guwahati Hackathon Team Chandra).</div>
            <div>Philosophy: Turning ideas into practical, intelligent, and impactful systems.</div>
          </div>
        )
      });
    } else if (lower === 'skills' || lower === 'toolkit') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div>
            <div><b style={{ color: '#00df8f' }}>CORE LANGUAGES:</b> Python, Java, C, C++, JavaScript</div>
            <div><b style={{ color: '#00df8f' }}>AI & DATA:</b> Machine Learning, Computer Vision, NLP, PyTorch, YOLO, OpenCV</div>
            <div><b style={{ color: '#00df8f' }}>SECURITY:</b> Cybersecurity, Threat Modeling, Deepfake Detection, Network Auditing</div>
            <div><b style={{ color: '#00df8f' }}>WEB & SYSTEMS:</b> React.js, HTML5, CSS3, Tailwind CSS, Data Structures & Algorithms</div>
            <div><b style={{ color: '#00df8f' }}>DEVOPS & TOOLS:</b> Git, GitHub, Linux CLI, FastAPI, PostgreSQL, MongoDB</div>
          </div>
        )
      });
    } else if (lower === 'projects') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div>
            <div>[01] <b style={{ color: '#00df8f' }}>LUNAR AI:</b> Terrain Analysis & Safe Rover Navigation (YOLO, OpenCV, A* Pathfinding)</div>
            <div>[02] <b style={{ color: '#00df8f' }}>D-FUSE:</b> Dynamic Disaster Evidence Fusion Engine (NLP, LLMs, Multi-Source GPS/Photo)</div>
            <div>[03] <b style={{ color: '#00df8f' }}>UHIMS:</b> Urban Heat Island Mitigation Simulator (IIT Guwahati Hackathon · SegFormer, XGBoost, Leaflet GIS)</div>
            <div>[04] <b style={{ color: '#00df8f' }}>QUICKBITE:</b> Smart Food Ordering Web Platform (Node.js, Express, MongoDB, REST)</div>
            <div>[05] <b style={{ color: '#00df8f' }}>VOICE CLONING DETECTION:</b> AI Deepfake Audio Analysis (Spectral Artifact Detection)</div>
          </div>
        )
      });
    } else if (lower === 'achievements' || lower === 'awards') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div>
            <div>🏆 <b style={{ color: '#00df8f' }}>1st Place / Hackathon Win:</b> IIT Guwahati Hackathon Event · Team Chandra</div>
            <div>🚀 <b style={{ color: '#00df8f' }}>IIT Guwahati Hackathon:</b> Built D-FUSE Disaster Fusion Engine & UHIMS Urban Heat Mitigation Simulator</div>
            <div>🎓 <b style={{ color: '#00df8f' }}>Academic Excellence:</b> 9.02 Current CGPA in Computer Science Engineering</div>
            <div>⭐ <b style={{ color: '#00df8f' }}>Hackathon Track Record:</b> 3 competitive hackathons completed with working MVPs</div>
          </div>
        )
      });
    } else if (lower === 'contact') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div>
            <div>📧 <b style={{ color: '#00df8f' }}>EMAIL:</b> <a href="mailto:tirthapadapanda@gmail.com" style={{ color: '#ebfff8', textDecoration: 'underline' }}>tirthapadapanda@gmail.com</a></div>
            <div>💼 <b style={{ color: '#00df8f' }}>LINKEDIN:</b> <a href="https://www.linkedin.com/in/tirthapada-panda" target="_blank" rel="noreferrer" style={{ color: '#00df8f', textDecoration: 'underline' }}>linkedin.com/in/tirthapada-panda</a></div>
            <div>🐙 <b style={{ color: '#00df8f' }}>GITHUB:</b> <a href="https://github.com/tirthapada" target="_blank" rel="noreferrer" style={{ color: '#00df8f', textDecoration: 'underline' }}>github.com/tirthapada</a></div>
            <div>📍 <b style={{ color: '#00df8f' }}>LOCATION:</b> Baleshwar / Gunupur, Odisha, India (GIET University)</div>
            <div>⭐ <b style={{ color: '#00df8f' }}>STATUS:</b> Active & available for internships, AI/ML engineering & collaborations</div>
          </div>
        )
      });
    } else if (lower === 'resume') {
      onResume();
      window.open('/assets/resume.pdf', '_blank');
      newItems.push({
        id: String(Date.now() + 1),
        type: 'success',
        text: '✓ Access granted! Verified developer resume (PDF) opened in new tab.'
      });
    } else if (lower.startsWith('theme')) {
      onToggleTheme();
      const target = currentTheme === 'dark' ? 'LIGHT' : 'DARK';
      newItems.push({
        id: String(Date.now() + 1),
        type: 'success',
        text: `✓ System display toggled. Portfolio theme switched to ${target} MODE.`
      });
    } else if (lower === 'python train.py') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div style={{ color: '#9bd3bf', fontFamily: 'var(--app-font-mono)' }}>
            <div>$ python train.py --model yolo_satellite_segmenter --epochs 5 --lr 0.001</div>
            <div>[INFO] Loading training dataset: 14,280 annotated satellite/crater frames...</div>
            <div>[INFO] CUDA device active: NVIDIA RTX TensorCore Engine (Accelerated)</div>
            <div>Epoch 1/5 |████████████████████| loss: 0.4215 · mAP@50: 0.812 · val_loss: 0.3890</div>
            <div>Epoch 2/5 |████████████████████| loss: 0.2840 · mAP@50: 0.884 · val_loss: 0.2612</div>
            <div>Epoch 3/5 |████████████████████| loss: 0.1792 · mAP@50: 0.938 · val_loss: 0.1804</div>
            <div>Epoch 4/5 |████████████████████| loss: 0.1085 · mAP@50: 0.965 · val_loss: 0.1140</div>
            <div>Epoch 5/5 |████████████████████| loss: 0.0641 · mAP@50: 0.989 · val_loss: 0.0712</div>
            <div style={{ color: '#00df8f', fontWeight: 600 }}>✓ Training completed successfully. Model checkpoint saved to weights/best.pt [98.9% accuracy]</div>
          </div>
        )
      });
    } else if (lower === 'python analyze.py') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div style={{ color: '#9bd3bf', fontFamily: 'var(--app-font-mono)' }}>
            <div>→ Initializing sensor telemetry stream...</div>
            <div>→ Ingesting multi-source signals (GPS, Citizen Reports, Satellite IR)...</div>
            <div>→ Running NLP semantic contradiction filtering: 0 anomalies found</div>
            <div>→ Uncertainty scoring threshold: 91% confidence confirmed</div>
            <div style={{ color: '#00df8f' }}>✓ Telemetry scan finished: All systems operating within optimal parameters.</div>
          </div>
        )
      });
    } else if (lower.startsWith('nmap') || lower === 'scan') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div style={{ color: '#9bd3bf', fontFamily: 'var(--app-font-mono)' }}>
            <div>Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-10 13:14 IST</div>
            <div>Nmap scan report for portfolio.tirthapada.local (127.0.0.1)</div>
            <div>Host is up (0.00014s latency).</div>
            <div style={{ marginTop: 6, color: '#e0f4ec' }}>
              PORT      STATE SERVICE     VERSION<br />
              22/tcp    open  ssh         OpenSSH 9.3p1 (Debian)<br />
              80/tcp    open  http        Vite/React Engine v7.3<br />
              443/tcp   open  ssl/https   TLSv1.3 Enterprise Protocol<br />
              8000/tcp  open  http-api    FastAPI / PyTorch ML Inference<br />
              5432/tcp  open  postgresql  PostgreSQL 16.1 (D-FUSE Spatial DB)
            </div>
            <div style={{ marginTop: 6, color: '#00df8f' }}>✓ Security posture: HARDENED. No open vulnerabilities detected.</div>
          </div>
        )
      });
    } else if (lower === 'matrix' || lower === 'hack') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div style={{ color: '#00df8f', fontFamily: 'var(--app-font-mono)', lineHeight: 1.4 }}>
            <div>01010100 01001001 01010010 01010100 01001000 01000001 01010000 01000001 01000100 01000001</div>
            <div>[INTERCEPT] Neural weights matrix loaded. Access level: DEVELOPER_ROOT</div>
            <div>01000011 01011001 01000010 01000101 01010010 01010011 01000101 01000011 01010101 01010010</div>
            <div>Wake up, Neo... The portfolio has you. Follow the green rabbit 🐇</div>
          </div>
        )
      });
    } else if (lower === 'ls' || lower === 'dir') {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'output',
        text: (
          <div style={{ color: '#00df8f', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span>bio.txt</span>
            <span>skills.json</span>
            <span>projects.md</span>
            <span>resume.pdf</span>
            <span>train.py</span>
            <span>analyze.py</span>
            <span>contact.sh</span>
          </div>
        )
      });
    } else if (lower.startsWith('cat ')) {
      const file = lower.replace('cat ', '').trim();
      if (file === 'bio.txt') {
        newItems.push({ id: String(Date.now() + 1), type: 'output', text: 'Tirthapada Panda | Computer Science Student & AI/ML Engineer | GIET University | CGPA: 9.02' });
      } else if (file === 'skills.json') {
        newItems.push({ id: String(Date.now() + 1), type: 'output', text: JSON.stringify(skills.slice(0, 8), null, 2) + ' ... and 9 more' });
      } else if (file === 'projects.md') {
        newItems.push({ id: String(Date.now() + 1), type: 'output', text: '# Projects:\n1. Lunar AI (Space AI / Pathfinding)\n2. D-FUSE Disaster Fusion Engine\n3. UHIMS Urban Heat Simulator\n4. QuickBite Smart Platform\n5. Voice Cloning Detection' });
      } else if (file === 'resume.pdf') {
        onResume();
        window.open('/assets/resume.pdf', '_blank');
        newItems.push({ id: String(Date.now() + 1), type: 'success', text: '✓ Verified developer resume (PDF) opened in new tab.' });
      } else if (file === 'contact.sh') {
        newItems.push({ id: String(Date.now() + 1), type: 'output', text: 'echo "Tirthapada Panda | Email: tirthapadapanda@gmail.com | LinkedIn: https://www.linkedin.com/in/tirthapada-panda | GitHub: https://github.com/tirthapada"' });
      } else if (file === 'train.py' || file === 'analyze.py') {
        newItems.push({ id: String(Date.now() + 1), type: 'output', text: `Run this script with: python ${file}` });
      } else {
        newItems.push({ id: String(Date.now() + 1), type: 'error', text: `cat: ${file}: No such file or directory. Try 'ls' to see available files.` });
      }
    } else if (lower === 'whoami') {
      newItems.push({ id: String(Date.now() + 1), type: 'output', text: 'tirthapada (Software Developer · AI/ML · Cybersecurity Engineer)' });
    } else if (lower === 'date') {
      newItems.push({ id: String(Date.now() + 1), type: 'output', text: new Date().toString() });
    } else if (lower.startsWith('echo ')) {
      newItems.push({ id: String(Date.now() + 1), type: 'output', text: cmd.slice(5) });
    } else if (lower.startsWith('sudo')) {
      newItems.push({ id: String(Date.now() + 1), type: 'output', text: 'Nice try! User tirthapada is already running with highest developer root privileges.' });
    } else {
      newItems.push({
        id: String(Date.now() + 1),
        type: 'error',
        text: `Command not found: '${cmd}'. Type 'help' to see available commands.`
      });
    }

    setHistory(prev => [...prev, ...newItems]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1 < cmdHistory.length ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const allCmds = ['help', 'about', 'skills', 'projects', 'contact', 'achievements', 'python train.py', 'python analyze.py', 'nmap -sV', 'matrix', 'theme', 'resume', 'clear', 'ls', 'whoami', 'date'];
      const match = allCmds.find(c => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const quickCommands = ['help', 'skills', 'projects', 'python train.py', 'nmap -sV', 'theme', 'clear'];

  return (
    <section className="section" id="terminal">
      <div className="container-wide terminal-wrap">
        <div className="terminal-copy">
          <div className="eyebrow">08 / INTERACTIVE CONSOLE</div>
          <h2>SECURITY<br /><span className="outline">TERMINAL.</span></h2>
          <p>A fully functional, interactive command line interface. Run commands to inspect project telemetry, trigger neural network training simulations, execute cybersecurity audits, or toggle display settings.</p>
          <div className="terminal-stats-badge">
            <span className="terminal-live-dot" />
            <span className="mono" style={{ color: '#00df8f', fontSize: 11 }}>SYSTEM / INTERACTIVE SHELL READY</span>
          </div>
        </div>

        <div className="terminal" data-testid="visual-terminal" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-bar">
            <i /><i /><i />
            <span style={{ marginLeft: 6 }}>tirthapada@portfolio: ~/terminal</span>
            <span className="terminal-badge-tag">BASH / v5.2</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="term-btn-action" onClick={(e) => { e.stopPropagation(); executeCommand('help'); }}>HELP</button>
              <button className="term-btn-action" onClick={(e) => { e.stopPropagation(); setHistory([]); }}>CLEAR</button>
              <Terminal size={14} style={{ color: '#00df8f' }} />
            </div>
          </div>

          <div className="terminal-body" ref={termBodyRef}>
            {history.map(item => {
              if (item.type === 'banner') {
                return <div key={item.id} className="terminal-line banner">{item.text}</div>;
              }
              if (item.type === 'cmd') {
                return (
                  <div key={item.id} className="terminal-line cmd">
                    <span className="prompt">tirthapada@portfolio:~$</span> <span className="command">{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'error') {
                return <div key={item.id} className="terminal-line error">{item.text}</div>;
              }
              if (item.type === 'success') {
                return <div key={item.id} className="terminal-line success">{item.text}</div>;
              }
              return <div key={item.id} className="terminal-line output">{item.text}</div>;
            })}

            {/* Active interactive prompt input row */}
            <form onSubmit={handleSubmit} className="terminal-input-row" onClick={(e) => e.stopPropagation()}>
              <span className="prompt">tirthapada@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                placeholder="type a command (e.g. 'help', 'skills', 'python train.py')..."
              />
              <span className="cursor" />
            </form>
          </div>

          {/* Quick Command Chips */}
          <div className="terminal-quick-chips">
            <span className="quick-label">QUICK ACTIONS:</span>
            {quickCommands.map(cmd => (
              <button
                key={cmd}
                type="button"
                className="terminal-chip-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
              >
                $ {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ onResume }: { onResume: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('AI / ML Collaboration');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [copied, setCopied] = useState(false);

  const subjects = [
    'AI / ML Collaboration',
    'Internship / Engineering Role',
    'Hackathon / Team Build',
    'General Inquiry'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tirthapadapanda@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
    }, 850);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setStatus('idle');
  };

  const openMailClient = () => {
    const mailtoUrl = `mailto:tirthapadapanda@gmail.com?subject=${encodeURIComponent(`[Portfolio: ${subject}] from ${name || 'Visitor'}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <footer className="contact" id="contact">
      <div className="container-wide">
        <div className="section-heading">
          <div>
            <div className="eyebrow">09 / GET IN TOUCH</div>
            <h2>LET'S BUILD<br /><span className="outline">SOMETHING NEW.</span></h2>
          </div>
        </div>

        <div className="contact-hub-grid">
          {/* Left Column: Interactive Contact Form */}
          <div className="contact-form-card">
            <div className="card-header-bar">
              <span className="card-header-dot" />
              <span className="mono" style={{ fontSize: 10.5, color: '#00df8f', letterSpacing: '0.08em' }}>
                DIRECT ENCRYPTED TRANSMISSION
              </span>
            </div>

            {status === 'sent' ? (
              <div className="contact-success-state">
                <div className="contact-success-icon">
                  <Check size={28} />
                </div>
                <h3>TRANSMISSION LOGGED!</h3>
                <p>
                  Thank you, <b>{name}</b>. Your message regarding <b>{subject}</b> has been received. I will review and reply to <b>{email}</b> promptly.
                </p>
                <div className="contact-success-actions">
                  <button className="button button-ghost" onClick={handleReset}>
                    SEND ANOTHER MESSAGE
                  </button>
                  <button className="button button-primary" onClick={openMailClient}>
                    OPEN IN MAIL CLIENT <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">YOUR NAME *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">YOUR EMAIL *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>INQUIRY PURPOSE / TOPIC</label>
                  <div className="subject-chips">
                    {subjects.map(s => (
                      <button
                        type="button"
                        key={s}
                        className={`subject-chip ${subject === s ? 'active' : ''}`}
                        onClick={() => setSubject(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">YOUR MESSAGE *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, idea, or engineering role..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-footer">
                  <button
                    type="submit"
                    className="button button-primary contact-submit-btn"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>TRANSMITTING... <Sparkles size={14} className="spin" /></>
                    ) : (
                      <>SEND MESSAGE <Send size={14} /></>
                    )}
                  </button>

                  <button
                    type="button"
                    className="direct-mail-link"
                    onClick={openMailClient}
                  >
                    Or open in default mail app <ExternalLink size={11} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Verified Socials */}
          <div className="contact-channels-card">
            <div className="channels-status-badge">
              <span className="channels-live-dot" />
              <span>ACTIVE FOR INTERNSHIPS & COLLABORATIONS</span>
            </div>

            <h3 className="channels-title">VERIFIED CHANNELS</h3>

            {/* Direct Email Card */}
            <div className="contact-item">
              <div className="contact-item-icon">
                <Mail size={18} />
              </div>
              <div className="contact-item-info">
                <small>DIRECT EMAIL</small>
                <a href="mailto:tirthapadapanda@gmail.com" className="contact-link">
                  tirthapadapanda@gmail.com
                </a>
              </div>
              <button
                type="button"
                className="copy-btn"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={13} style={{ color: '#00df8f' }} /> : <Copy size={13} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Official LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/tirthapada-panda"
              target="_blank"
              rel="noreferrer"
              className="social-channel-card linkedin-card"
            >
              <div className="social-icon-box">
                <Linkedin size={20} />
              </div>
              <div className="social-card-body">
                <small>PROFESSIONAL NETWORK</small>
                <strong>linkedin.com/in/tirthapada-panda</strong>
                <span>Connect, endorsements & career updates</span>
              </div>
              <ArrowUpRight size={16} className="social-arrow" />
            </a>

            {/* Official GitHub Card */}
            <a
              href="https://github.com/tirthapada"
              target="_blank"
              rel="noreferrer"
              className="social-channel-card github-card"
            >
              <div className="social-icon-box">
                <Github size={20} />
              </div>
              <div className="social-card-body">
                <small>OPEN SOURCE CODE</small>
                <strong>github.com/tirthapada</strong>
                <span>Explore repositories, commits & tools</span>
              </div>
              <ArrowUpRight size={16} className="social-arrow" />
            </a>

            {/* Base Location & University */}
            <div className="contact-item meta-item">
              <div className="contact-item-icon">
                <MapPin size={18} />
              </div>
              <div className="contact-item-info">
                <small>LOCATION & CAMPUS</small>
                <span className="location-text">Baleshwar / Gunupur, Odisha, India</span>
                <span className="sub-meta">GIET University · Computer Science & Engineering (CGPA 9.02)</span>
              </div>
            </div>

            {/* View Resume Button */}
            <button className="button button-ghost resume-card-btn" onClick={onResume}>
              <ScanLine size={14} /> VIEW VERIFIED RESUME (PDF) <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom">
          <span>© 2026 TIRTHAPADA PANDA. ALL RIGHTS RESERVED.</span>
          <div className="footer-links">
            <a href="https://github.com/tirthapada" target="_blank" rel="noreferrer">
              <Github size={13} style={{ verticalAlign: -1, marginRight: 5 }} /> GITHUB
            </a>
            <a href="https://www.linkedin.com/in/tirthapada-panda" target="_blank" rel="noreferrer">
              <Linkedin size={13} style={{ verticalAlign: -1, marginRight: 5 }} /> LINKEDIN
            </a>
            <a href="mailto:tirthapadapanda@gmail.com">
              <Mail size={13} style={{ verticalAlign: -1, marginRight: 5 }} /> EMAIL
            </a>
          </div>
          <span className="mono" style={{ color: '#00df8f' }}>SYSTEM / ONLINE</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Python');
  const [egg, setEgg] = useState(false);
  const [brandClicks, setBrandClicks] = useState(0);
  const [resumeState, setResumeState] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('tp_theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tp_theme', theme);
  }, [theme]);

  // Native 60 FPS hardware-accelerated playback for fluid ambient background
  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.playbackRate = 1.0;
    }
  }, [loading]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const reducedMotion = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, []);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), reducedMotion ? 200 : 1200); return () => window.clearTimeout(timer); }, [reducedMotion]);
  useEffect(() => { if (brandClicks >= 5) { setEgg(true); setBrandClicks(0); window.setTimeout(() => setEgg(false), 3600); } }, [brandClicks]);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleResume = () => {
    setResumeState(true);
    setResumeModalOpen(true);
    window.setTimeout(() => setResumeState(false), 3200);
  };
  return <div className="portfolio-shell grain">
    <Loader done={!loading} />
    <div className="video-backdrop"><video ref={bgVideoRef} autoPlay muted loop playsInline preload="auto" src="/assets/ambient.mp4" aria-label="Cinematic ambient background video" /><div className="video-tint" /></div>
    <Navigation open={menuOpen} setOpen={setMenuOpen} onBrand={() => setBrandClicks((value) => value + 1)} onResume={handleResume} theme={theme} toggleTheme={toggleTheme} />
    <main><Hero onResume={handleResume} /><About selected={selectedSkill} setSelected={setSelectedSkill} /><Projects /><AiCore /><Workstation selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} /><Expertise /><Achievements /><TerminalSection onResume={handleResume} onToggleTheme={toggleTheme} currentTheme={theme} /><Contact onResume={handleResume} /></main>
    {resumeModalOpen && <ResumeModal onClose={() => setResumeModalOpen(false)} />}
    {resumeState && <div className="egg" data-testid="status-resume"><LockKeyhole size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} /> ACCESS GRANTED // VERIFIED RESUME LOADED</div>}
    {egg && <div className="egg" data-testid="status-easter-egg"><ShieldCheck size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} /> ACCESS LEVEL: DEVELOPER</div>}
  </div>;
}

export default App;