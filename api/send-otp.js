export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, phone, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    // Log OTP for testing (in production, this would send via email/SMS)
    console.log(`OTP SENT - Email: ${email}, Phone: ${phone}, OTP: ${otp}`);
    
    // Simulate API success response
    // In production, replace with actual email service like:
    // - Brevo (process.env.BREVO_API_KEY)
    // - SendGrid
    // - AWS SES
    // - Gmail SMTP
    
    return res.status(200).json({ 
      success: true,
      message: 'OTP sent successfully',
      email: email,
      testMode: true
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ 
      error: 'Failed to send OTP',
      message: error.message
    });
  }
}
