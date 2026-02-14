import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, 
  Star, 
  Send, 
  User, 
  Quote,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: 'Ahmed K.',
    role: 'Student, University of Algiers',
    content: 'This platform saved my semester! The curated Arabic playlists for Algorithmique 2 are exactly what I needed.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Fatima B.',
    role: 'Student, USTHB',
    content: 'Finally, a resource that understands Algerian curriculum. The structure de données section is amazing!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mohamed R.',
    role: 'Student, University of Oran',
    content: 'I love how everything is organized by subject. Makes studying so much easier.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Amina S.',
    role: 'Student, University of Constantine',
    content: 'The video quality and explanations in these playlists are top-notch. Highly recommended!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Youssef M.',
    role: 'Student, University of Annaba',
    content: 'Best resource for S2 students. The search feature helps me find exactly what I need.',
    rating: 5,
  },
];

export function FeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Marquee entrance
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Thank you for your feedback!');
    setFormData({ name: '', email: '', message: '', rating: 0 });
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="feedback"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Gradient Orbs */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 157, 0.2), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="gradient-text">Community Feedback</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your experience and help us improve. Your feedback matters!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Feedback Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Send Feedback</h3>
                <p className="text-sm text-muted-foreground">We'd love to hear from you</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 bg-white/5 border-white/10 focus:border-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 focus:border-primary"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <Textarea
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[120px] bg-white/5 border-white/10 focus:border-primary resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Testimonials Marquee */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-primary" />
              What Students Say
            </h3>

            <div ref={marqueeRef} className="relative overflow-hidden">
              {/* Gradient Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

              {/* Scrolling Container */}
              <div className="space-y-4 animate-marquee-vertical">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="glass rounded-xl p-5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-sm text-background">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm">{testimonial.rating}</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/30" />
                      <p className="text-sm text-muted-foreground pl-4">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 30s linear infinite;
        }
        .animate-marquee-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
