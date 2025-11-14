// For adding/updating ServiceData items

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      quote,
      description,
      imageUrl,
      prevCloudinaryImgId,
      slug,
      servicePageId,
    } = await req.json();

    const newService = await prisma.serviceData.create({
      data: {
        title,
        quote,
        description,
        imageUrl,
        prevCloudinaryImgId,
        slug,
        servicePageId,
      },
    });
    return NextResponse.json(newService);
  } catch (error) {
    console.error("Error creating service daa:", error);
    return NextResponse.json(
      { error: "Failed to create service data" },
      { status: 500 }
    );
  }
}
