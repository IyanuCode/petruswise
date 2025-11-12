import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  //  Create or update admin
  const password = await bcrypt.hash("Admin@123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@petruswise.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@petruswise.com",
      password,
      role: "ADMIN",
    },
  });

  // About Page
  await prisma.aboutPage.upsert({
    where: { slug: "about-page" },
    update: {},
    create: {
      slug: "about-page",
      heroTitle: "About PetrusWise",
      heroImage: "/about-hero.jpg",
      heroParagraph:
        "PetrusWise partners with public and private institutions to design systems that deliver compliance, quality, and measurable growth.",
      ourStoryIntro:
        "In a world where business challenges evolve faster than most organizations can adapt, the need for transformation remains indispensable.",
      ourStoryCont:
        "we redefine consulting in Africa by helping businesses become agile, effective, and compliant. We believe that true growth is achieved through adaptability, innovation, and alignment with evolving industry standards.",
      ourStoryEnding:
        "Our experts provide tailored solutions—not a one-size-fits-all model. We focus on understanding your unique business landscape, crafting practical strategies that deliver measurable results across ISO certifications, regulatory compliance, HR management, and professional training.",
      vision:
        "To lead consultancy in management systems, regulatory affairs, education, and quality assurance—delivering innovative solutions that transform organizations and improve lives across Africa.",
      mission:
        "We help organizations enhance safety, quality,environmental performance, and productivity—contributing to a better society and improved quality of life.",

      staff: {
        create: [
          {
            name: "Mr. Bisi Popoola",
            role: "Partner, HR & Organizational Effectiveness",
            experience: "15+ years experience",
            tooltip:
              "Expert in HR strategy, cultural transformation, and people management.",
            image: "/popoola.jpg",
            overlayText: "A Transformative Leader",
            bio: "Mr. Bisi Popoola is a seasoned HR professional with over 15 years across consulting, FMCG, and QSR sectors. He has led organizational transformation at Cadbury, PZ Cussons, Perfetti Van Melle, and UAC Foods, driving performance through people. He holds an MSc in HR & Industrial Relations and multiple global HR certifications including SHRM-SCP and GPHR. A strategic leader and talented instrumentalist, he is happily married with children.",
          },
          {
            name: "Mrs. Tayo Awotiku",
            role: "Partner, Legal Services",
            experience: "12+ years experience",
            tooltip: "Legal expert in corporate, labour, and compliance law.",
            image: "/awotiku.jpg",
            overlayText: "Counsel for Clarity & Compliance",
            bio: "Mrs. Tayo Awotiku is an accomplished legal practitioner with over 12 years of experience in corporate law, compliance, and arbitration. She has provided strategic legal counsel across industries, ensuring clarity and compliance in transactions and governance. A Master's degree holder in Public Law from the University of Ibadan, she is also a skilled writer and editor, valued for her articulate expression and integrity-driven approach.",
          },
          {
            name: "Engr. Piagbo Beabu Kiasira",
            role: "Senior Consultant, ISG Management Systems",
            experience: "400+ audits conducted",
            tooltip:
              "COREN-certified ISO consultant and PECB Lead Implementer.",
            image: "/kiasira.jpg",
            overlayText: "Driven by Quality",
            bio: "Engr. Piagbo Beabu Kiasira is a COREN-certified engineer and ISO systems consultant with extensive auditing experience across manufacturing, oil & gas, and telecom sectors. He is a Lead Auditor for ISO 9001, 14001, 45001, 22000, and 13485, as well as a PECB-certified Lead Implementer for ISO 37301. Holding a Master’s degree in Project Management (Distinction) from Teesside University, UK, he brings a results-driven commitment to quality and leadership.",
          },
          {
            name: "Mrs. Taiwo Olagoke",
            role: "Senior Consultant, QA & GHP",
            experience: "18+ years experience",
            tooltip:
              "Specialist in QA systems, audits, and process optimization.",
            image: "/olagoke.jpg",
            overlayText: "Quality in Action",
            bio: "Mrs. Taiwo Olagoke is a quality assurance professional with more than 18 years of manufacturing experience. She has developed and implemented comprehensive QA systems that improve product integrity, compliance, and sustainability. Her expertise in audits, production oversight, and continuous improvement drives operational excellence across organizations.",
          },
          {
            name: "Mr. Tayo Egbedeyi",
            role: "Senior Consultant, R&D and Regulatory",
            experience: "20+ years experience",
            tooltip:
              "Expert in ISO standards, GMP, and Six Sigma implementation.",
            image: "/egbedeyi.jpg",
            overlayText: "Known for Excellence",
            bio: "Mr. Tayo Egbedeyi brings nearly two decades of experience in laundry, personal care, and home care industries. He has successfully led ISO 9001, 14001, 45001, and 22716 (GMP) implementations and driven R&D and regulatory excellence. His application of Six Sigma and lean methodologies has improved compliance, operational efficiency, and customer satisfaction.",
          },
        ],
      },
    },
  });
  console.log("✅ About page seeded:");

  //  Create or update contact page
  await prisma.contactPage.upsert({
    where: { slug: "contact-page" },
    update: {},
    create: {
      slug: "contact-page",
      heroTitle: "Contact PetrusWise",
      heroParagraph:
        "We help organisations across Africa design systems, meet regulatory requirements and build resilient teams.",
      heroImage:"/hero5.jpg",
      talkTitle: "Let’s talk solutions",
      talkDescription:
        "Whether you need regulatory clarity, ISO support, or a people strategy that scales — our consultants are ready. Submit your inquiry and we'll respond with practical next steps.",
      address: "123 Business St, Lagos, Nigeria",
      phone: "+234 123 456 7890",
      email: "info@petruswise.com",
      keyContacts: {
        create: [
          {
            name: "Mr. Olanrewaju Oresanya",
            role: "CEO",
            contactInfo: "ceo@petruswise.com",
            imageUrl:"/ceo.jpg",
          },
          {
            name: "Ms. Adaeze Okafor",
            role: "Head of Consulting",
            contactInfo: "relations@petruswise.com",
            imageUrl:"/olagoke.jpg",
        
          },
          {
            name: "Mr. Chinedu Eze",
            role: "Head of Sales",
            contactInfo: "sales@petruswise.com",
            imageUrl:"/popoola.jpg",
          },
        ],
      },
      testimonials: {
        create: [
          {
            name: "MD, FMCG Company",
            quote:
              "PetrusWise guided our ISO certification — seamless and professional.",
            role: "Managing Director",
          },
          {
            name: "Head of R&D, Consumer Goods",
            quote:
              "Regulatory support that actually saved our launch timetable.",
            role: "Head of R&D",
          },
        ],
      },
      partners: {
        create: [
          { name: "Mission Partner", logoUrl: "/missionIcon.png" },
          { name: "Eye Partner", logoUrl: "/eye.png" },
          { name: "Network Partner", logoUrl: "/network.png" },
        ],
      },
    },
  });

  console.log("✅ Contact Page seeding completed successfully!");
}

main()
  .then(() => console.log("✅ Seeding complete"))
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
