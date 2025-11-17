// ===============================
// Request DTOs (frontend → backend)
// ===============================

// Hero update
export interface AboutPageHeroUpdateRequestDTO {
  aboutHeroImage: string;
  prevCloudinaryImgId?: string;
}

// CEO update
export interface AboutPageCeoUpdateRequestDTO {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  prevCloudinaryImgId?: string;
  quote?: string;
}

// Staff create/update
export interface StaffRequestDTO {
  name: string;
  role: string;
  experience: string;
  bio?: string;
  imageUrl?: string;
  prevCloudinaryImgId?: string;
  overlayText?: string;
}



// ===============================
// Response DTOs (backend → frontend)
// ===============================

// CEO response
export interface AboutPageCeoResponseDTO {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  prevCloudinaryImgId: string;
  quote?: string;
}

// Staff response
export interface StaffResponseDTO {
  id: number;
  name: string;
  role: string;
  experience: string;
  bio?: string;
  imageUrl: string;
  prevCloudinaryImgId: string;
  overlayText?: string;
}

// Full About Page response
export interface AboutPageResponseDTO {
  id: number;
  slug: string;
  aboutHeroImage: string;
  prevCloudinaryImgId: string;
  meetOurCeo: AboutPageCeoResponseDTO;
  meetOurTeam: StaffResponseDTO[];
  updatedAt: string | Date;
}

// ===============================
// Mapper (Prisma → DTO)
// ===============================

export function mapAboutPageToDTO(raw: any): AboutPageResponseDTO {
  if (!raw) throw new Error("About Page data is missing");

  return {
    id: raw.id,
    slug: raw.slug,
    aboutHeroImage: raw.heroImage || "",
    prevCloudinaryImgId: raw.prevCloudinaryImgId || "",

meetOurCeo: {
  name: raw.ceo?.[0]?.name || "",
  title: raw.ceo?.[0]?.title || "",
  bio: raw.ceo?.[0]?.bio || "",
  imageUrl: raw.ceo?.[0]?.imageUrl || "",
  prevCloudinaryImgId: raw.ceo?.[0]?.prevCloudinaryImgId || "",
  quote: raw.ceo?.[0]?.quote || "",
},


    meetOurTeam:
      raw.staff?.map((s: any) => ({
        id: s.id,
        name: s.name,
        role: s.role,
        experience: s.experience,
        bio: s.bio || "",
        imageUrl: s.imageUrl || "",
        prevCloudinaryImgId: s.prevCloudinaryImgId || "",
        overlayText: s.overlayText || "",
      })) || [],

    updatedAt: raw.updatedAt,
  };
}
