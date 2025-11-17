// app/about/page.tsx (SERVER COMPONENT)
import AboutFullPageClient from "@/components/about/AboutFullPageClient";
import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
  const aboutPageData = await prisma.aboutPage.findUnique({
    where: { slug: "about-page" },
    include: {
      staff: true,
      ceo: true,
    },
  });
  if (!aboutPageData) {
    return <p>About page not found.</p>;
  }
  return (
    // Pass all DB data as props to client component
    <AboutFullPageClient about={aboutPageData} />
  );
}
