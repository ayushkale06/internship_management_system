import { Resend } from 'resend';

// Initialize Resend with the API key from your environment variables
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export const sendSystemEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn("MOCK EMAIL SENT (No Resend API Key found):", { to, subject });
    return { success: true, mock: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'College Internship System <noreply@your-domain.com>',
      to: [to],
      subject: subject,
      html: html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};
