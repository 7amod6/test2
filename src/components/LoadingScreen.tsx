import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 1.8,
        ease: 'power2.inOut',
      });

      // Counter animation
      const counter = { value: 0 };
      gsap.to(counter, {
        value: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (textRef.current) {
            textRef.current.textContent = `${Math.round(counter.value)}%`;
          }
        },
      });

      // Exit animation
      gsap.to(containerRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        delay: 1.8,
        ease: 'power2.in',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      style={{ background: '#05050A' }}
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Circle */}
        <div className="relative">
          <div
            ref={circleRef}
            className="loading-circle"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: '3px solid transparent',
              borderTopColor: '#00F0FF',
              borderRightColor: '#7000FF',
              animation: 'spin 1s linear infinite',
            }}
          />
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Progress Text */}
        <div
          ref={textRef}
          className="text-4xl font-bold gradient-text"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          0%
        </div>

        {/* Progress Bar */}
        <div
          className="w-48 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              width: '0%',
              background: 'linear-gradient(90deg, #00F0FF, #7000FF)',
            }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-muted-foreground text-sm tracking-widest uppercase">
          Initializing System
        </p>
      </div>
    </div>
  );
}
