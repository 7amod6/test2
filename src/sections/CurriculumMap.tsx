import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Cpu, 
  FunctionSquare, 
  Grid3X3, 
  Zap 
} from 'lucide-react';
import { subjects } from '@/data/subjects';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Database,
  Cpu,
  FunctionSquare,
  Grid3X3,
  Zap,
};

interface CurriculumMapProps {
  selectedSubject: string | null;
  onSelectSubject: (subjectId: string | null) => void;
}

export function CurriculumMap({ selectedSubject, onSelectSubject }: CurriculumMapProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.subject-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Connector lines animation
      const lines = sectionRef.current?.querySelectorAll('.connector-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { strokeDashoffset: 200 },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="curriculum"
      className="relative min-h-screen py-24 flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(112, 0, 255, 0.3), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="gradient-text">Select Your Module</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a subject to filter playlists. Each module contains curated Arabic video resources 
            for Algerian Semester 2 curriculum.
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {subjects.map((subject, index) => {
            const Icon = iconMap[subject.icon];
            const isSelected = selectedSubject === subject.id;
            const isOtherSelected = selectedSubject !== null && !isSelected;

            return (
              <div
                key={subject.id}
                className={`subject-card relative group cursor-pointer ${
                  isOtherSelected ? 'opacity-50' : 'opacity-100'
                }`}
                onClick={() => onSelectSubject(isSelected ? null : subject.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`relative p-6 rounded-2xl glass transition-all duration-500 ${
                    isSelected ? 'scale-105' : 'hover:scale-[1.02]'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 0 30px ${subject.color}40, 0 0 60px ${subject.color}20`
                      : 'none',
                    borderColor: isSelected ? subject.color : undefined,
                  }}
                >
                  {/* Gradient Border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${subject.color}30, transparent)`,
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${subject.color}20, ${subject.color}10)`,
                      boxShadow: `0 0 20px ${subject.color}30`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: subject.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{subject.nameAr}</p>
                  <p className="text-sm text-muted-foreground/70 line-clamp-2 mb-4">
                    {subject.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {subject.playlistCount} playlists
                    </span>
                    
                    {/* Selection Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-primary border-primary'
                          : 'border-muted-foreground group-hover:border-primary'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-background" />
                      )}
                    </div>
                  </div>

                  {/* Active Glow */}
                  {isSelected && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-30"
                      style={{
                        background: `radial-gradient(circle at center, ${subject.color}40, transparent 70%)`,
                      }}
                    />
                  )}
                </div>

                {/* Connector Lines (visible on larger screens) */}
                {index < subjects.length - 1 && (
                  <svg
                    className="hidden lg:block absolute -right-6 top-1/2 w-12 h-1"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    <line
                      className="connector-line"
                      x1="0"
                      y1="0"
                      x2="48"
                      y2="0"
                      stroke={subject.color}
                      strokeWidth="1"
                      strokeDasharray="200"
                      strokeDashoffset="200"
                      opacity="0.3"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Filter */}
        {selectedSubject && (
          <div className="text-center mt-8">
            <button
              onClick={() => onSelectSubject(null)}
              className="px-6 py-2 rounded-full text-sm bg-white/5 hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
