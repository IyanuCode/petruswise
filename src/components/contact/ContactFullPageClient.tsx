'use client'
//---------------------Dependencies-------------------------
import { motion, Variants } from "framer-motion"; // animations
import { useState } from "react"; // client state for Quick Inquiry

//----------------------Components-------------------------
import { ContactPageType } from "@/types/contact";
import ContactHero from "./ContactHero";
import ContactInfoCards from "./ContactInfoCards";
import KeyContacts from "./KeyContacts";
import ContactForm from "./ContactForm";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import QuickInquiry from "./QuickInquiry";
import RegionalCoverage from "./RegionalCoverage";
import LetsTalkSolution from "./LetsTalkSolution";
import AmidstManyTestimony from "./amidstManyTestimony";
import ScrollReveal from "../ScrollReveal";

//----------------------Animation Variant-------------------------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

//----------------------type-------------------------
type ContactFullPageClientProps = {
  contact: ContactPageType; 
};

//----------------------Main Component-------------------------
export default function ContactFullPageClient({ contact }: ContactFullPageClientProps) {
  const [quickSent, setQuickSent] = useState(false); // Quick Inquiry form state

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <ScrollReveal>
        <ContactHero
          heroTitle={contact.heroTitle}
          heroParagraph={contact.heroParagraph}
          heroImage={contact.heroImage}
        />
      </ScrollReveal>

      {/* Lets Talk Solution */}
      <ScrollReveal>
        <LetsTalkSolution 
          talkTitle={contact.talkTitle} 
          talkDescription={contact.talkDescription} 
        />
      </ScrollReveal>

      {/* Info Cards Section */}
      <ScrollReveal>
        <ContactInfoCards />
      </ScrollReveal>

      {/*Grid layout for ContactForm & KeyContacts: Form, Key Contacts*/}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start px-6 md:px-16 py-12">
        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>
        {/* KeyContact */}
        <ScrollReveal>
          <KeyContacts
            keyContacts={contact.keyContacts}
            testimonials={contact.testimonials}
          />
        </ScrollReveal>
      </div>

      {/* Amidst Many Testimony */}
      <ScrollReveal>
        <AmidstManyTestimony/>
      </ScrollReveal>
      
      {/* Offices / Reach Map image */}
      <ScrollReveal>
        <RegionalCoverage/>
      </ScrollReveal>
       
      <ScrollReveal>
        <Partners partners={contact.partners} />
      </ScrollReveal>

      <ScrollReveal>
        <QuickInquiry quickSent={quickSent} setQuickSent={setQuickSent} />
      </ScrollReveal>
    </main>
  );
}
