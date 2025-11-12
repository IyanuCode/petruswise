// src/app/api/contact-page/testimonials/route.ts
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

    const created = await prisma.testimonial.create({
      data: {
        name: body.name || "",
        role: body.role || "",
        quote: body.quote || "",
        contactPageId: page.id,
      },
    });

    return NextResponse.json(created);
  } catch (err) {
    console.error("POST /api/contact-page/testimonials", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
