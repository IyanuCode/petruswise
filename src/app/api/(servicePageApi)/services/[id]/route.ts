import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { heroImage, prevCloudinaryImgId } = await req.json();

    const updatedPage = await prisma.servicePage.update({
      where: { id: Number(id) },
      data: { heroImage, prevCloudinaryImgId },
      include: { services: true },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating service page:", error);
    return NextResponse.json({ error: "Failed to update service page" }, { status: 500 });
  }
}
