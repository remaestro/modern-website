#!/bin/bash

# Fonction pour fixer un fichier produit
fix_product_file() {
  local file=$1
  local formtype=$2
  
  # Sauvegarder l'original
  cp "$file" "${file}.backup"
  
  # Créer le nouveau contenu avec les bons imports
  cat > "$file" << 'EOF'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';
EOF

  # Copier le reste du fichier original (à partir de la function)
  sed -n '/^function /,$p' "${file}.backup" | sed "s/const handleSubmit = (e: React.FormEvent) => {/const { isSubmitting, showSuccess, showError, errorMessage, submitForm } = useContactForm('$formtype');\n\n  const handleSubmit = async (e: React.FormEvent) => {/" >> "$file"
}

echo "Script created"
