import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
 try {
    const { id } = await context.params;

    await prisma.serviceData.delete({
    where: { id: Number(id) },
  });
    return NextResponse.json({ message: "Service deleted" });
 } catch (error) {
    return NextResponse.json({error: "Failed to delete service!"}, {status: 500});
 }
}

export async function PUT(req:Request){
    try {
        const{id, title, quote, description, imageUrl, prevCloudinaryImgId} = await req.json();

        const updatedService=await prisma.serviceData.update({
            where:{id},
            data:{title, quote, description, imageUrl, prevCloudinaryImgId}
        });
        return NextResponse.json(updatedService);
    } catch (error) {
        console.error("Error updating service data:", error);
        return NextResponse.json({error: "Failed to update service data"}, {status:500});
    }
}