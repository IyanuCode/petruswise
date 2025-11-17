// Admin interface for About Page 
export interface AboutPageAdmin {
  id: number;
  slug: string;

  // Hero Section
  aboutHeroImage: string;

  // CEO Section
  meetOurCeo: {
    name: string;
    title: string; 
    bio: string;
    image: string;
    quote?: string;
  };

  // Staff / Team Section
  meetOurTeam: Array<{
    id?: number; // 
    name: string;
    role: string;
    experience: string;
    bio?: string;
    image?: string;
    overlayText?: string;
  }>;

  updatedAt?: string | Date;
}
