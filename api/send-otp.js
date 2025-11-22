import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, phone, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    // Initialize Resend with API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send OTP email using Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',      to: [email],
      subject: 'Your NoDealer Registration OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to NoDealer!</h2>
          <p>Your One-Time Password (OTP) for registration is:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated message from NoDealer.</p>
        </div>
      `,
    });

    console.log('OTP email sent successfully:', data);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      email: email,
    });
  } catch (error) {
    console.error('Error sending OTP email:', JSON.stringify(error, null, 2));
    return res.status(500).json({
      error: 'Failed to send OTP',
      message: error.message
    });
  }
}
