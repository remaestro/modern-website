import nodemailer from 'nodemailer';

export default async function (context, req) {
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
    const { formType, formData } = req.body;

    if (!formType || !formData) {
      context.res.status = 400;
      context.res.body = { error: 'Missing formType or formData' };
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

    // Build email content
    let emailContent = `
      <h2>Nouveau formulaire : ${formType}</h2>
      <hr />
    `;

    for (const [key, value] of Object.entries(formData)) {
      emailContent += `<p><strong>${key}:</strong> ${value}</p>`;
    }

    // Send email
    const mailOptions = {
      from: `"Digita Energy" <${process.env.GMAIL_USER}>`,
      to: ['infos@digita-energy.com', 'ra@digita-energy.com'],
      subject: `[${formType}] Nouvelle demande`,
      html: emailContent,
    };

    context.log('📧 Sending email...', { formType });
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
