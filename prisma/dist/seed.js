"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    // ✅ Create or update admin
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
    // ✅ Create or update contact page
    await prisma.contactPage.upsert({
        where: { slug: "contact-page" },
        update: {},
        create: {
            slug: "contact-page",
            heroTitle: "Contact PetrusWise",
            heroParagraph: "We help organisations across Africa design systems, meet regulatory requirements and build resilient teams.",
            talkTitle: "Let’s talk solutions",
            talkDescription: "Whether you need regulatory clarity, ISO support, or a people strategy that scales — our consultants are ready. Submit your inquiry and we'll respond with practical next steps.",
            address: "123 Business St, Lagos, Nigeria",
            phone: "+234 123 456 7890",
            email: "info@petruswise.com",
            keyContacts: {
                create: [
                    {
                        name: "Mr. Olanrewaju Oresanya",
                        role: "CEO",
                        contactInfo: "ceo@petruswise.com",
                    },
                    {
                        name: "Ms. Adaeze Okafor",
                        role: "Head of Consulting",
                        contactInfo: "relations@petruswise.com",
                    },
                    {
                        name: "Mr. Chinedu Eze",
                        role: "Head of Sales",
                        contactInfo: "sales@petruswise.com",
                    },
                ],
            },
            testimonials: {
                create: [
                    {
                        name: "MD, FMCG Company",
                        quote: "PetrusWise guided our ISO certification — seamless and professional.",
                        role: "Managing Director",
                    },
                    {
                        name: "Head of R&D, Consumer Goods",
                        quote: "Regulatory support that actually saved our launch timetable.",
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
    console.log("✅ Seeding completed successfully!");
}
main()
    .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
