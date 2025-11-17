import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { StaffRequestDTO } from "@/lib/dto/aboutPage.dto";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "ADMIN" &&
        session.user.role !== "SUPERADMIN" &&
        session.user.role != "EDITOR")
    )
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const staffId = Number(params.id);
    const body: StaffRequestDTO = await req.json();

    const updated = await prisma.staff.update({
      where: { id: staffId },
      data: {
        name: body.name,
        role: body.role,
        experience: body.experience,
        bio: body.bio,
        imageUrl: body.imageUrl,
        prevCloudinaryImgId: body.prevCloudinaryImgId || "",
        overlayText: body.overlayText,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.json({error:"Failed to update staff"}, {status:500});
  }
}
