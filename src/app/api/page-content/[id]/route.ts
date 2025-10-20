import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get one page content by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.pageContent.findUnique({
      where: { id: Number(params.id) },
    });

    if (!item) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// Update page content by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content } = await req.json();

    const updated = await prisma.pageContent.update({
      where: { id: Number(params.id) },
      data: { title, content },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// Delete page content by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.pageContent.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
