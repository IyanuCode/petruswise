// src/app/api/contact-page/partners/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    const created = await prisma.partner.create({
      data: {
        name: body.name || "",
        logoUrl: body.logoUrl || "",
        contactPageId: page.id,
      },
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error("POST /api/contact-page/partners", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
