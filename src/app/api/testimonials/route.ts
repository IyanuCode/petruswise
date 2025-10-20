import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

//Get all testimonials
export async function GET(){
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: {createdAt: "desc"},
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({error: "Failed to fetch testimonials"}, {status: 500});
    }
}

//Create a new testimonial(POST)
export async function POST(request: Request){
    try {
        const body = await request.json();
        const {name, role, location, text, emoji, imageUrl} = body;

        if(!name || !role || !location || !text){
            return NextResponse.json({error: "Missing fields"}, {status: 400});
        }
        const newTestimonial = await prisma.testimonial.create({
            data: {name, role, location, text, emoji, imageUrl},
        });
        return NextResponse.json(newTestimonial);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json({error: "Failed to create testimonial"}, {status: 500});

    }
};