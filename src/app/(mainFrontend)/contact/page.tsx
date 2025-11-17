// app/contact-page/page.tsx
import { prisma } from "@/lib/prisma";
import ContactFullPageClient from "@/components/contact/ContactFullPageClient";

// export const revalidate = 0; // disable caching for dev

export default async function ContactPage() {
  // Fetch data from Prisma (server-side)
  const contactPage = await prisma.contactPage.findUnique({
    where: { slug: "contact-page" },
    include: {
      keyContacts: true,
      testimonials: true,
      partners: true,
    },
  });

  if (!contactPage) {
    return <p>Contact page content not found.</p>;
  }

  return (
    // Pass all DB data as props to client component
    <ContactFullPageClient contact={contactPage} />
  );
}
