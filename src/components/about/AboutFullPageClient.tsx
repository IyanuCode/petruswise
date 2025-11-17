"use client";

import ScrollReveal from "../ScrollReveal";
//----------------------Components-------------------------
import AboutHero from "./AboutHero";
import CeoProfile from "./CeoProfile";
import OurStory from "./OurStoryAndMission";
import StaffSection from "./StaffSection";
import { AboutPageType } from "@/types/about";

//----------------------type-------------------------
type AboutPageTypeScript = { about: AboutPageType };

//----------------------Main Component-------------------------

export default function AboutFullPageClient({about}: AboutPageTypeScript) {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-400">
      <AboutHero
        heroTitle={about.heroTitle}
        heroParagraph={about.heroParagraph}
        heroImage={about.heroImage}
      />
      {/* our story component also consist of mission, vision and core value */}
      <ScrollReveal>
       <OurStory
        mission={about.mission}
        vision={about.vision}
        ourStoryIntro={about.ourStoryIntro}
        ourStoryCont={about.ourStoryCont}
        ourStoryEnding={about.ourStoryEnding}
      />
       </ScrollReveal>
    <ScrollReveal>
        <CeoProfile 
      ceo={about.ceo} 
      />
    </ScrollReveal>

    <ScrollReveal>
            <StaffSection staffData={about.staff} />

      </ScrollReveal>
    </main>
  );
}
