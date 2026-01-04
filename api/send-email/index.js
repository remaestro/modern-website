const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  // Enable CORS
  context.res = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    context.res.status = 200;
    return;
  }

  try {
    const { to, from, subject, html, replyTo } = req.body;

    if (!to || !subject || !html) {
      context.res.status = 400;
      context.res.body = { error: 'Missing required fields: to, subject, html' };
      return;
    }

    // Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    const mailOptions = {
      from: from || `"Digita Energy" <${process.env.GMAIL_USER}>`,
      to: Array.isArray(to) ? to : [to, 'ra@digita-energy.com'], // Always CC ra@digita-energy.com
      subject,
      html,
      replyTo: replyTo || undefined,
    };

    context.log('📧 Sending email...', { to, subject });
    await transporter.sendMail(mailOptions);
    context.log('✅ Email sent successfully');

    context.res.status = 200;
    context.res.body = { success: true, message: 'Email envoyé avec succès' };
  } catch (error) {
    context.log.error('❌ Error sending email:', error);
    context.res.status = 500;
    context.res.body = { 
      error: error.message,
      success: false 
    };
  }
}
