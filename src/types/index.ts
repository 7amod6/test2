// Types for Algerian Informatique S2 Hub

export interface Playlist {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  videoCount: number;
  instructor: string;
  subjectId: string;
  language: 'arabic' | 'french' | 'english';
  rating: number;
  views: number;
  dateAdded: string;
  tags: string[];
}

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  icon: string;
  color: string;
  playlistCount: number;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  date: string;
  playlistId?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'moderator';
}

export interface FilterState {
  subject: string | null;
  search: string;
  sortBy: 'newest' | 'popular' | 'rating';
}

export type ViewMode = 'grid' | 'list';
