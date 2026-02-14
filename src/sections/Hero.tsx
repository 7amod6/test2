import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play, BookOpen, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sphere rotation animation
      gsap.to(sphereRef.current, {
        rotateY: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      // Scroll-triggered exit animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(sectionRef.current, {
            opacity: 1 - progress,
            scale: 1 + progress * 0.2,
            filter: `blur(${progress * 10}px)`,
            duration: 0.1,
          });
        },
      });

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCurriculum = () => {
    const element = document.getElementById('curriculum');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Radial Gradient */}
      <div className="absolute inset-0 radial-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* 3D Sphere */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 float">
          <div
            ref={sphereRef}
            className="w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Wireframe Sphere */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(0, 240, 255, 0.3), transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(112, 0, 255, 0.3), transparent 50%)
                `,
                boxShadow: `
                  inset 0 0 60px rgba(0, 240, 255, 0.2),
                  0 0 60px rgba(0, 240, 255, 0.3),
                  0 0 100px rgba(112, 0, 255, 0.2)
                `,
              }}
            />
            
            {/* Orbital Rings */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-primary/20"
                style={{
                  transform: `rotateX(${60 + i * 30}deg) rotateY(${i * 45}deg)`,
                  animation: `spin ${10 + i * 5}s linear infinite`,
                }}
              />
            ))}

            {/* Center Glow */}
            <div className="absolute inset-1/3 rounded-full bg-primary/20 blur-xl pulse-glow" />
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          {'MASTER THE CODE'.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block ${char === ' ' ? 'w-4' : 'gradient-text'}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-2">
          Your Semester 2 Mission Control
        </p>
        <p className="text-lg text-muted-foreground/70 mb-8">
          Curated YouTube Resources for Algerian Informatique Students
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={scrollToCurriculum}
            className="btn-primary flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Explore Curriculum</span>
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById('playlists');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Browse Playlists</span>
          </button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <div className="stat-number text-3xl md:text-4xl font-bold text-primary" data-target="18">
              0
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mt-1">
              <BookOpen className="w-4 h-4" />
              <span>Playlists</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="stat-number text-3xl md:text-4xl font-bold text-secondary" data-target="6">
              0
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mt-1">
              <Play className="w-4 h-4" />
              <span>Subjects</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="stat-number text-3xl md:text-4xl font-bold text-accent" data-target="300">
              0
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1 justify-center mt-1">
              <Users className="w-4 h-4" />
              <span>+ Videos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
