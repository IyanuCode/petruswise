// src/app/api/contact-page/partners/[id]/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await prisma.partner.update({
      where: { id: Number(id) },
      data: {
        name: body.name ?? undefined,
        logoUrl: body.logoUrl ?? undefined,
        prevCloudinaryImgId: body.prevCloudinaryImgId ?? undefined,

      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update partners" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.partner.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/contact-page/key-contacts/[id]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
