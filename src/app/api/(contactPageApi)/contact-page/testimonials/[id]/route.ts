// src/app/api/contact-page/testimonials/[id]/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function PUT(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = await _.json();
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        role: body.role ?? undefined,
        quote: body.quote ?? undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT testimonial", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE testimonial", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
