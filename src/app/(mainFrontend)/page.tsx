import CoverageSection from "@/components/CoverageSection";
import HeroSlider from "@/components/HeroSlider";
import MainBody from "@/components/MainBody";
import QuickEnquiry from "@/components/QuickEnquiry";
import ScrollReveal from "@/components/ScrollReveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroContent = await prisma.pageContent.findUnique({
    where: { slug: "testing-petruswise" },
  });
  return (
    <main>
      {/* <Practise content ={heroContent?.content || "gk"}/> */}
      <HeroSlider />
      <ScrollReveal>
        <MainBody />
        <CoverageSection /> 
        <QuickEnquiry />
      </ScrollReveal>
    </main>
  );
}
