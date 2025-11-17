import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
   /*-----------------------------------------------------USER(ADMIN)----------------------------------------------- */
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

  /*-----------------------------------------------------ABOUT PAGE----------------------------------------------- */
 // Seed the about page
const aboutPage = await prisma.aboutPage.upsert({
  where: { slug: "about-page" },
  update: {
    heroImage: "/hero3.jpg",
  },
  create: {
    slug: "about-page",
    heroTitle: "About PetrusWise",
    heroImage: "/hero3.jpg",
    heroParagraph:
      "PetrusWise partners with public and private institutions to design systems that deliver compliance, quality, and measurable growth.",
    ourStoryIntro:
      "In a world where business challenges evolve faster than most organizations can adapt, the need for transformation remains indispensable.",
    ourStoryCont:
      "We redefine consulting in Africa by helping businesses become agile, effective, and compliant. We believe that true growth is achieved through adaptability, innovation, and alignment with evolving industry standards.",
    ourStoryEnding:
      "Our experts provide tailored solutions—not a one-size-fits-all model. We focus on understanding your unique business landscape, crafting practical strategies that deliver measurable results across ISO certifications, regulatory compliance, HR management, and professional training.",
    vision:
      "To lead consultancy in management systems, regulatory affairs, education, and quality assurance—delivering innovative solutions that transform organizations and improve lives across Africa.",
    mission:
      "We help organizations enhance safety, quality, environmental performance, and productivity—contributing to a better society and improved quality of life.",
  },
});

console.log("✅ About page upserted");

// Staff data to sync (source of truth)
const staffSeed = [
  {
    name: "Mr. Bisi Popoola",
    role: "Partner, HR & Organizational Effectiveness",
    experience: "15+ years experience",
    tooltip:
      "Expert in HR strategy, cultural transformation, and people management.",
    imageUrl: "/popoola.jpg",
    overlayText: "A Transformative Leader",
    bio: "Mr. Bisi Popoola is a seasoned HR professional with over 15 years across consulting, FMCG, and QSR sectors...",
  },
  {
    name: "Mrs. Tayo Awotiku",
    role: "Partner, Legal Services",
    experience: "12+ years experience",
    tooltip: "Legal expert in corporate, labour, and compliance law.",
    imageUrl: "/awotiku.jpg",
    overlayText: "Counsel for Clarity & Compliance",
    bio: "Mrs. Tayo Awotiku is an accomplished legal practitioner with over 12 years of experience...",
  },
  {
    name: "Engr. Piagbo Beabu Kiasira",
    role: "Senior Consultant, ISG Management Systems",
    experience: "400+ audits conducted",
    tooltip:
      "COREN-certified ISO consultant and PECB Lead Implementer.",
    imageUrl: "/kiasira.jpg",
    overlayText: "Driven by Quality",
    bio: "Engr. Piagbo Beabu Kiasira is a COREN-certified engineer and ISO systems consultant...",
  },
  {
    name: "Mrs. Taiwo Olagoke",
    role: "Senior Consultant, QA & GHP",
    experience: "18+ years experience",
    tooltip:
      "Specialist in QA systems, audits, and process optimization.",
    imageUrl: "/olagoke.jpg",
    overlayText: "Quality in Action",
    bio: "Mrs. Taiwo Olagoke is a quality assurance professional with more than 18 years of manufacturing experience...",
  },
  {
    name: "Mr. Tayo Egbedeyi",
    role: "Senior Consultant, R&D and Regulatory",
    experience: "20+ years experience",
    tooltip:
      "Expert in ISO standards, GMP, and Six Sigma implementation.",
    imageUrl: "/egbedeyi.jpg",
    overlayText: "Known for Excellence",
    bio: "Mr. Tayo Egbedeyi brings nearly two decades of experience in laundry, personal care, and home care industries...",
  },
];

// Loop through staff and update or create them
for (const staff of staffSeed) {
  await prisma.staff.upsert({
    where: {
      // match by unique name
      name: staff.name,
    },
    update: {
      role: staff.role,
      experience: staff.experience,
      tooltip: staff.tooltip,
      imageUrl: staff.imageUrl,
      overlayText: staff.overlayText,
      bio: staff.bio,
      aboutPageId: aboutPage.id, // keeps relation intact
    },
    create: {
      ...staff,
      aboutPageId: aboutPage.id,
    },
  });
}

