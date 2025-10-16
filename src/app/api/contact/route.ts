import { NextResponse } from "next/server"

export async function POST(request: Request){
    const form = await request.formData()
    const name = String(form.get("name")?? '')
    const email = String(form.get("email")?? '')
    const message = String(form.get("message")?? '')

    console.log("Contact form received", {name, email, message})

    return NextResponse.json({ok: true})
}