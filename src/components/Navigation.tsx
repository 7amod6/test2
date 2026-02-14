import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Grid, 
  MessageSquare, 
  Share2, 
  Menu,
  X,
  GraduationCap,
  Search
} from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: GraduationCap },
  { id: 'curriculum', label: 'Subjects', icon: Grid },
  { id: 'playlists', label: 'Playlists', icon: BookOpen },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className={`nav-sidebar fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 p-3 rounded-2xl transition-all duration-500 ${
          isScrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative group p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-card border border-border rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-primary/10 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          isScrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              InfoS2
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white/5 text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="glass-strong border-t border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Desktop Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 hidden lg:flex items-center justify-between px-8 py-4 transition-all duration-500 ${
          isScrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-background" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              InfoS2 Hub
            </h1>
            <p className="text-xs text-muted-foreground">Algerian University Resources</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection('playlists')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Playlists</span>
          </button>
          
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href);
              const text = encodeURIComponent('Check out this amazing resource for Algerian Informatique S2 students!');
              window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            title="Share on Twitter"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>
    </>
  );
}
