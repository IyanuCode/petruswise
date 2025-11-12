export type ContactPageType = {
  heroTitle: string;
  heroParagraph: string;
  heroImage:string;
   talkTitle: string;
  talkDescription: string;
  keyContacts: {
    id: number;
    name: string;
    role: string;
    contactInfo: string;
    imageUrl:string;
   
  }[];
  testimonials: {
    id: number;
    name: string;
    quote: string;
    role: string;
  }[];
  partners: {
    id: number;
    name?: string;
    logoUrl: string;
  }[];
};
