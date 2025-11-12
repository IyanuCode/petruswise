// src/app/api/contact-page/key-contacts/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ensure we have a contact page row to attach to
    let page = await prisma.contactPage.findFirst();
    if (!page) {
      page = await prisma.contactPage.create({
        data: {
          heroTitle: "Contact PetrusWise",
          heroParagraph: "",
          talkTitle: "Let’s talk solutions",
          talkDescription: "",
          address: "",
          phone: "",
          email: "",
        },
      });
    }

    const contact = await prisma.contactInfo.create({
      data: {
        name: body.name || "",
        role: body.role || "",
        contactInfo: body.contactInfo || "",
        contactPageId: page.id,
      },
    });

    return NextResponse.json(contact);
  } catch (err) {
    console.error("POST /api/contact-page/key-contacts", err);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
