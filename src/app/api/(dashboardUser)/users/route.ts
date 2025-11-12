import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    const users = await prisma.admin.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    return NextResponse.json(users);
}
export async function POST(req: Request) {
    const { name, email, password, role } = await req.json();
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.admin.create({
        data: {
            name,
            email,
            password: hashed,
            role,
        },
    });
    return NextResponse.json(user);
}