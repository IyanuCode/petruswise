import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET the single contact page
export async function GET() {
  try {
    const contactPage = await prisma.contactPage.findFirst({
      include: { keyContacts: true, testimonials: true, partners: true },
    });
    return NextResponse.json(contactPage || {});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load contact page" }, { status: 500 });
  }
}

// UPDATE the contact page
export async function PUT(req: Request) {
  try {
    const data = await req.json();

    const updated = await prisma.contactPage.upsert({
      where: { id: data.id || 1 },
      update: {
        heroTitle: data.heroTitle,
        heroParagraph: data.heroParagraph,
        talkTitle: data.talkTitle,
        talkDescription: data.talkDescription,
      },
      create: {
        heroTitle: data.heroTitle,
        heroParagraph: data.heroParagraph,
        talkTitle: data.talkTitle,
        talkDescription: data.talkDescription,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update contact page" }, { status: 500 });
  }
}
