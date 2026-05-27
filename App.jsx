import { useState, useEffect, useRef } from 'react';
import { FaMedium, FaLinkedin, FaInstagram, FaTiktok, FaBars, FaTimes } from 'react-icons/fa';

import fotoProfil from './profile.jpg';
// Memuat Google Fonts (Lexend Deca) & CSS Kustom untuk Animasi Flowing Blue Gradient + Floating Badges Besar
const CustomGlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;600;700;800&display=swap');
    
    body {
      font-family: 'Lexend Deca', sans-serif;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #0a192f;
    }
    ::-webkit-scrollbar-thumb {
      background: #2563eb; 
      border-radius: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #06b6d4; 
    }
    html {
      scroll-behavior: smooth;
    }

    /* Keyframes Animasi */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    @keyframes flowGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes floatBadge1 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-8px) translateX(-3px); }
    }
    @keyframes floatBadge2 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(8px) translateX(3px); }
    }
    
    .animate-spinner {
      animation: spin 0.8s linear infinite;
    }

    /* Shimmer Khusus untuk Gambar Workspace (Bukan Foto Profil) */
    .workspace-shimmer::after {
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.02) 20%,
        rgba(37, 99, 117, 0.15) 60%,
        rgba(255, 255, 255, 0)
      );
      animation: shimmer 2.8s infinite;
      content: '';
      pointer-events: none;
    }

    /* Flowing Blue Gradient Text pada Nama & Angka Statistik */
    .flowing-blue-gradient {
      background-size: 200% auto;
      animation: flowGradient 4s ease infinite;
    }

    /* Floating Badges Diperbesar & Animasi Halus */
    .animate-float-1 {
      animation: floatBadge1 3.8s ease-in-out infinite;
    }
    .animate-float-2 {
      animation: floatBadge2 4.1s ease-in-out infinite;
    }
  `}} />
);

// Data Statis untuk Portofolio Lengkap
const PROFILE = {
  name: "Dzaky A- Najib",
  roles: ["Problem Solver", "UI/UX Architect", "Web Developer"], 
  avatar: fotoProfil,
  location: "Cikarang, Indonesia",
  bio: "Passionate about creating beautiful and functional web experiences. I transform ideas into elegant, user-friendly digital solutions.",
  aboutExtended: "I am a dedicated developer who loves bridging the gap between robust backend logic and pixel-perfect frontend design. With an eye for clean code and intuitive user flows, I build custom applications that solve real-world operational and business puzzles.",
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Done", value: "50+" },
    { label: "Happy Clients", value: "30+" }
  ],
  services: [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Web Development",
      desc: "Building fast, responsive, and secure custom web applications tailored to your specific system demands."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "UI/UX Design",
      desc: "Creating high-fidelity wireframes, user flows, and aesthetic interfaces focusing on maximum usability."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Visual Alignment",
      desc: "Refining visual hierarchy and spacing architectures to maintain solid design consistency across channels."
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "SEO Optimization",
      desc: "Structuring semantic modern layouts to boost visibility, ranking metrics, and general platform speed."
    }
  ],
  skillsCategory: [
    {
      title: "Frontend Development",
      items: [
        { name: "HTML & CSS", level: "90%" },
        { name: "JavaScript", level: "85%" },
        { name: "React.js", level: "80%" },
        { name: "Tailwind CSS", level: "95%" }
      ]
    },
    {
      title: "Backend Development",
      items: [
        { name: "Node.js", level: "75%" },
        { name: "Express.js", level: "70%" },
        { name: "Laravel", level: "80%" },
        { name: "MySQL / MongoDB", level: "85%" }
      ]
    },
    {
      title: "UI/UX Design",
      items: [
        { name: "Figma", level: "85%" },
        { name: "User Architecture", level: "80%" },
        { name: "Wireframing", level: "90%" },
        { name: "Prototyping", level: "75%" }
      ]
    }
  ]
};

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web",
    desc: "A high-performance online store with seamless checkout.",
    tech: ["React", "Tailwind", "Node.js"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 2,
    title: "Fitness Tracker App",
    category: "Mobile",
    desc: "Cross-platform mobile application for tracking daily workouts.",
    tech: ["React Native", "Tailwind"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 3,
    title: "Banking Dashboard",
    category: "UI/UX",
    desc: "Minimalist and intuitive financial dashboard design.",
    tech: ["Figma", "Adobe XD"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 4,
    title: "Travel Booking Web",
    category: "Web",
    desc: "Complete platform for booking hotels and local tours.",
    tech: ["Laravel", "MySQL", "Tailwind"],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
    demoUrl: "#",
    codeUrl: "#"
  }
];

const SOCIAL_LINKS = [
  { name: 'Medium', url: 'https://medium.com/@najiibdzaky', icon: FaMedium },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/najibdzaky', icon: FaLinkedin },
  { name: 'Instagram', url: 'https://instagram.com/jckzyy.n', icon: FaInstagram },
  { name: 'TikTok', url: 'https://tiktok.com/@justcallmejakii_', icon: FaTiktok }
];

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.0 + 0.4,
        alpha: Math.random() * 0.25 + 0.1,
        speedY: -(Math.random() * 0.25 + 0.05),
        speedX: (Math.random() * 0.2 - 0.1)
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`; 
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#0284c7';
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function ScrollReveal({ children }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {children}
    </div>
  );
}

