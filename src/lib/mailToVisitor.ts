import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function mailToVisitor(
  sender: string = "onboarding@resend.dev",
  receiver: string,
  subject: string,
  htmlMessage: string
) {
  await resend.emails.send({
    from: sender,
    to: receiver,
    subject: subject,
    html: htmlMessage,
  });
}
