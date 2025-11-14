import ServicesFullPageClient from "@/components/services/ServicesFullPageClient";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const servicePage = await prisma.servicePage.findUnique({
    where: { slug: "service-page" },
    include: { services: true }, 
  });

  if (!servicePage) {
    return <p>Service page content not found</p>;
  }

  return <ServicesFullPageClient servicesData={servicePage} />;
}