function TypingAnimation({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const typeSpeed = isDeleting ? 70 : 130; 

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 inline-block min-h-[50px] mt-1 relative flowing-blue-gradient">
      {currentText}
    </span>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tambahan state menu
  
  const [formStatus, setFormStatus] = useState('idle'); 
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
    const observerOptions = { root: null, rootMargin: '-35% 0px -55% 0px', threshold: 0 };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (skillsSectionRef.current) observer.observe(skillsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMenuOpen(false); // Tutup menu mobile jika diklik
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const navbarHeight = 75; 
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus('idle'), 4000); 
    }, 1500);
  };

  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    // Penambahan class overflow-x-hidden agar badge tidak membuat horizontal scroll di HP
    <div className="min-h-screen bg-[#0a192f] text-slate-300 font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      <CustomGlobalStyles />
      <ParticleBackground />
      {/* Background Radial Orbs */}
      <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0 hidden md:block"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0 hidden md:block"></div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 ${
        scrolled 
          ? 'bg-[#0a192f]/90 backdrop-blur-lg border-b border-blue-500/10 py-2.5 shadow-lg shadow-[#0a192f]/50' 
          : 'bg-transparent border-b border-transparent py-4'
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">My Portfolio</span>
          
          {/* Hamburger Mobile Menu Toggle */}
          <button className="md:hidden text-cyan-400 text-2xl focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`hover:text-cyan-400 transition-all duration-300 pb-1 relative group ${activeSection === item.id ? 'text-cyan-400' : ''}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a192f] border-b border-blue-900/50 py-4 px-6 flex flex-col space-y-4 shadow-xl z-50">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-slate-400 hover:text-cyan-400 transition-colors font-medium text-lg`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION - Teks di atas/kiri, foto di bawah/kanan */}
      <header id="home" className="max-w-6xl mx-auto px-6 pt-28 pb-20 lg:pt-40 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-center lg:text-left">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
            <span className="w-5 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400"></span>Hi, I'm
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            <span className="text-white">{PROFILE.name}</span> <br />
            <TypingAnimation words={PROFILE.roles} />
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">{PROFILE.bio}</p>
          
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3.5 pt-1">
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-bold text-xs px-5 py-3 rounded-full hover:scale-[1.01] transition shadow-md shadow-blue-900/20">
              View My Work
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-blue-950/40 border border-blue-900/60 text-white font-bold text-xs px-5 py-3 rounded-full hover:bg-blue-900/40 transition">
              Contact Me
            </a>
          </div>

          <div className="flex justify-center lg:justify-start items-center gap-4 pt-3 pl-1">
            <a href="https://github.com/username-anda" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors" title="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.444-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.0.069-.608.23 1.006 1.354 1.532 1.354 1.532.892 1.527 2.341 1.086 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </a>
            <a href="https://lynk.id/dzynn23" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://instagram.com/jckzyy.n" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors" title="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* FOTO PROFIL + FLOATING BADGES: Skala diperkecil di HP agar tidak meluber */}
        <div className="lg:col-span-5 relative flex justify-center items-center select-none w-full">
          <div className="absolute inset-0 border border-blue-900/30 rounded-3xl translate-x-3 -translate-y-3 pointer-events-none hidden md:block"></div>
          
          <div className="relative w-full max-w-[250px] md:max-w-[320px] aspect-square rounded-[32px] p-1 bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 border border-blue-500/20 shadow-xl overflow-visible mx-auto">
            
            {/* FLOATING BADGE 1: Scale-75 untuk mobile */}
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-14 z-20 bg-blue-600 border border-blue-400/40 px-3 py-2 md:px-5 md:py-3.5 rounded-2xl shadow-2xl shadow-blue-950/50 flex items-center gap-2 md:gap-3.5 animate-float-1 scale-[0.8] md:scale-100 origin-top-left">
              <div className="p-1 md:p-2 bg-blue-500/40 rounded-xl text-white shadow-inner">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs md:text-[15px] font-black text-white tracking-wide leading-none">3+ Years</p>
                <p className="text-[8px] md:text-[10px] font-semibold text-blue-100 mt-1 leading-none uppercase tracking-wider">Experience</p>
              </div>
            </div>

            {/* FLOATING BADGE 2: Scale-75 untuk mobile */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 z-20 bg-blue-600 border border-blue-400/40 px-3 py-2 md:px-5 md:py-3.5 rounded-2xl shadow-2xl shadow-blue-950/50 flex items-center gap-2 md:gap-3.5 animate-float-2 scale-[0.8] md:scale-100 origin-bottom-right">
              <div className="p-1 md:p-2 bg-blue-500/40 rounded-xl text-white shadow-inner">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs md:text-[15px] font-black text-white tracking-wide leading-none">50+ Done</p>
                <p className="text-[8px] md:text-[10px] font-semibold text-blue-100 mt-1 leading-none uppercase tracking-wider">Global Projects</p>
              </div>
            </div>

            <img src={PROFILE.avatar} alt={PROFILE.name} className="w-full h-full object-cover rounded-[28px] relative z-10" />
          </div>
        </div>
      </header>

      {/* ABOUT ME */}
      <section id="about" className="bg-[#0b1b36] border-t border-blue-900/40 py-20 px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative w-full max-w-[300px] mx-auto aspect-[4/5] rounded-2xl overflow-hidden border border-blue-900 bg-blue-950/20 p-1.5 shadow-xl workspace-shimmer">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop" alt="Workspace" className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Me</span></h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">{PROFILE.aboutExtended}</p>
              <div className="grid grid-cols-3 gap-3.5 pt-2">
                {PROFILE.stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#0a192f] border border-blue-900/50 p-3.5 rounded-xl text-center shadow-sm">
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 flowing-blue-gradient">{stat.value}</p>
                    <p className="text-[10px] font-semibold text-slate-500 mt-0.5 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* MY SKILLS */}
      <section id="skills" ref={skillsSectionRef} className="py-20 px-6 border-t border-blue-900/40 relative z-10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-md mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Skills</span></h2>
              <p className="text-slate-400 text-xs mt-2">Technical proficiency levels of development workflows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PROFILE.skillsCategory.map((cat, idx) => (
                <div key={idx} className="bg-[#0b1b36] border border-blue-900/50 p-5 rounded-xl shadow-md hover:border-blue-700/50 transition-colors">
                  <h3 className="text-base font-bold text-white mb-4 border-b border-blue-900/50 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>{cat.title}
                  </h3>
                  <div className="space-y-3.5">
                    {cat.items.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span>{skill.name}</span>
                          <span className="text-cyan-400">{skill.level}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#0a192f] rounded-full overflow-hidden border border-blue-900/30">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: skillsVisible ? skill.level : '0%' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="bg-[#0b1b36] border-y border-blue-900/40 py-20 px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-center sm:text-left">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Projects</span></h2>
                <p className="text-slate-400 text-xs mt-2">A selection of things I've built recently.</p>
              </div>
              <div className="flex justify-center bg-[#0a192f] p-0.5 rounded-lg border border-blue-900/60 self-center sm:self-start shadow-sm flex-wrap">
                {['All', 'Web', 'Mobile', 'UI/UX'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition uppercase ${filter === cat ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group bg-[#0a192f] border border-blue-900/50 rounded-xl overflow-hidden hover:border-cyan-500/40 hover:shadow-xl hover:shadow-[#0a192f]/50 transition-all duration-300 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="h-40 overflow-hidden relative bg-[#0a192f]">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition duration-500" />
                      <span className="absolute top-2.5 right-2.5 bg-[#0a192f]/90 text-cyan-400 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-900 uppercase tracking-wider z-10">{project.category}</span>
                      
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <a href={project.demoUrl} className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 text-white rounded-full transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-md" title="Live Demo">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <a href={project.codeUrl} className="p-2 bg-[#0a192f]/90 hover:bg-[#0b1b36] border border-blue-800 text-white rounded-full transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-md delay-75" title="View Code">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">{project.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{project.desc}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex flex-wrap gap-1">
                    {project.tech.map((t, i) => (
                      <span key={i} className="bg-[#0b1b36] border border-blue-900/50 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 relative z-10 border-t border-blue-900/40">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-md mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Services</span></h2>
              <p className="text-slate-400 text-xs mt-2">What I can do to help accelerate your digital solutions.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROFILE.services.map((srv, idx) => (
                <div key={idx} className="bg-[#0b1b36] border border-blue-900/50 p-5 rounded-xl shadow-md flex flex-col items-center sm:items-start text-center sm:text-left gap-3 hover:border-blue-500/40 transition-all">
                  <div className="p-2.5 bg-[#0a192f] rounded-lg border border-blue-500/20 text-cyan-400 shadow-sm">{srv.icon}</div>
                  <h3 className="text-sm md:text-base font-bold text-white mt-1">{srv.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CONTACT ME */}
      <section id="contact" className="bg-[#0b1b36] border-t border-blue-900/40 py-20 px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-md mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Me</span></h2>
              <p className="text-slate-400 text-xs mt-2">Let's work together. Drop me a line below.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                <h3 className="text-base md:text-lg font-bold text-white">Let's Work Together</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">Have an innovative project in mind or just want to discuss architectures? Reach out directly via the form.</p>
                <div className="space-y-3 pt-1 flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0a192f] rounded-lg flex items-center justify-center border border-blue-500/20 text-cyan-400 text-xs font-bold shadow-sm">E</div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-bold text-slate-500">Email</p>
                      <p className="text-xs text-slate-300">najibdzaky@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0a192f] rounded-lg flex items-center justify-center border border-blue-500/20 text-cyan-400 text-xs font-bold shadow-sm">P</div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-bold text-slate-500">Phone</p>
                      <p className="text-xs text-slate-300">+62 853 5368 7349</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0a192f] rounded-lg flex items-center justify-center border border-blue-500/20 text-cyan-400 text-xs font-bold shadow-sm">L</div>
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-bold text-slate-500">Location</p>
                      <p className="text-xs text-slate-300">{PROFILE.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 bg-[#0a192f] border border-blue-900/60 p-5 md:p-6 rounded-xl shadow-md relative">
                <form className="space-y-3.5" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-medium text-slate-400">Your Name</label>
                      <input required type="text" className="w-full bg-[#0b1b36] border border-blue-900/60 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-medium text-slate-400">Your Email</label>
                      <input required type="email" className="w-full bg-[#0b1b36] border border-blue-900/60 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-slate-400">Subject</label>
                    <input required type="text" className="w-full bg-[#0b1b36] border border-blue-900/60 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500" placeholder="Project Offer" />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-slate-400">Message</label>
                    <textarea required rows="4" className="w-full bg-[#0b1b36] border border-blue-900/60 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none" placeholder="Write your message here..."></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-bold text-xs py-3 rounded-lg hover:scale-[1.01] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <svg className="w-4 h-4 animate-spinner text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      "Message Sent Successfully!"
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:scale-110 transition transform"
          title="Back to Top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
          
      {/* FOOTER */}
      <footer className="bg-[#0a192f] border-t border-blue-900/40 pt-16 pb-8 px-6 relative z-10 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Dzaky<span className="text-cyan-400">.</span></h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              A passionate developer creating beautiful digital experiences. Let's build something amazing together.
            </p>
            <div className="flex gap-2 justify-center md:justify-start">
              {SOCIAL_LINKS.map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a 
                    key={i} 
                    href={soc.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-blue-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-slate-400 hover:text-cyan-400 text-xs">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Services</h3>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Mobile Apps</li>
              <li>SEO</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>najibdzaky@gmail.com</li>
              <li>+62 853 5368 7349</li>
              <li>Cikarang, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-blue-900/40 text-center">
          <p className="text-slate-500 text-[10px] uppercase">© 2026 Dzaky. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
