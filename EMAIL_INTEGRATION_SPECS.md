# SPÉCIFICATIONS D'INTÉGRATION EMAIL - DIGITA ENERGY
## Système de notification administrateur

---

## 📧 CONFIGURATION GLOBALE

### Destinataire Principal
```
ADMIN_EMAIL = "adioyerm@gmail.com"
```

### Service d'Envoi (Options)
**Option Recommandée : EmailJS** (gratuit, sans backend)
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Pas besoin de backend
- ✅ Templates HTML
- ✅ Protection anti-spam
- ✅ Dashboard de suivi

**Alternative : Formspree** (gratuit jusqu'à 50/mois)
**Alternative : SendGrid API** (100/jour gratuit)

---

## 📋 TEMPLATE EMAIL GÉNÉRAL

```
De: noreply@digitaenergy.com (via EmailJS)
À: adioyerm@gmail.com
Sujet: [DIGITA ENERGY] Nouvelle demande - {TYPE_FORMULAIRE}

========================================
📩 NOUVELLE DEMANDE - {TYPE_FORMULAIRE}
========================================

Date de soumission: {TIMESTAMP}
Page d'origine: {PAGE_URL}
Type de demande: {CATEGORY}

-----------------------------------
📋 INFORMATIONS CLIENT
-----------------------------------
Entreprise: {COMPANY_NAME}
Nom du contact: {CONTACT_NAME}
Email: {EMAIL}
Téléphone: {PHONE}

-----------------------------------
📝 DÉTAILS DE LA DEMANDE
-----------------------------------
{SPECIFIC_FIELDS}

-----------------------------------
🎯 PROCHAINES ÉTAPES
-----------------------------------
1. Accuser réception sous 4h
2. Qualifier la demande
3. Préparer offre/devis
4. Rappeler client sous 24-48h

-----------------------------------
🔗 ACTIONS RAPIDES
-----------------------------------
Répondre: mailto:{EMAIL}
Appeler: tel:{PHONE}
Voir tableau de bord: {DASHBOARD_URL}

========================================
Cet email a été généré automatiquement
par le site www.digitaenergy.com
========================================
```

---

## 🏭 FORMULAIRES PRODUITS (5 types)

### 1. TRANSFORMATEURS (`/products/transformers`)

#### Données à collecter
```typescript
interface TransformerRequest {
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  
  // Metadata
  timestamp: Date;
  pageUrl: string;
  formType: 'TRANSFORMATEUR';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Transformateur - {companyName}

DÉTAILS DE LA DEMANDE:
Message du client:
{message}

TYPE DE PRODUIT: Transformateurs HT/MT/BT
```

#### Code d'envoi
```typescript
const sendTransformerRequest = async (data: TransformerRequest) => {
  const emailParams = {
    to_email: 'adioyerm@gmail.com',
    from_name: data.contactName,
    from_company: data.companyName,
    from_email: data.email,
    from_phone: data.phone,
    product_type: 'Transformateurs HT/MT/BT',
    message: data.message,
    timestamp: new Date().toLocaleString('fr-FR'),
    page_url: window.location.href
  };
  
  await emailjs.send('service_id', 'template_transformer', emailParams);
};
```

---

### 2. POSTES SOURCES (`/products/source-substations`)

#### Données à collecter
```typescript
interface SourceSubstationRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Date;
  pageUrl: string;
  formType: 'POSTE_SOURCE';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Poste Source HT/MT - {companyName}

DÉTAILS:
{message}

TYPE: Postes Sources HT/MT
```

---

### 3. POSTES DISTRIBUTION (`/products/distribution-posts`)

#### Données à collecter
```typescript
interface DistributionPostRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Date;
  formType: 'POSTE_DISTRIBUTION';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Poste Distribution - {companyName}

TYPE: Postes de Distribution
MESSAGE: {message}
```

---

### 4. SCADA (`/products/scada`)

#### Données à collecter
```typescript
interface SCADARequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Date;
  formType: 'SCADA';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande SCADA & Supervision - {companyName}

TYPE: Système SCADA
MESSAGE: {message}
```

---

### 5. PROTECTION (`/products/protection`)

#### Données à collecter
```typescript
interface ProtectionRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Date;
  formType: 'PROTECTION';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Système Protection - {companyName}

TYPE: Systèmes de Protection
MESSAGE: {message}
```

---

## 🔧 FORMULAIRES SERVICES (4 types)

### 1. ENGINEERING (`/services/engineering`)

#### Données à collecter (Formulaire multi-étapes)
```typescript
interface EngineeringRequest {
  // Step 1
  projectType: string;           // Ex: "Nouveau projet"
  urgency: string;               // Ex: "Urgent"
  budgetRange: string;           // Ex: "$100K-$500K"
  
  // Step 2
  voltageLevel: string[];        // Ex: ["HT", "MT"]
  scope: string;                 // Ex: "Étude complète"
  powerCapacity: string;         // Ex: "10 MVA"
  infrastructureType: string;    // Ex: "Industriel"
  
  // Step 3
  studies: string[];             // Ex: ["Faisabilité", "Conception"]
  
  // Step 4
  location: string;              // Ex: "Paris, France"
  constraints: string[];         // Ex: ["Urbain", "Espace limité"]
  standards: string;             // Ex: "NF C13-100"
  additionalNotes: string;
  
  // Step 5
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  deliveryDate: string;          // Ex: "Q2 2026"
  contactPreference: string;     // Ex: "email"
  
  // Metadata
  timestamp: Date;
  formType: 'ENGINEERING';
  savedToLocalStorage: boolean;
}
```

#### Template Email Détaillé
```
SUJET: [DIGITA] Demande Engineering - {projectType} - {companyName}

========================================
PROJET D'ENGINEERING
========================================

TYPE DE PROJET: {projectType}
URGENCE: {urgency}
BUDGET: {budgetRange}

-----------------------------------
CARACTÉRISTIQUES TECHNIQUES
-----------------------------------
Niveaux de tension: {voltageLevel.join(', ')}
Périmètre: {scope}
Puissance: {powerCapacity}
Type infrastructure: {infrastructureType}

-----------------------------------
ÉTUDES SOUHAITÉES
-----------------------------------
{studies.map(s => '✓ ' + s).join('\n')}

-----------------------------------
CONTEXTE & CONTRAINTES
-----------------------------------
Localisation: {location}
Contraintes: {constraints.join(', ')}
Normes applicables: {standards}

Notes additionnelles:
{additionalNotes}

-----------------------------------
PLANNING
-----------------------------------
Date de livraison souhaitée: {deliveryDate}
Préférence de contact: {contactPreference}

-----------------------------------
PROCHAINES ÉTAPES SUGGÉRÉES
-----------------------------------
1. Appel de qualification (30 min)
2. Visite site si nécessaire
3. Proposition d'études (devis)
4. Kick-off meeting
```

---

### 2. INSTALLATION (`/services/installation`)

#### Données à collecter
```typescript
interface InstallationRequest {
  // Projet
  projectName: string;
  equipmentType: string[];       // Ex: ["Transformateurs", "SCADA"]
  installationScope: string;     // Ex: "Installation complète"
  
  // Site
  siteLocation: string;
  siteAccess: string;            // Ex: "Facile"
  powerShutdown: string;         // Ex: "Prévu"
  localTeam: string;             // Ex: "Disponible"
  
  // Planning
  preferredMonth: string;        // Ex: "2026-03"
  preferredWeek: string;         // Ex: "week2"
  duration: string;              // Ex: "2-4 semaines"
  urgency: string;               // Ex: "normal"
  preSiteVisit: boolean;
  
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  additionalNotes: string;
  
  timestamp: Date;
  formType: 'INSTALLATION';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Installation - {projectName} - {companyName}

========================================
INSTALLATION & COMMISSIONING
========================================

PROJET: {projectName}
ÉQUIPEMENTS: {equipmentType.join(', ')}
PÉRIMÈTRE: {installationScope}

-----------------------------------
SITE
-----------------------------------
Localisation: {siteLocation}
Accès: {siteAccess}
Coupure électrique: {powerShutdown}
Équipe locale: {localTeam}

-----------------------------------
PLANNING
-----------------------------------
Mois souhaité: {preferredMonth}
Semaine: {preferredWeek}
Durée estimée: {duration}
Urgence: {urgency}
Visite préalable: {preSiteVisit ? 'OUI' : 'NON'}

NOTES:
{additionalNotes}
```

---

### 3. MAINTENANCE (`/services/maintenance`)

#### Données à collecter
```typescript
interface MaintenanceRequest {
  // Step 1
  maintenanceType: string;       // Ex: "Préventive"
  urgency: string;               // Ex: "Planifiée"
  contractType: string;          // Ex: "Annuel"
  
  // Step 2
  equipmentType: string[];       // Ex: ["Transformateurs", "SCADA"]
  voltageLevel: string;          // Ex: "MT"
  quantity: string;              // Ex: "5 transformateurs"
  
  // Step 3
  frequency: string;             // Ex: "Trimestrielle"
  preferredSchedule: string;     // Ex: "Weekend"
  
  // Step 4
  location: string;
  accessConstraints: string[];   // Ex: ["Site isolé", "Autorisation"]
  additionalNotes: string;
  
  // Step 5
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  startDate: string;
  contactPreference: string;
  
  timestamp: Date;
  formType: 'MAINTENANCE';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Maintenance {maintenanceType} - {companyName}

========================================
CONTRAT DE MAINTENANCE
========================================

TYPE: {maintenanceType}
URGENCE: {urgency}
CONTRAT: {contractType}

-----------------------------------
ÉQUIPEMENTS
-----------------------------------
Types: {equipmentType.join(', ')}
Niveau tension: {voltageLevel}
Quantité: {quantity}

-----------------------------------
FRÉQUENCE & PLANNING
-----------------------------------
Fréquence: {frequency}
Créneau préféré: {preferredSchedule}
Date début souhaitée: {startDate}

-----------------------------------
SITE
-----------------------------------
Localisation: {location}
Contraintes accès: {accessConstraints.join(', ')}

NOTES:
{additionalNotes}

-----------------------------------
PROPOSITION COMMERCIALE
-----------------------------------
☐ Devis maintenance préventive
☐ Contrat annuel/pluriannuel
☐ SLA proposé
☐ Calendrier interventions
```

---

### 4. AUDIT (`/services/audit`)

#### Données à collecter (Quiz + Contact)
```typescript
interface AuditRequest {
  // Quiz Results (10 questions)
  quizAnswers: Record<string, number>;
  totalScore: number;           // 0-100
  maturityLevel: string;        // Ex: "Moyen"
  potentialSavings: string;     // Ex: "25-40%"
  
  // Calculated insights
  criticalIssues: string[];     // Auto-detected from quiz
  recommendations: string[];
  
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  timestamp: Date;
  formType: 'AUDIT';
}
```

#### Template Email
```
SUJET: [DIGITA] Demande Audit - Score: {totalScore}/100 - {companyName}

========================================
AUDIT & OPTIMISATION
========================================

SCORE DE MATURITÉ: {totalScore}/100
NIVEAU: {maturityLevel}
ÉCONOMIES POTENTIELLES: {potentialSavings}

-----------------------------------
RÉSULTATS QUIZ (10 questions)
-----------------------------------
{Object.entries(quizAnswers).map(([q, score]) => 
  `${q}: ${score}/15 points`
).join('\n')}

-----------------------------------
PROBLÈMES CRITIQUES DÉTECTÉS
-----------------------------------
{criticalIssues.map(issue => '⚠️ ' + issue).join('\n')}

-----------------------------------
RECOMMANDATIONS PRIORITAIRES
-----------------------------------
{recommendations.map((rec, i) => `${i+1}. ${rec}`).join('\n')}

-----------------------------------
PROPOSITION
-----------------------------------
☐ Audit gratuit sur site (4h)
☐ Rapport détaillé
☐ Plan d'optimisation
☐ Estimation ROI

⏱️ URGENT: Client a demandé audit gratuit
```

---

## 💻 FORMULAIRES SERVICES DIGITAUX (4 types)

### 1. CLOUD & INFRASTRUCTURE (`/digital/cloud-infrastructure`)

#### Données à collecter
```typescript
interface CloudInfraRequest {
  // Step 1: État des lieux
  infrastructure: string;        // Ex: "hybrid"
  serverCount: string;           // Ex: "25"
  monthlyBudget: string;         // Ex: "$5K-$20K"
  problems: string[];            // Ex: ["Coûts élevés", "Scalabilité"]
  objectives: {                  // Ratings 1-5
    cost: number;
    scalability: number;
    availability: number;
    security: number;
    innovation: number;
  };
  
  // Step 2: Profil de charge
  requestsPerDay: string;        // Ex: "1,000,000"
  dataVolume: string;            // Ex: "50 TB"
  compliance: string[];          // Ex: ["GDPR", "ISO 27001"]
  techStack: string;             // Ex: "Node.js, React, PostgreSQL"
  
  // Step 3: Roadmap & Budget
  timeline: string;              // Ex: "3-6months"
  devopsCount: string;           // Ex: "2"
  trainingBudget: string;        // Ex: "$5K-$20K"
  
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  // Calculated Results
  maturityScore: number;         // 0-100
  maturityLevel: string;         // Ex: "Avancé"
  potentialSavings: string;      // Ex: "20-30%"
  
  timestamp: Date;
  formType: 'CLOUD_INFRASTRUCTURE';
}
```

#### Template Email
```
SUJET: [DIGITA DIGITAL] Audit Cloud - Score: {maturityScore}/100 - {companyName}

========================================
CLOUD & INFRASTRUCTURE
========================================

SCORE MATURITÉ CLOUD: {maturityScore}/100
NIVEAU: {maturityLevel}
ÉCONOMIES POTENTIELLES: {potentialSavings}

-----------------------------------
INFRASTRUCTURE ACTUELLE
-----------------------------------
Type: {infrastructure}
Serveurs/VMs: {serverCount}
Budget mensuel: {monthlyBudget}
Équipe DevOps: {devopsCount} engineers

Problèmes identifiés:
{problems.map(p => '• ' + p).join('\n')}

-----------------------------------
OBJECTIFS PRIORISÉS (1-5)
-----------------------------------
Réduction coûts: {objectives.cost}/5
Scalabilité: {objectives.scalability}/5
Haute dispo: {objectives.availability}/5
Sécurité: {objectives.security}/5
Innovation: {objectives.innovation}/5

-----------------------------------
PROFIL DE CHARGE
-----------------------------------
Requêtes/jour: {requestsPerDay}
Volume données: {dataVolume}
Stack technique: {techStack}
Conformité: {compliance.join(', ')}

-----------------------------------
ROADMAP
-----------------------------------
Timeline: {timeline}
Budget formation: {trainingBudget}

-----------------------------------
LIVRABLES À PRÉPARER
-----------------------------------
☐ Architecture Cloud recommandée (diagrammes)
☐ Plan de migration (phases)
☐ Estimation budgétaire détaillée
☐ Analyse coûts actuels vs cloud
☐ Timeline de migration (Gantt)
☐ Formation DevOps recommandée

📄 URGENT: Préparer rapport PDF personnalisé
```

---

### 2. PLATEFORME IoT (`/digital/iot-platform`)

#### Données à collecter
```typescript
interface IoTPlatformRequest {
  // Step 1: Use Case & Échelle
  sector: string;                     // Ex: "energy"
  sensorTypes: string[];              // Ex: ["temperature", "energy"]
  sensorQuantities: Record<string, number>;  // Ex: {temperature: 50, energy: 20}
  dataFrequency: string;              // Ex: "realtime"
  connectivity: string[];             // Ex: ["WiFi", "4G/5G"]
  
  // Step 2: Architecture
  processingLocation: string;         // Ex: "hybrid"
  analyticsNeeds: string[];           // Ex: ["Dashboard temps réel", "ML"]
  integrations: string[];             // Ex: ["ERP existant", "APIs"]
  environmentalConstraints: string[]; // Ex: ["industrial", "outdoor"]
  
  // Step 3: Sécurité
  securityLevel: string;              // Ex: "high"
  compliance: string[];               // Ex: ["GDPR", "ISO 27001"]
  
  // Step 4: Déploiement
  pilotSites: string;                 // Ex: "3 sites, 50 capteurs"
  fullDeployment: string;             // Ex: "50 sites, EMEA"
  timeline: string;                   // Ex: "6-12 mois"
  slaLevel: string;                   // Ex: "99.9"
  
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  // Calculated
  totalSensors: number;               // Calculé
  estimatedCosts: {
    hardware: number;
    cloud: number;
    development: number;
    total: number;
  };
  
  timestamp: Date;
  formType: 'IOT_PLATFORM';
}
```

#### Template Email
```
SUJET: [DIGITA DIGITAL] Plateforme IoT - {totalSensors} capteurs - {companyName}

========================================
PLATEFORME IoT
========================================

SECTEUR: {sector}
CAPTEURS TOTAUX: {totalSensors} unités

-----------------------------------
ARCHITECTURE
-----------------------------------
Types de capteurs: {sensorTypes.join(', ')}
Détail quantités:
{Object.entries(sensorQuantities).map(([type, qty]) => 
  `  • ${type}: ${qty} unités`
).join('\n')}

Fréquence collecte: {dataFrequency}
Connectivité: {connectivity.join(', ')}
Traitement: {processingLocation}

-----------------------------------
ANALYTICS & INTÉGRATIONS
-----------------------------------
Besoins analytics:
{analyticsNeeds.map(n => '✓ ' + n).join('\n')}

Intégrations:
{integrations.map(i => '• ' + i).join('\n')}

-----------------------------------
SÉCURITÉ & CONFORMITÉ
-----------------------------------
Niveau sécurité: {securityLevel}
Conformité: {compliance.join(', ')}
Contraintes environnement: {environmentalConstraints.join(', ')}

-----------------------------------
DÉPLOIEMENT
-----------------------------------
Pilote: {pilotSites}
Déploiement complet: {fullDeployment}
Timeline: {timeline}
SLA: {slaLevel}%

-----------------------------------
ESTIMATION TCO (Total Cost Ownership)
-----------------------------------
Hardware (capteurs): ${estimatedCosts.hardware.toLocaleString()}
Cloud (an 1): ${estimatedCosts.cloud * 12.toLocaleString()} (${estimatedCosts.cloud}/mois)
Développement: ${estimatedCosts.development.toLocaleString()}
───────────────────────────
TOTAL AN 1: ${estimatedCosts.total.toLocaleString()}

-----------------------------------
LIVRABLES À PRÉPARER
-----------------------------------
☐ Architecture IoT personnalisée (schémas)
☐ Dataflow diagram (devices→edge→cloud)
☐ Dashboard mockup
☐ Calculateur TCO détaillé (5 ans)
☐ ROI estimé avec graphiques
☐ Proposition PoC gratuit

📊 URGENT: Préparer proposition technique visuelle
```

---

### 3. DATA & ANALYTICS (`/digital/data-analytics`)

#### Données à collecter
```typescript
interface DataAnalyticsRequest {
  // Step 1: État des données
  dataSources: string[];              // Ex: ["Bases SQL", "APIs", "IoT"]
  dataVolumes: Record<string, string>; // Par source
  dataGrowth: string;                 // Ex: "15%/an"
  dataQuality: {                      // Ratings 1-5
    completeness: number;
    accuracy: number;
    consistency: number;
    freshness: number;
    documentation: number;
  };
  currentAccess: string[];            // Ex: ["Direction", "Analystes"]
  reportDelay: string;                // Ex: "1-7 jours"
  
  // Step 2: Objectifs Analytics
  useCases: {                         // Ratings 1-5
    reporting: number;
    predictive: number;
    anomaly: number;
    optimization: number;
    customer: number;
  };
  users: {
    exec: string;                     // Nombre
    manager: string;
    analyst: string;
    ops: string;
  };
  refreshFrequency: string;           // Ex: "Temps réel"
  
  // Step 3: Infrastructure & Équipe
  infrastructure: string;             // Ex: "Cloud (AWS)"
  existingTools: string[];            // Ex: ["Tableau", "dbt"]
  teamSize: {
    engineers: string;
    analysts: string;
    scientists: string;
  };
  governance: string;                 // Ex: "yes"/"partial"/"no"
  compliance: string[];               // Ex: ["GDPR", "SOC 2"]
  
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  // Calculated
  maturityScore: number;              // 0-100
  maturityLevel: {
    level: number;                    // 1-5
    name: string;                     // Ex: "Defined"
    desc: string;                     // Ex: "Entrepôt centralisé"
  };
  
  timestamp: Date;
  formType: 'DATA_ANALYTICS';
}
```

#### Template Email
```
SUJET: [DIGITA DIGITAL] Data Analytics - Niveau {maturityLevel.level}/5 - {companyName}

========================================
DATA & ANALYTICS
========================================

SCORE MATURITÉ: {maturityScore}/100
NIVEAU: {maturityLevel.name} (Niveau {maturityLevel.level}/5)
"{maturityLevel.desc}"

-----------------------------------
ÉTAT ACTUEL DES DONNÉES
-----------------------------------
Sources: {dataSources.join(', ')}
Croissance: {dataGrowth}
Délai rapports: {reportDelay}
Accès: {currentAccess.join(', ')}

Qualité des données (1-5):
  Complétude: {dataQuality.completeness}/5
  Exactitude: {dataQuality.accuracy}/5
  Cohérence: {dataQuality.consistency}/5
  Fraîcheur: {dataQuality.freshness}/5
  Documentation: {dataQuality.documentation}/5

-----------------------------------
OBJECTIFS ANALYTICS PRIORISÉS
-----------------------------------
Reporting opérationnel: {useCases.reporting}/5
Analytics prédictif: {useCases.predictive}/5
Détection anomalies: {useCases.anomaly}/5
Optimisation: {useCases.optimization}/5
Analyse client: {useCases.customer}/5

-----------------------------------
UTILISATEURS
-----------------------------------
Executives: {users.exec}
Managers: {users.manager}
Analystes: {users.analyst}
Opérationnels: {users.ops}
TOTAL: {parseInt(users.exec||0) + parseInt(users.manager||0) + parseInt(users.analyst||0) + parseInt(users.ops||0)}

Fréquence rafraîchissement: {refreshFrequency}

-----------------------------------
INFRASTRUCTURE & ÉQUIPE
-----------------------------------
Infrastructure: {infrastructure}
Outils existants: {existingTools.join(', ')}

Équipe Data:
  Data Engineers: {teamSize.engineers}
  Data Analysts: {teamSize.analysts}
  Data Scientists: {teamSize.scientists}

Gouvernance: {governance}
Conformité: {compliance.join(', ')}

-----------------------------------
LIVRABLES À PRÉPARER
-----------------------------------
☐ Architecture Data proposée (diagramme complet)
  Sources → Ingestion → Storage → Processing → Consumption
☐ Technologies recommandées par niveau
☐ Roadmap par phases:
  - Phase 1 (6 mois): Quick wins
  - Phase 2 (12 mois): Fondations
  - Phase 3 (24 mois): Advanced analytics & AI/ML
☐ Estimation budgétaire:
  - One-time (setup, migration)
  - Recurring (cloud, licences, support)
  - Personnel (interne vs externe)
☐ Plan de montée en compétences

📈 URGENT: Préparer rapport maturité data détaillé
```

---

### 4. APPLICATIONS MOBILES (`/digital/mobile-apps`)

#### Données (Page Coming Soon - Notification simple)
```typescript
interface MobileAppNotification {
  email: string;
  timestamp: Date;
  formType: 'MOBILE_APP_NOTIFICATION';
}
```

#### Template Email
```
SUJET: [DIGITA DIGITAL] Notification lancement Apps Mobiles - {email}

========================================
INTÉRÊT APPLICATIONS MOBILES
========================================

Email: {email}
Date: {timestamp}

⚠️ Note: Prospect intéressé par le configurateur d'apps mobiles
Relancer quand le service sera disponible.

-----------------------------------
TODO
-----------------------------------
☐ Ajouter à liste CRM "Mobile Apps - En attente"
☐ Envoyer notification quand service disponible
```

---

## 🎯 WIZARD DE PROJET (`ProjectWizard.tsx`)

#### Données à collecter
```typescript
interface WizardSubmission {
  // Réponses
  needType: string;              // Ex: "energy" / "digital" / "both"
  priority: string;              // Ex: "new" / "upgrade" / "optimize" / "maintain"
  
  // Solutions recommandées
  recommendationKey: string;     // Ex: "energy-new"
  recommendedSolutions: Array<{
    name: string;
    url: string;
  }>;
  
  // Metadata
  timestamp: Date;
  sessionId: string;             // Unique session ID
  formType: 'PROJECT_WIZARD';
}
```

#### Template Email (Analytics)
```
SUJET: [DIGITA] Wizard Projet complété - {needType} + {priority}

========================================
PARCOURS WIZARD
========================================

Type besoin: {needType}
Priorité: {priority}
Recommandation: {recommendationKey}

-----------------------------------
SOLUTIONS RECOMMANDÉES
-----------------------------------
{recommendedSolutions.map(s => `• ${s.name} (${s.url})`).join('\n')}

-----------------------------------
ANALYSE
-----------------------------------
⚠️ Note: Prospect a complété le wizard mais n'a PAS rempli de formulaire
Action: Suivre s'il clique sur une des solutions recommandées

Session ID: {sessionId}
```

---

## 🔧 IMPLÉMENTATION TECHNIQUE

### Stack Recommandée

#### Option 1: EmailJS (Recommandé - Sans Backend)
```bash
npm install @emailjs/browser
```

```typescript
// src/config/email.ts
export const EMAIL_CONFIG = {
  serviceId: 'service_xxxxxxx',
  publicKey: 'your_public_key',
  adminEmail: 'adioyerm@gmail.com',
  templates: {
    transformer: 'template_transformer',
    source_substation: 'template_source',
    distribution_post: 'template_distribution',
    scada: 'template_scada',
    protection: 'template_protection',
    engineering: 'template_engineering',
    installation: 'template_installation',
    maintenance: 'template_maintenance',
    audit: 'template_audit',
    cloud: 'template_cloud',
    iot: 'template_iot',
    data_analytics: 'template_data',
    mobile_app: 'template_mobile'
  }
};
```

#### Service Email Universel
```typescript
// src/services/emailService.ts
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';

export interface EmailPayload {
  formType: string;
  data: Record<string, any>;
}

export const sendEmail = async (payload: EmailPayload): Promise<boolean> => {
  try {
    const templateId = EMAIL_CONFIG.templates[payload.formType.toLowerCase()];
    
    const emailParams = {
      to_email: EMAIL_CONFIG.adminEmail,
      from_name: payload.data.contactName || 'Client',
      from_company: payload.data.companyName || 'N/A',
      from_email: payload.data.email || 'non fourni',
      from_phone: payload.data.phone || 'non fourni',
      timestamp: new Date().toLocaleString('fr-FR'),
      page_url: window.location.href,
      form_type: payload.formType,
      form_data: JSON.stringify(payload.data, null, 2)
    };
    
    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      templateId,
      emailParams,
      EMAIL_CONFIG.publicKey
    );
    
    if (response.status === 200) {
      console.log('✅ Email envoyé avec succès', response);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    throw error;
  }
};

// Fonction spécifique avec retry
export const sendEmailWithRetry = async (
  payload: EmailPayload, 
  maxRetries = 3
): Promise<boolean> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sendEmail(payload);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return false;
};
```

---

### Exemple d'intégration dans un formulaire

```typescript
// Dans TransformersPage.tsx
import { sendEmailWithRetry } from '../services/emailService';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Loading state
    setIsSubmitting(true);
    
    // Envoyer email
    const success = await sendEmailWithRetry({
      formType: 'TRANSFORMER',
      data: {
        ...formData,
        timestamp: new Date().toISOString(),
        pageUrl: window.location.href
      }
    });
    
    if (success) {
      // Success state
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          form_type: 'transformer',
          company: formData.companyName
        });
      }
    }
  } catch (error) {
    console.error('Erreur soumission:', error);
    setShowError(true);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### Templates EmailJS à Créer

Pour chaque type de formulaire, créer un template dans le dashboard EmailJS:

#### Template Général
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  <div style="background: #1a1a1a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; color: #52BA63;">📩 Nouvelle Demande - {{form_type}}</h1>
  </div>
  
  <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1a1a1a; border-bottom: 2px solid #52BA63; padding-bottom: 10px;">
      Informations Client
    </h2>
    
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px; font-weight: bold; width: 150px;">Entreprise:</td>
        <td style="padding: 8px;">{{from_company}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Contact:</td>
        <td style="padding: 8px;">{{from_name}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">
          <a href="mailto:{{from_email}}" style="color: #52BA63;">{{from_email}}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Téléphone:</td>
        <td style="padding: 8px;">
          <a href="tel:{{from_phone}}" style="color: #52BA63;">{{from_phone}}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Date:</td>
        <td style="padding: 8px;">{{timestamp}}</td>
      </tr>
    </table>
    
    <h2 style="color: #1a1a1a; border-bottom: 2px solid #52BA63; padding-bottom: 10px; margin-top: 30px;">
      Détails de la Demande
    </h2>
    
    <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px;">{{form_data}}</pre>
    
    <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-left: 4px solid #52BA63;">
      <strong>🎯 Actions Rapides:</strong><br>
      <a href="mailto:{{from_email}}" style="color: #52BA63; margin-right: 20px;">✉️ Répondre</a>
      <a href="tel:{{from_phone}}" style="color: #52BA63;">📞 Appeler</a>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #fff3e0; border-left: 4px solid #FF9800;">
      <strong>⏱️ Délai de réponse:</strong> 24-48h maximum
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
    <p>Email automatique généré par www.digitaenergy.com</p>
    <p>Page d'origine: {{page_url}}</p>
  </div>
</div>
```

---

## 📊 DASHBOARD ADMIN (Futur)

### Données à tracker dans une DB (optionnel)

```typescript
interface SubmissionLog {
  id: string;
  timestamp: Date;
  formType: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'pending' | 'contacted' | 'quoted' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedValue: number;
  source: 'website' | 'wizard' | 'direct';
  pageUrl: string;
  ipAddress: string;
  userAgent: string;
  rawData: Record<string, any>;
}
```

---

## 🔐 SÉCURITÉ & SPAM PROTECTION

### Mesures à implémenter

1. **Rate Limiting**
```typescript
// Max 3 soumissions par IP par heure
const rateLimiter = new Map<string, number[]>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const hour = 60 * 60 * 1000;
  
  if (!rateLimiter.has(ip)) {
    rateLimiter.set(ip, [now]);
    return true;
  }
  
  const timestamps = rateLimiter.get(ip)!.filter(t => now - t < hour);
  
  if (timestamps.length >= 3) {
    return false; // Rate limited
  }
  
  timestamps.push(now);
  rateLimiter.set(ip, timestamps);
  return true;
};
```

2. **Honeypot Field** (invisible pour humains)
```tsx
<input 
  type="text" 
  name="website" 
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

3. **Validation Frontend**
```typescript
import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^[\d\s\+\-\(\)]+$/, 'Téléphone invalide'),
  companyName: z.string().min(2, 'Nom trop court'),
  message: z.string().max(2000, 'Message trop long')
});
```

---

## 📈 ANALYTICS & TRACKING

### Events à tracker (Google Analytics / Mixpanel)

```typescript
// Track form start
gtag('event', 'form_start', {
  form_type: 'transformer',
  page_path: window.location.pathname
});

