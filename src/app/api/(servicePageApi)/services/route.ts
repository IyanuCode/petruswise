// For creating or fetching the main page
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
export async function GET(){
    try {
        const servicePage = await prisma.servicePage.findFirst({include:{services:true},});

        return NextResponse.json(servicePage);

    } catch (error) {
        console.error("Error fetching service page:", error);
        return NextResponse.json({error: "Failed to fetch service page"}, {status: 500});
    }
}
