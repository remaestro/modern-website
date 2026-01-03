// Netlify Function pour envoyer des emails via Gmail SMTP
import nodemailer from 'nodemailer';

export const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { to, subject, html, text, replyTo } = JSON.parse(event.body);

    console.log('Sending email via Gmail SMTP...', { to, subject });

    // Configuration Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Envoi de l'email à plusieurs destinataires
    const recipients = 'infos@digita-energy.com, ra@digita-energy.com';
    
    const info = await transporter.sendMail({
      from: `"Digita Energy" <${process.env.GMAIL_USER}>`,
      to: recipients,
      subject: subject || 'Nouvelle demande - Digita Energy',
      text: text,
      html: html,
      replyTo: replyTo,
    });

    console.log('Email sent successfully:', info.messageId);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: info.messageId })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message })
    };
  }
};