// Track form completion
gtag('event', 'form_submit', {
  form_type: 'transformer',
  company: formData.companyName,
  value: estimatedValue  // Si calculé
});

// Track wizard completion
gtag('event', 'wizard_complete', {
  need_type: answers[0],
  priority: answers[1],
  recommendation: recommendationKey
});

// Track email send success
gtag('event', 'email_sent', {
  form_type: 'transformer',
  status: 'success'
});
```

---

## 🧪 TESTING

### Tests à effectuer

1. **Test d'envoi email**
```typescript
// Test avec EmailJS
emailjs.send(
  'service_id',
  'template_test',
  { test: 'hello' },
  'public_key'
).then(console.log).catch(console.error);
```

2. **Test validation**
```typescript
describe('Contact Form', () => {
  it('validates email format', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('valid@email.com')).toBe(true);
  });
  
  it('prevents spam', () => {
    // Test honeypot
    // Test rate limit
  });
});
```

---

## 📋 CHECKLIST IMPLÉMENTATION

### Phase 1: Setup (1-2h)
- [ ] Créer compte EmailJS
- [ ] Configurer service email
- [ ] Créer templates pour chaque type
- [ ] Installer `@emailjs/browser`
- [ ] Créer `src/config/email.ts`
- [ ] Créer `src/services/emailService.ts`

### Phase 2: Intégration Formulaires Produits (2-3h)
- [ ] TransformersPage
- [ ] SourceSubstationsPage
- [ ] DistributionPostsPage
- [ ] SCADAPage
- [ ] ProtectionPage

### Phase 3: Intégration Services (3-4h)
- [ ] EngineeringPage
- [ ] InstallationPage
- [ ] MaintenancePage
- [ ] AuditPage

### Phase 4: Intégration Digital (2-3h)
- [ ] CloudInfrastructurePage
- [ ] IoTPlatformPage
- [ ] DataAnalyticsPage
- [ ] MobileAppsPage

### Phase 5: Testing & Validation (1-2h)
- [ ] Test chaque formulaire
- [ ] Vérifier emails reçus
- [ ] Tester cas d'erreur
- [ ] Validation UX

### Phase 6: Monitoring (1h)
- [ ] Setup Google Analytics events
- [ ] Dashboard EmailJS
- [ ] Alertes si email fail

---

## 💰 COÛTS

### EmailJS (Recommandé)
- **Gratuit**: 200 emails/mois
- **Personnel**: 6€/mois (1000 emails)
- **Pro**: 15€/mois (3000 emails)

### Formspree
- **Gratuit**: 50 emails/mois
- **Gold**: 10$/mois (1000 emails)

### SendGrid
- **Gratuit**: 100 emails/jour
- **Essentials**: 15$/mois (40K emails)

---

## 🎯 RÉSUMÉ TECHNIQUE

**Total de types d'emails**: 14 templates différents
**Total de champs à collecter**: ~150 champs uniques
**Estimation temps implémentation**: 10-15h
**Coût mensuel**: 0€ (gratuit) ou 6€/mois si >200 soumissions

---

**Prêt pour implémentation !** 🚀
