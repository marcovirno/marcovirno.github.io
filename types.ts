export interface Artwork {
  id: string;
  title: string;
  date: string;
  category: string;
  dimensions: string;
  technique: string;
  description: string;
  imageUrl: string;
  operaNumber?: string;
}


export interface Exhibition {
  id: string;
  year: string;
  title: string;
  location: string;
  city: string;
}

export interface Publication {
  id: string;
  title: string;
  date: string;
}

export interface BioEvent {
  id: string;
  date: string;
  title: string;
  location?: string;
}

export enum AppSection {
  HOME = 'home',
  GALLERY = 'gallery',
  ABOUT = 'about',
  CONTACT = 'contact'
}

export type ViewMode = 'home' | 'gallery';

export interface EditedImageResult {
  imageUrl: string;
  prompt: string;
}