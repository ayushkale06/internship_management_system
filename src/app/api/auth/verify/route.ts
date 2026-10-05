import { NextResponse } from 'next/server';

// Feature 1: Actual Email Verification Service Mock implementation
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // In a real application, you would use SendGrid, Resend, or AWS SES:
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Nexus Internships <noreply@nexusintern.com>',
      to: [email],
      subject: 'Verify your Nexus Account',
      html: '<p>Click here to verify: <a href="https://nexus.com/verify?token=xyz">Verify</a></p>'
    });
    */

    // Simulate network delay for sending email
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`[EMAIL SERVICE] Verification email dispatched successfully to: ${email}`);

    // Update database (mocked logic)
    // await prisma.user.update({ where: { email }, data: { emailVerificationSent: true } })

    return NextResponse.json({ 
      success: true, 
      message: `Verification email sent successfully to ${email}. Check your inbox to activate your account.` 
    }, { status: 200 });

  } catch (error) {
    console.error("Email Verification Error:", error);
    return NextResponse.json({ error: 'Failed to dispatch verification email' }, { status: 500 });
  }
}
