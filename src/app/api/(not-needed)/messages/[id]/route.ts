import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

//GET single message by ID
export async function GET(_: Request, {params}: {params: {id: string}}){
   const {id} = params;
   const message = await prisma.contactMessage.findUnique({
       where: {id: Number(id)},
   });
   if(!message) return NextResponse.json({error: "Message not found"}, {status: 404});
   return NextResponse.json(message);
}

//DELETE - Delete a message by ID
export async function DELETE(_: Request, {params}: {params: {id: string}}){
    const {id} = params;
    await prisma.contactMessage.delete({
        where: {id: Number(id)},
    });
    return NextResponse.json({message: "Message deleted successfully"});
}