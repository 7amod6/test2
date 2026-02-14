import { 
  GraduationCap, 
  Heart, 
  Github, 
  Twitter, 
  Mail,
  ExternalLink,
  Code2,
  Database
} from 'lucide-react';

const footerLinks = [
  {
    title: 'Resources',
    links: [
      { label: 'All Playlists', href: '#playlists' },
      { label: 'Subjects', href: '#curriculum' },
      { label: 'Feedback', href: '#feedback' },
    ],
  },
  {
    title: 'Subjects',
    links: [
      { label: 'Algorithmique 2', href: '#curriculum' },
      { label: 'Structure de Données', href: '#curriculum' },
      { label: 'Architecture', href: '#curriculum' },
      { label: 'Analyse 2', href: '#curriculum' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'Twitter', href: 'https://twitter.com', external: true },
      { label: 'Contact', href: 'mailto:contact@infos2hub.com' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Top Gradient Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #00F0FF, #7000FF, transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-background" />
              </div>
              <div>
                <h3 
                  className="font-bold text-xl"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  InfoS2 Hub
                </h3>
                <p className="text-xs text-muted-foreground">Algerian University Resources</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              A curated collection of educational YouTube playlists for Algerian 
              Informatique Semester 2 students. Learn, grow, and succeed together.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@infos2hub.com"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} InfoS2 Hub. Made with{' '}
            <Heart className="w-4 h-4 inline text-red-500" fill="currentColor" />{' '}
            for Algerian students.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              React + TypeScript
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Open Source
            </span>
          </div>
        </div>

        {/* End Message */}
        <div className="mt-12 text-center">
          <p 
            className="text-xs text-muted-foreground/50 uppercase tracking-[0.3em]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            End of Session // Good Luck with Your Studies
          </p>
        </div>
      </div>
    </footer>
  );
}
