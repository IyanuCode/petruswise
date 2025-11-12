import {motion} from "framer-motion";
import { fadeUp } from "@/constant/animations";
interface talkType{
  talkTitle:string,
  talkDescription:string
}
export default function LetsTalkSolution({talkTitle, talkDescription}:talkType) {
  return (
     <section className="py-12 md:py-16 px-6 md:px-16 bg-[var(--foreground)]/5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--brand-gold)] mb-3">
              {talkTitle}
            </h2>
            <p className="text-[var(--foreground)]/80 leading-relaxed">
              {talkDescription}
            </p>
          </motion.div>
        </section>

  )
}
