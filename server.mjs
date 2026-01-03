import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  console.log('📧 Requête email reçue:', req.body);
  
  try {
    const { to, from, subject, html, replyTo } = req.body;
    
    const { data, error } = await resend.emails.send({
      from: from || 'onboarding@resend.dev',
      to,
      subject,
      html,
      replyTo
    });

    if (error) {
      console.error('❌ Erreur Resend:', error);
      return res.status(400).json({ error });
    }

    console.log('✅ Email envoyé avec succès! ID:', data.id);
    res.json({ success: true, id: data.id });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur email démarré sur http://localhost:${PORT}`);
  console.log(`✅ Clé Resend configurée: ${process.env.RESEND_API_KEY ? 'Oui' : 'Non'}`);
});
