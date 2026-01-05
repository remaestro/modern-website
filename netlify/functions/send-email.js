const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { to, from, subject, html, replyTo } = JSON.parse(event.body);

    if (!to || !subject || !html) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
      };
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

    console.log('📧 Sending email...', { to, subject });
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email envoyé avec succès' }),
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        success: false 
      }),
    };
  }
};
