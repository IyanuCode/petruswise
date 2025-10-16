import CoverageSection from "@/components/CoverageSection";
import HeroSlider from "@/components/HeroSlider";
import MainBody from "@/components/MainBody";
import Practise from "@/components/Practise";
import QuickEnquiry from "@/components/QuickEnquiry";
import ScrollReveal from "@/components/ScrollReveal";
export default function Home() {
  return (
    <main>
       <HeroSlider/>
       <ScrollReveal>
        <MainBody/> 
        <CoverageSection/>
       <QuickEnquiry/>
       </ScrollReveal>

       
       
  

    </main>
  );
}
