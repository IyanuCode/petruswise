import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function mailToAdmin(
  sender: string = "onboarding@resend.dev",
  receiver: string = "adeusiiyanu@gmail.com",
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
