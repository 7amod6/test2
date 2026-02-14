import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ParticleBackground } from '@/components/ParticleBackground';
import { CustomCursor } from '@/components/CustomCursor';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { CurriculumMap } from '@/sections/CurriculumMap';
import { PlaylistGrid } from '@/sections/PlaylistGrid';
import { FeedbackSection } from '@/sections/FeedbackSection';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initial animations after loading
  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        // Hero entrance animation
        gsap.fromTo(
          '.hero-title span',
          { opacity: 0, y: 100, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.3,
          }
        );

        gsap.fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
        );

        gsap.fromTo(
          '.hero-cta',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
        );

        gsap.fromTo(
          '.nav-sidebar',
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 }
        );
      }, mainRef);

      return () => ctx.revert();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <CustomCursor />
      <ParticleBackground />
      
      <div ref={mainRef} className="relative min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        
        <main className="relative z-10">
          <Hero />
          <CurriculumMap 
            selectedSubject={selectedSubject} 
            onSelectSubject={setSelectedSubject} 
          />
          <PlaylistGrid selectedSubject={selectedSubject} />
          <FeedbackSection />
          <Footer />
        </main>
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0F0F1A',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              color: '#E0E0E0',
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
