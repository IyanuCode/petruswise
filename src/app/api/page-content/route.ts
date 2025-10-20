import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stat } from "fs";

//2.  GET all page content
export async function GET() {
  try {
    const pages = await prisma.pageContent.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(pages, { status: 200 });
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

//3.  POST create new page content
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const newContent = await prisma.pageContent.create({
      data: { title, content, slug },
    });

    return NextResponse.json(newContent);
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}