console.log("✅ Staff synced successfully");

  
  await prisma.ceo.upsert({
    where: { name: "Olanrewaju Oresanya" },
    update: {
      title: "Chief Executive Officer",
      bio: `Olanrewaju Oresanya is a seasoned Management Systems expert with over 27 years of QHSE and operational experience spanning R&D, procurement, manufacturing, distribution, and customer service. He holds an MBA from Ekiti State University and an HND in Analytical Chemistry from Yaba College of Technology. He is a Fellow of the Institute of Chartered Chemists of Nigeria, a member of the Management Systems Practitioners of Nigeria (MASPN), and a certified Lead Auditor for ISO 9001:2015 and FSSC 22000. Mr. Oresanya began his career at Procter & Gamble Nigeria as a Quality Analyst, later becoming the Quality Control Leader of the Ibadan Plant. In 2013, he joined PZ Cussons Nigeria PLC as Quality Assurance Manager, rising to Africa Quality Systems Manager and ISO 9001:2015 Representative. He has been instrumental in achieving ISO certifications and building sustainable quality infrastructures across operations in Africa. He currently serves as Head of Quality and Quality Systems Manager for Africa at PZ Cussons. At PetrusWise Limited, Mr. Oresanya leads with integrity, regulatory insight, and a performance-driven vision—ensuring every client engagement translates into measurable impact and compliance excellence.`,
      imageUrl: "/ceo.jpg",
      quote: "An Architect of Quality Systems in Africa.",
      aboutPageId: aboutPage.id,
    },
    create: {
      name: "Olanrewaju Oresanya",
      title: "Chief Executive Officer",
      bio: `Olanrewaju Oresanya is a seasoned Management Systems expert with over 27 years of QHSE and operational experience spanning R&D, procurement, manufacturing, distribution, and customer service. He holds an MBA from Ekiti State University and an HND in Analytical Chemistry from Yaba College of Technology. He is a Fellow of the Institute of Chartered Chemists of Nigeria, a member of the Management Systems Practitioners of Nigeria (MASPN), and a certified Lead Auditor for ISO 9001:2015 and FSSC 22000. Mr. Oresanya began his career at Procter & Gamble Nigeria as a Quality Analyst, later becoming the Quality Control Leader of the Ibadan Plant. In 2013, he joined PZ Cussons Nigeria PLC as Quality Assurance Manager, rising to Africa Quality Systems Manager and ISO 9001:2015 Representative. He has been instrumental in achieving ISO certifications and building sustainable quality infrastructures across operations in Africa. He currently serves as Head of Quality and Quality Systems Manager for Africa at PZ Cussons. At PetrusWise Limited, Mr. Oresanya leads with integrity, regulatory insight, and a performance-driven vision—ensuring every client engagement translates into measurable impact and compliance excellence.`,
      imageUrl: "/ceo.jpg",
      quote: "An Architect of Quality Systems in Africa.",
      aboutPageId: aboutPage.id,
    },
  });

  console.log("✅ CEO seeded");

  /*-----------------------------------------------------CONTACT PAGE----------------------------------------------- */
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

  /*-----------------------------------------------------SERVICE PAGE----------------------------------------------- */
// Create a service page with hero image and service data
  await prisma.servicePage.upsert({
    where: { slug: "service-page" },
    update: {},
    create: {
      heroImage: '/hero1.jpg',
      slug: "service-page",
      services: {
        create: [
          {
            title: 'Management Systems Consulting',
            quote:
              'Our approach is holistic. We begin by understanding the nature and structure of your organization.',
            description:
              'We design and implement globally recognized systems like ISO 9001, 14001, 45001, and 22000, aligning compliance with strategy for sustainable operational excellence.',
            imageUrl: '/hero5.jpg',
            slug: 'management-systems',
          },
          {
            title: 'Regulatory Consulting & Advisory',
            quote: 'We turn regulatory bottlenecks into bridges.',
            description:
              'From NAFDAC to SON and NESREA, we help businesses navigate compliance with confidence — building proactive systems that ensure long-term regulatory trust.',
            imageUrl: '/Regulatory.jpg',
            slug: 'regulatory-consulting',
          },
          {
            title: 'Quality Assurance & Laboratory Systems',
            quote:
              'Quality must be engineered into the DNA of every organization.',
            description:
              'We develop robust QA systems and lab processes that meet ISO/IEC 17025 and TQM standards, ensuring reliability, consistency, and brand excellence.',
            imageUrl: '/28.png',
            slug: 'quality-assurance',
          },
          {
            title: 'Customer Complaint Management',
            quote:
              'Every customer complaint is a data point, a lesson, and a chance to improve.',
            description:
              'We build complaint management frameworks that capture insights and transform feedback into innovation, loyalty, and measurable satisfaction.',
            imageUrl: '/comp.jpg',
            slug: 'complaint-management',
          },
          {
            title: 'Human Capital Development',
            quote:
              'Your workforce is not just a support system — it is your greatest asset.',
            description:
              'We deliver training and leadership programs that build competence, culture, and confidence — preparing your people for tomorrow’s opportunities.',
            imageUrl: '/9.png',
            slug: 'human-capital',
          },
          {
            title: 'Business Process Improvement',
            quote: 'Every thriving organization is built on efficient processes.',
            description:
              'Using Lean, Six Sigma, and Kaizen methodologies, we redesign workflows for clarity, speed, and performance-driven results.',
            imageUrl: '/BPI.png',
            slug: 'process-improvement',
          },
          {
            title: 'Educational Consulting',
            quote: 'We help individuals unlock global opportunities.',
            description:
              'From career guidance to scholarships, we guide students and professionals to achieve local and international academic success.',
            imageUrl: '/educa.png',
            slug: 'educational-consulting',
          },
          {
            title: 'Training & Development',
            quote:
              'Training is not a tick-box activity — it is a strategic enabler of transformation.',
            description:
              'Our training combines theory with hands-on impact — covering compliance, leadership, communication, and change management.',
            imageUrl: '/Training.jpg',
            slug: 'training',
          },
          {
            title: 'Human Resource Services',
            quote: 'Finding the right people is just the beginning.',
            description:
              'We provide recruitment, outsourcing, and performance systems that align people strategy with business strategy for enduring success.',
            imageUrl: '/5.jpg',
            slug: 'hr-services',
          },
        ],
      },
    },
  });
  console.log('✅ ServicePage and all ServiceData seeded successfully!');


  
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
