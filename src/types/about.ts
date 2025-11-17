export type AboutPageType = {
  heroTitle: string;
  heroParagraph: string;
  heroImage?: string;

  mission: string;
  vision: string;
  ourStoryIntro: string;
  ourStoryCont: string;
  ourStoryEnding: string;

  ceo: {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  quote?: string | null;
}[];

 

  staff: {
    id: number;
    name: string;
    role: string;
    experience: string;
    tooltip: string | null;
    bio: string | null;
    imageUrl: string | null;          
    overlayText: string | null; 
  }[];
};
