export type ServicePageType = {
  heroImage: string;
  id:number;
  prevCloudinaryImgId:string,
  services: {
    id: number;
    title: string;
    quote: string;
    description: string;
    imageUrl: string;
    prevCloudinaryImgId:string,
    slug: string;
  }[];
};

export type ServicePage = {
  id: number;
  heroImage: string;
  title?: string;
  subtitle?: string;
  createdAt: Date;
  updatedAt: Date;
  services: ServicePageType[]; // relation to multiple services
};
