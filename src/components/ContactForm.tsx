import { useState } from 'react';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { sendEmailWithRetry } from '../services/emailService';

interface ContactFormProps {
  formType: string;
  onSuccess?: () => void;
  className?: string;
  buttonText?: string;
  children?: React.ReactNode;
}

export function useContactForm(formType: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = async (formData: Record<string, any>) => {
    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);
    
    try {
      const result = await sendEmailWithRetry({
        formType,
        data: {
          ...formData,
          timestamp: new Date().toISOString(),
          pageUrl: window.location.href
        }
      }, 3);

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        return true;
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error('Erreur soumission:', error);
      setShowError(true);
      setErrorMessage(error.message || 'Une erreur est survenue');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    showSuccess,
    showError,
    errorMessage,
    submitForm
  };
}

export function SubmitButton({ isSubmitting, showSuccess, text = "Envoyer la demande" }: {
  isSubmitting: boolean;
  showSuccess: boolean;
  text?: string;
}) {
  if (showSuccess) {
    return (
      <button
        type="button"
        disabled
        className="w-full px-8 py-4 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
      >
        <FaCheckCircle /> Envoyé avec succès !
      </button>
    );
  }

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full px-8 py-4 bg-gradient-to-r from-energy-green to-cyber-blue hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-all flex items-center justify-center gap-2"
    >
      {isSubmitting ? (
        <>
          <FaSpinner className="animate-spin" />
          Envoi en cours...
        </>
      ) : (
        text
      )}
    </button>
  );
}

export function FormFeedback({ showSuccess, showError, errorMessage }: {
  showSuccess: boolean;
  showError: boolean;
  errorMessage?: string;
}) {
  if (showSuccess) {
    return (
      <div className="p-4 bg-green-600/20 border border-green-600 rounded-lg flex items-center gap-3">
        <FaCheckCircle className="text-green-500 text-xl" />
        <div>
          <p className="font-bold">Demande envoyée !</p>
          <p className="text-sm text-white/70">Notre équipe vous contactera sous 24-48h.</p>
        </div>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="p-4 bg-red-600/20 border border-red-600 rounded-lg flex items-center gap-3">
        <FaExclamationTriangle className="text-red-500 text-xl" />
        <div>
          <p className="font-bold">Erreur d'envoi</p>
          <p className="text-sm text-white/70">{errorMessage || 'Veuillez réessayer dans quelques instants.'}</p>
        </div>
      </div>
    );
  }

  return null;
}
