import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//Handles Delete
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    await prisma.admin.delete({
        where: { id },
    });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}