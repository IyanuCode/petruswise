import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//GET all messages
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

//Create a new message(POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const newMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });
    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
