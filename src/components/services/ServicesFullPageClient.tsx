import ServicesHero from "./ServicesHero";
import ServicesGrid from "./ServicesGrid";
import ServicesCTA from "./ServicesCTA";
import ScrollReveal from "../ScrollReveal";
import { ServicePageType } from "@/types/services";

//----------------------type declaration-------------------------
type ServicesFullPageClientProps = {
  servicesData: ServicePageType;
};

export default function ServicesFullPageClient({
  servicesData,
}: ServicesFullPageClientProps) {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* -------- HERO -------- */}
      <ScrollReveal>
        <ServicesHero
          heroImage={servicesData.heroImage}
        />
      </ScrollReveal>

      {/* -------- SERVICES GRID -------- */}
      <ScrollReveal>
        <ServicesGrid servicesData={servicesData} />
      </ScrollReveal>

      {/* -------- CTA -------- */}
      <ScrollReveal>
        <ServicesCTA />
      </ScrollReveal>
    </main>
  );
}
