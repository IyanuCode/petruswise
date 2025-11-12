import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import toast from "react-hot-toast";

// GET single user
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const user = await prisma.admin.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  return NextResponse.json(user);
}

// UPDATE user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const { name, email, password, role } = await req.json();

  const data: any = { name, email, role };
  if (password && password.trim() !== "") {
    data.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await prisma.admin.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedUser);
}

// DELETE user
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  await prisma.admin.delete({ where: { id } });
  return NextResponse.json({ message: "User deleted successfully" });
  
}
