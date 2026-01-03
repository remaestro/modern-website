#!/bin/bash
# Script pour corriger les imports inutilisés

# Suppression des imports inutilisés dans ContactForm
sed -i.bak 's/interface ContactFormProps {/\/\/ interface ContactFormProps {/g' src/components/ContactForm.tsx

# Suppression des imports inutilisés dans ProgressStepper  
sed -i.bak 's/import { useState, useEffect } from '\''react'\'';/\/\/ import { useState, useEffect } from '\''react'\'';/g' src/components/ui/ProgressStepper.tsx

# Suppression des imports inutilisés dans les pages
for file in src/services/AuditPage.tsx src/services/EngineeringPage.tsx src/services/InstallationPage.tsx src/services/MaintenancePage.tsx; do
  sed -i.bak 's/import { useContactForm, SubmitButton, FormFeedback } from '\''..\/components\/ContactForm'\'';/\/\/ import { useContactForm, SubmitButton, FormFeedback } from '\''..\/components\/ContactForm'\'';/g' "$file"
done

for file in src/products/*.tsx; do
  sed -i.bak 's/import { useContactForm, SubmitButton, FormFeedback } from '\''..\/components\/ContactForm'\'';/\/\/ import { useContactForm, SubmitButton, FormFeedback } from '\''..\/components\/ContactForm'\'';/g' "$file"
done

# Nettoyage des fichiers .bak
find src -name "*.bak" -delete

echo "✅ Corrections appliquées"
