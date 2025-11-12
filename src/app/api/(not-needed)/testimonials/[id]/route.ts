import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

//GET one page content by ID
export async function GET(_: Request, {params}: {params: {id: string}}){
   const {id} = params;
   const item = await prisma.pageContent.findUnique({
       where: {id: Number(id)},
   });
   if(!item) return NextResponse.json({error: "Testimonial not found"}, {status: 404});
   return NextResponse.json(item);
}

//PUT - Update a testimonial by ID
export async function PUT(request: Request, {params}: {params: {id: string}}){
    const {id} = params;
    const {title, content} = await request.json();

    const updated = await prisma.pageContent.update({
        where: {id: Number(id)},
        data: {title, content},
    });
    return NextResponse.json(updated);
}

//DELETE - Delete a page content by ID
export async function DELETE(_: Request, {params}: {params: {id: string}}){
    const {id} = params;
    await prisma.pageContent.delete({
        where: {id: Number(id)},
    });
    return NextResponse.json({message: "Page content deleted successfully"});
}