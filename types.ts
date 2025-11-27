export interface ServicePackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
}

export interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number; // needed for masonry logic simulation
  height: number;
}

export interface WallArtOption {
  id: string;
  size: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  preferredDate: string;
  message: string;
}

export interface SEOAdvice {
  keywords: string[];
  metaDescription: string;
  blogIdeas: string[];
  localSEOStrategy: string;
}