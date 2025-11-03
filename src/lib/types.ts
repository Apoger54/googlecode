export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    district: string;
    neighborhood: string;
  };
  type: 'sale' | 'rent';
  propertyType: 'villa' | 'apartment' | 'house' | 'land';
  roomCount: string; // e.g., '2+1', '5+2'
  size: number; // in square meters
  features: string[];
  imageUrls: string[];
  isFeatured: boolean;
  agent: {
    name: string;
    avatarUrl: string;
  };
  postedDate: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  featuredImageUrl: string;
  category: string;
}
