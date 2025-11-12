import Image from "next/image";
import {motion} from "framer-motion";
//----------------------Props-------------------------
type ContactHeroProps = {
  heroTitle: string;      // Page hero title
  heroParagraph: string;  // Hero paragraph/description
  heroImage:string;
};

//----------------------Hero Component-------------------------
export default function ContactHero({ heroTitle, heroParagraph, heroImage }: ContactHeroProps) {
  return (
<section className="relative h-[64vh] flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage && heroImage.trim() !==""? heroImage: "/hero5.jpg"}
            alt="Contact PetrusWise"
            fill
            priority
            className="object-cover brightness-[.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
            }}
            className="relative z-10 text-center px-6 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-gold)] mb-4 uppercase tracking-wide">
              {heroTitle }
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-semibold subheading ">
             {heroParagraph}
            </p>
          </motion.div>
        </section>
  );
}
