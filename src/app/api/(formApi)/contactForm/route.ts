import { NextResponse } from "next/server";
import { mailToAdmin } from "@/lib/mailToAdmin";
import { mailToVisitor } from "@/lib/mailToVisitor";

export async function POST(request: Request) {
  try {
    const form = await request.json();
    let { name, email, message } = form;
// If message is empty, set a default
if (!message || message.trim() === "") {
  message = "The visitor wants PetrusWise to reach back.";
}
    // mailToAdmin(sender,receiver, subject,htmlMessage)

    //------------------------------Send mail to admin-------------------------
    const adminMessageSender = undefined;
    const adminMessageReceiver = undefined;
    const adminMailSubject = `New contact message from ${name}`;
    const adminText = `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        </div>
      `;
    mailToAdmin(adminMessageSender, adminMessageReceiver, adminMailSubject, adminText);

    //----------------------------Response mail to visitor---------------------
    const visitorMessageSender = undefined;
    const visitorMessageReceiver = email;
    const visitorMailSubject = "Thank you for contacting us!";
    const visitorHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Hi ${name},</h2>
    <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
    <p>We appreciate your patience and will respond as soon as possible.</p>
    <p>Best regards,<br/>PetrusWise Team</p>
  </div>
`;

    mailToVisitor(visitorMessageSender, visitorMessageReceiver, visitorMailSubject, visitorHtml);

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}
