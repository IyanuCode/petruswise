import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { StaffRequestDTO } from "@/lib/dto/aboutPage.dto";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "ADMIN" &&
        session.user.role !== "SUPERADMIN" &&
        session.user.role != "EDITOR")
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body:StaffRequestDTO = await req.json();

    const newStaff = await prisma.staff.create({
      data: {
        aboutPageId: 1,
        name: body.name,
        role: body.role,
        experience: body.experience,
        bio: body.bio,
        imageUrl: body.imageUrl,
        prevCloudinaryImgId: body.prevCloudinaryImgId || "",
        overlayText: body.overlayText,
      },
    });
    return NextResponse.json(newStaff, {status:201});
  } catch (error) {
    console.error("Error creating Staff:", error);
    return NextResponse.json({error: "Fatiled to create staff"}, {status:500})
  }
}
