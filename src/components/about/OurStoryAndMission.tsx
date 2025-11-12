import {motion} from "framer-motion";




export default function OurStory({ourStoryIntro, ourStoryCont, ourStoryEnding, vision, mission}) {
  const coreValues = [
  {
    title: "Leadership",
    description:
      "We motivate our team and clients to aim high and achieve more, creating pathways for progress and excellence through guidance and support.",
    icon: "/Leader.png",
    alt: "Leadership Icon",
  },
  {
    title: "Integrity",
    description:
      "We act with honesty, fairness, and respect, ensuring that every action we take aligns with ethical principles.",
    icon: "/iconQual.png",
    alt: "Integrity Icon",
  },
  {
    title: "Mastery",
    description:
      "We blend our expertise with professionalism to deliver long-term, impactful relationships with our clients.",
    icon: "/IconCap.png",
    alt: "Mastery Icon",
  },
  {
    title: "Networking",
    description:
      "We are focused on connecting people with people, as well as connecting people with ideas and opportunities. Our focus is to make a meaningful difference.",
    icon: "/Network.png",
    alt: "Networking Icon",
  },
  {
    title: "Civility",
    description:
      "We foster mutual respect for individuals and demonstrate professionalism in all our interactions.",
    icon: "/IconReg.png",
    alt: "Civility Icon",
  },
];

const aboutData = [
  {
    id: "01",
    title: "Founding & Purpose ",
    text: (
      <>
        Founded to bridge the gap between regulation and operational reality,{" "}
        {<span className="petruswise">PetrusWise</span>} focuses on practical
        solutions for real organizations.
      </>
    ),
  },
  {
    id: "02",
    title: "Our Approach",
    text: `We combine technical expertise with stakeholder engagement — implementing systems that last and training people to sustain them.`,
  },
  {
    id: "03",
    title: "Impact So Far",
    text: `Successful certifications, improved operational KPIs, and resilient teams across multiple sectors.`,
  },
];


  return (
    <section className="relative py-24 px-6 md:px-12 bg-[var(--background)] border-t border-[var(--brand-gold)]/20 overflow-hidden">
            {/* Decorative glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,215,0,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
              {/* LEFT — Narrative / Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--brand-gold)] mb-6 tracking-wide uppercase">
                  Our Story
                </h3>

                <div className="text-[var(--foreground)]/85 leading-relaxed text-sm md:text-base space-y-5">
                  <div>
                    {ourStoryIntro}
                  </div>
                  <div>
                    At{" "}
                    <span className="font-semibold text-[var(--brand-gold)] petruswise">
                      PetrusWise Limited
                    </span>
                    {ourStoryCont}
                  </div>
                  <div>
                   {ourStoryEnding}
                  </div>
                </div>

                {/* Timeline / Milestones */}
                <div className="mt-10 pl-6 border-l-2 border-[var(--brand-gold)] space-y-6">
                  {aboutData.map((item) => (
                    <div
                      key={item.id}
                      className="relative pl-4 before:content-[''] before:absolute before:-left-[10px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-[var(--brand-gold)]"
                    >
                      <h4 className="text-lg font-bold text-[var(--brand-gold)] mb-1">
                        {item.title}
                      </h4>
                      <div className="text-[var(--foreground)]/80 text-sm leading-relaxed">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — Mission, Vision, Core Values */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-10"
              >
                {/* Mission / Vision Cards */}
                <div className="flex flex-wrap justify-center gap-8">
                  {/* Mission */}
                  <motion.div
                    className="relative bg-gradient-to-br from-[var(--brand-gold)] to-yellow-600 text-[var(--brand-black)] rounded-2xl p-8 w-[320px] md:w-[360px] shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-500"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 6,
                          ease: "linear",
                        }}
                        className="w-10 h-10 flex items-center justify-center bg-black/20 rounded-full"
                      >
                        <img
                          src="/missionIcon.png"
                          alt="Mission Icon"
                          width={26}
                          height={26}
                          className="object-contain"
                        />
                      </motion.div>
                      <h3 className="font-extrabold uppercase text-lg tracking-wide">
                        Our Mission
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed font-medium opacity-90">
                        {mission}
                    </div>
                  </motion.div>

                  {/* Vision */}
                  <motion.div
                    className="relative bg-black/90 text-[var(--brand-gold)] rounded-2xl p-8 w-[320px] md:w-[360px] shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-500"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                        className="origin-center"
                      >
                        <img
                          src="/eye.png"
                          alt="Vision Icon"
                          width={26}
                          height={26}
                          className="object-contain"
                        />
                      </motion.div>
                      <h3 className="font-extrabold uppercase text-lg tracking-wide">
                        Our Vision
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed font-medium">
                     {vision}
                    </div>
                  </motion.div>
                </div>

                {/* Core Values */}
                <div className="p-8 rounded-2xl border border-[var(--brand-gold)]/40 bg-[var(--foreground)]/5 shadow-md">
                  <h4 className="text-[var(--brand-gold)] text-2xl font-extrabold uppercase mb-6 tracking-wide">
                    Our Core Values
                  </h4>
                  <div className="grid grid-cols-2 gap-6 text-sm text-[var(--foreground)]/85 leading-relaxed">
                    {coreValues.map((item) => (
                      <div key={item.alt} className="flex items-start gap-3">
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className="w-7 h-7 object-contain mt-1"
                        />
                        <div>
                          <span className="font-bold text-[var(--brand-gold)]">
                            {item.title}:
                          </span>{" "}
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
  )
}
