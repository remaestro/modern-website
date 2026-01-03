// Configuration Email - Digita Energy avec Resend
export const EMAIL_CONFIG = {
  // Resend API Key (depuis https://resend.com/api-keys)
  resendApiKey: import.meta.env.VITE_RESEND_API_KEY || '',
  
  // Destinataire principal
  adminEmail: 'infos@digita-energy.com',
  
  // Email expéditeur (utiliser onboarding@resend.dev pour les tests)
  fromEmail: 'onboarding@resend.dev',
  fromName: 'Digita Energy',
  
  // Pour développement, utiliser l'email de test Resend
  devEmail: 'delivered@resend.dev'
};

// Contact Information
export const CONTACT_INFO = {
  email: 'contact@digitaenergy.com',
  phone: '+33 1 XX XX XX XX', // À compléter
  address: '123 Rue Example, 75001 Paris', // À compléter
  socialMedia: {
    linkedin: 'https://linkedin.com/company/digitaenergy',
    twitter: 'https://twitter.com/digitaenergy'
  }
};
