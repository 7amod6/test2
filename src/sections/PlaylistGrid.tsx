import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, 
  Filter, 
  Play, 
  Star, 
  Eye, 
  ExternalLink,
  Share2,
  X,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { playlists } from '@/data/playlists';
import { subjects } from '@/data/subjects';
import type { Playlist } from '@/types';

gsap.registerPlugin(ScrollTrigger);

type SortOption = 'newest' | 'popular' | 'rating';

interface PlaylistGridProps {
  selectedSubject: string | null;
}

export function PlaylistGrid({ selectedSubject }: PlaylistGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Filter and sort playlists
  const filteredPlaylists = useMemo(() => {
    let result = [...playlists];

    // Filter by subject
    if (selectedSubject) {
      result = result.filter((p) => p.subjectId === selectedSubject);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.instructor.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedSubject, searchQuery, sortBy]);

  // Get subject info
  const selectedSubjectInfo = useMemo(() => {
    return subjects.find((s) => s.id === selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid entrance animation
      const cards = gridRef.current?.querySelectorAll('.playlist-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredPlaylists]);

  const handleShare = (playlist: Playlist) => {
    const url = encodeURIComponent(playlist.youtubeUrl);
    const text = encodeURIComponent(`Check out this playlist: ${playlist.title}`);
    
    // Show share options
    const shareOptions = [
      {
        name: 'Twitter',
        action: () => window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank'),
      },
      {
        name: 'Facebook',
        action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank'),
      },
      {
        name: 'WhatsApp',
        action: () => window.open(`https://wa.me/?text=${text}%20${url}`, '_blank'),
      },
      {
        name: 'Copy Link',
        action: async () => {
          await navigator.clipboard.writeText(playlist.youtubeUrl);
          toast.success('Link copied to clipboard!');
        },
      },
    ];

    // Show toast with share options
    toast(
      <div className="space-y-2">
        <p className="font-medium">Share Playlist</p>
        <div className="flex flex-wrap gap-2">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              size="sm"
              variant="outline"
              onClick={option.action}
              className="text-xs"
            >
              {option.name}
            </Button>
          ))}
        </div>
      </div>,
      { duration: 10000 }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="playlists"
      className="relative min-h-screen py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <span className="gradient-text">Available Playlists</span>
          </h2>
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedSubjectInfo ? (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="px-3 py-1.5 text-sm"
                    style={{ borderColor: selectedSubjectInfo.color, color: selectedSubjectInfo.color }}
                  >
                    {selectedSubjectInfo.name}
                  </Badge>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('clearSubjectFilter'))}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Badge variant="outline" className="px-3 py-1.5 text-sm">
                  All Subjects
                </Badge>
              )}
              <span className="text-muted-foreground text-sm">
                {filteredPlaylists.length} playlists found
              </span>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-primary search-glow"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-10 text-sm focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Playlists Grid */}
        {filteredPlaylists.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onShare={() => handleShare(playlist)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No playlists found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface PlaylistCardProps {
  playlist: Playlist;
  onShare: () => void;
}

function PlaylistCard({ playlist, onShare }: PlaylistCardProps) {
  const subject = subjects.find((s) => s.id === playlist.subjectId);

  return (
    <div className="playlist-card group">
      <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={playlist.thumbnailUrl}
            alt={playlist.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/640x360/0F0F1A/00F0FF?text=${encodeURIComponent(playlist.title)}`;
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Play Button */}
          <a
            href={playlist.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-7 h-7 text-background ml-1" fill="currentColor" />
            </div>
          </a>

          {/* Video Count Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs">
            <Play className="w-3 h-3" />
            <span>{playlist.videoCount} videos</span>
          </div>

          {/* Language Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="outline"
              className={`text-xs capitalize ${
                playlist.language === 'arabic'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : playlist.language === 'french'
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}
            >
              {playlist.language}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Subject Tag */}
          {subject && (
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <span className="text-xs text-muted-foreground">{subject.name}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {playlist.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {playlist.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{playlist.instructor}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{playlist.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
              <span>{playlist.rating}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {playlist.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={playlist.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full btn-primary">
                <ExternalLink className="w-4 h-4 mr-2" />
                Watch on YouTube
              </Button>
            </a>
            <Button
              variant="outline"
              size="icon"
              onClick={onShare}
              className="border-white/10 hover:border-primary/50 hover:bg-primary/5"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
