export type AboutPageType = {
  heroTitle: string;
  heroParagraph: string;
  heroImage?: string;

  mission: string;
  vision: string;
  ourStoryIntro: string;
  ourStoryCont: string;
  ourStoryEnding: string;
  
  staff: {
    id: number;
    name: string;
    role: string;
    experience: string;
    tooltip: string | null;
    bio: string | null;
    image: string | null;
    overlayText: string | null;
  }[];
};
