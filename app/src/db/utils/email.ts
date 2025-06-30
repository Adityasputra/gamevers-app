import { Resend } from "resend";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/emails/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email: string, link: string) => {
  try {
    const html = await render(ResetPasswordEmail({ resetLink: link }));

    const { error } = await resend.emails.send({
      from: "GameVers  <noreply@resend.dev>",
      to: process.env.NEXT_PUBLIC_EMAIL || email,
      subject: "Reset Your Password",
      html,
    });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send email");
    }

    console.log("Email sent to", email);
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
};
