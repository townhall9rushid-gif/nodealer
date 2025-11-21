export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, phone, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    // Send email using Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    if (brevoApiKey) {
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            email: 'noreply@nodealer.in',
            name: 'NoDealer'
          },
          to: [{ email: email, name: 'User' }],
          subject: 'Your NoDealer OTP',
          htmlContent: `<h2>NoDealer OTP: ${otp}</h2><p>Valid for 10 minutes</p>`
        })
      });

      const emailResult = await emailResponse.json();
      if (!emailResponse.ok) throw new Error(JSON.stringify(emailResult));
    }

    return res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
