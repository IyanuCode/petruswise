// app/about/page.tsx (SERVER COMPONENT)
import AboutFullPageClient from "@/components/about/AboutFullPageClient";
import {prisma} from "@/lib/prisma";

export default async function AboutPage() {
    //fetch all editable about data (SSR)
    const aboutPageData = await prisma.aboutPage.findUnique({
        where:{slug: "about-page"},
        include:{
          staff:true
        }
    })
    console.log(aboutPageData);

    
   if (!aboutPageData) {
    return <p>About page not found.</p>;
  }
  return (
    // Pass all DB data as props to client component
    <AboutFullPageClient about={aboutPageData}/>
  )
}
