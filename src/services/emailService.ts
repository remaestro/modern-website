import { EMAIL_CONFIG } from '../config/email';

export interface EmailPayload {
  formType: string;
  data: Record<string, any>;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: any;
}

/**
 * Service d'envoi d'emails avec Resend
 * Nécessite une API Route côté serveur pour sécuriser la clé API
 */
class EmailService {
  /**
   * Prépare le contenu HTML de l'email
   */
  private generateEmailHTML(payload: EmailPayload): string {
    const { formType, data } = payload;
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; color: #52BA63; font-size: 24px; }
    .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #f0f0f0; }
    .info-table td:first-child { font-weight: bold; width: 150px; color: #666; }
    .details { background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0; }
    .details pre { margin: 0; white-space: pre-wrap; font-size: 13px; }
    .actions { background: #e8f5e9; padding: 15px; border-left: 4px solid #52BA63; margin: 20px 0; }
    .actions a { color: #52BA63; text-decoration: none; font-weight: bold; margin-right: 15px; }
    .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📩 Nouvelle Demande - ${formType}</h1>
    </div>
    
    <div class="content">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #52BA63; padding-bottom: 10px;">
        Informations Client
      </h2>
      
      <table class="info-table">
        <tr>
          <td>Entreprise</td>
          <td>${data.companyName || 'N/A'}</td>
        </tr>
        <tr>
          <td>Contact</td>
          <td>${data.contactName || 'N/A'}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td><a href="mailto:${data.email}" style="color: #52BA63;">${data.email || 'N/A'}</a></td>
        </tr>
        <tr>
          <td>Téléphone</td>
          <td><a href="tel:${data.phone}" style="color: #52BA63;">${data.phone || 'N/A'}</a></td>
        </tr>
        <tr>
          <td>Date</td>
          <td>${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}</td>
        </tr>
      </table>
      
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #52BA63; padding-bottom: 10px;">
        Détails de la Demande
      </h2>
      
      <div class="details">
        <pre>${this.formatFormData(data)}</pre>
      </div>
      
      <div class="actions">
        <strong>🎯 Actions rapides:</strong><br>
        <a href="mailto:${data.email}">✉️ Répondre</a>
        <a href="tel:${data.phone}">📞 Appeler</a>
      </div>
      
      <div style="background: #fff3e0; padding: 15px; border-left: 4px solid #FF9800; margin: 20px 0;">
        <strong>⏱️ Délai de réponse:</strong> 24-48h maximum
      </div>
    </div>
    
    <div class="footer">
      <p>Email automatique généré par <strong>digitaenergy.com</strong></p>
      <p>Page d'origine: ${data.pageUrl || window.location.href}</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Formate les données du formulaire
   */
  private formatFormData(data: Record<string, any>): string {
    const lines: string[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (['timestamp', 'pageUrl'].includes(key)) return;
      
      const label = this.formatLabel(key);
      const formattedValue = this.formatValue(value);
      
      if (formattedValue) {
        lines.push(`${label}: ${formattedValue}`);
      }
    });
    
    return lines.join('\n');
  }

  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined || value === '') return '';
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  }

  /**
   * Envoie un email via l'API Route
   */
  async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      console.log('📧 Envoi email via API...', {
        formType: payload.formType,
        to: EMAIL_CONFIG.adminEmail
      });

      // Appeler l'API route qui va utiliser Resend
      // Utilise l'URL actuelle pour supporter tous les ports
      const response = await fetch(`${window.location.origin}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: EMAIL_CONFIG.adminEmail,
          from: `${EMAIL_CONFIG.fromName} <${EMAIL_CONFIG.fromEmail}>`,
          subject: `[DIGITA ENERGY] Nouvelle demande - ${payload.formType}`,
          html: this.generateEmailHTML(payload),
          replyTo: payload.data.email
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur API');
      }

      const result = await response.json();
      console.log('✅ Email envoyé avec succès', result);

      return {
        success: true,
        message: 'Email envoyé avec succès'
      };

    } catch (error: any) {
      console.error('❌ Erreur envoi email:', error);
      
      return {
        success: false,
        message: 'Erreur lors de l\'envoi de l\'email',
        error: error.message || error
      };
    }
  }

  /**
   * Envoie avec retry
   */
  async sendWithRetry(
    payload: EmailPayload,
    maxRetries = 3
  ): Promise<EmailResponse> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.send(payload);
        
        if (result.success) {
          return result;
        }

        if (attempt < maxRetries) {
          console.log(`⏳ Retry ${attempt}/${maxRetries} dans ${attempt}s...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      } catch (error) {
        if (attempt === maxRetries) {
          return {
            success: false,
            message: `Échec après ${maxRetries} tentatives`,
            error
          };
        }
      }
    }

    return {
      success: false,
      message: 'Échec de l\'envoi après plusieurs tentatives'
    };
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validatePhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^[\d+]{8,15}$/.test(cleaned);
  }
}

export const emailService = new EmailService();
export const sendEmail = (payload: EmailPayload) => emailService.send(payload);
export const sendEmailWithRetry = (payload: EmailPayload, retries?: number) => 
  emailService.sendWithRetry(payload, retries);
