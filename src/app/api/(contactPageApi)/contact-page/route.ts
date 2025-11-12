// src/app/api/contact-page/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//-------------------------GET---------------------------------------------

export async function GET() {
  try {
    const page = await prisma.contactPage.findFirst({
      include: {
        keyContacts: true,
        testimonials: true,
        partners: true,
      },
    });
    if (!page) {
      return NextResponse.json(
        { error: "Contact page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page ?? {});
  } catch (err) {
    console.error("GET /api/contact-page", err);
    return NextResponse.json(
      { error: "Failed to load contact page" },
      { status: 500 }
    );
  }
}


//-------------------------UPDATE---------------------------------------------
// Define a type for incoming data
type ContactPageUpdatePayload = {
  heroTitle?: string;
  heroParagraph?: string;
  heroImage?: string;
  newImagePublicId?:string;
  talkTitle?: string;
  talkDescription?: string;
  prevCloudinaryImgId?:string;
  address?: string;
  phone?: string;
  email?: string;
};

export async function PUT(req: Request) {
  try {
    const incomingData: ContactPageUpdatePayload = await req.json();

    // Check if a ContactPage with the slug exists
    const existingContactPage = await prisma.contactPage.findUnique({
      where: { slug: "contact-page" },
    });

    // If no record exists, create a new one
    if (!existingContactPage) {
      const created = await prisma.contactPage.create({
        data: {
          slug: "contact-page", // important for future updates
          heroTitle: incomingData.heroTitle || "",
          heroParagraph: incomingData.heroParagraph || "",
          heroImage: incomingData.heroImage || "",
          prevCloudinaryImgId: incomingData.newImagePublicId || "",
          talkTitle: incomingData.talkTitle || "",
          talkDescription: incomingData.talkDescription || "",
          address: incomingData.address || "",
          phone: incomingData.phone || "",
          email: incomingData.email || "",
        },
      });
      return NextResponse.json(created, { status: 201 });
    }

    // Prepare only the fields that are actually sent
    const fieldsToUpdate: Partial<ContactPageUpdatePayload> = {};

    if ("heroTitle" in incomingData) fieldsToUpdate.heroTitle = incomingData.heroTitle!;
    if ("heroParagraph" in incomingData) fieldsToUpdate.heroParagraph = incomingData.heroParagraph!;
    if ("heroImage" in incomingData) fieldsToUpdate.heroImage = incomingData.heroImage!;
    if ("talkTitle" in incomingData) fieldsToUpdate.talkTitle = incomingData.talkTitle!;
    if ("talkDescription" in incomingData) fieldsToUpdate.talkDescription = incomingData.talkDescription!;
    if ("address" in incomingData) fieldsToUpdate.address = incomingData.address!;
    if ("phone" in incomingData) fieldsToUpdate.phone = incomingData.phone!;
    if ("email" in incomingData) fieldsToUpdate.email = incomingData.email!;
    if ("newImagePublicId" in incomingData) fieldsToUpdate.prevCloudinaryImgId = incomingData.newImagePublicId!;

    // Update the record
    const updated = await prisma.contactPage.update({
      where: { slug: "contact-page" },
      data: fieldsToUpdate,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/contact-page", error);
    return NextResponse.json(
      { error: "Failed to update contact page", details: error.message },
      { status: 500 }
    );
  }
}


