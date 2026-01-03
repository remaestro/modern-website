import { test, expect } from '@playwright/test';

/**
 * Tests d'intégration pour tous les formulaires d'envoi d'email
 * Vérifie que chaque formulaire appelle correctement l'API d'envoi
 */

test.describe('Formulaires d\'envoi Email', () => {
  
  // Configuration commune
  test.beforeEach(async ({ page }) => {
    // Intercepter les appels API pour éviter d'envoyer de vrais emails pendant les tests
    await page.route('**/api/send-email', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Email envoyé' })
      });
    });
  });

  test.describe('Produits & Solutions', () => {
    
    test('Formulaire Transformateurs', async ({ page }) => {
      await page.goto('/modern-website/products/transformers');
      
      // Remplir le formulaire
      await page.fill('input[name="companyName"]', 'Test Company');
      await page.fill('input[name="contactName"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@test.com');
      await page.fill('input[name="phone"]', '+33 6 12 34 56 78');
      await page.selectOption('select[name="transformerType"]', 'distribution');
      await page.fill('input[name="power"]', '500');
      await page.fill('input[name="voltage"]', '20000');
      await page.fill('textarea[name="additionalInfo"]', 'Besoin urgent');
      
      // Attendre l'appel API
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email') && 
        request.method() === 'POST'
      );
      
      // Soumettre
      await page.click('button[type="submit"]');
      
      // Vérifier l'appel
      const request = await apiPromise;
      const postData = request.postDataJSON();
      
      expect(postData.formType).toBe('TRANSFORMER');
      expect(postData.to).toBe('infos@digita-energy.com');
      expect(postData.data.companyName).toBe('Test Company');
      
      // Vérifier le message de succès
      await expect(page.locator('text=Demande envoyée avec succès')).toBeVisible({ timeout: 3000 });
    });

    test('Formulaire Disjoncteurs', async ({ page }) => {
      await page.goto('/modern-website/products/circuit-breakers');
      
      await page.fill('input[name="companyName"]', 'Test Energy Co');
      await page.fill('input[name="contactName"]', 'Jane Smith');
      await page.fill('input[name="email"]', 'jane@test.com');
      await page.fill('input[name="phone"]', '+33 6 98 76 54 32');
      await page.selectOption('select[name="breakerType"]', 'medium_voltage');
      await page.fill('input[name="current"]', '1000');
      await page.fill('input[name="voltage"]', '15000');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      const postData = request.postDataJSON();
      
      expect(postData.formType).toBe('CIRCUIT_BREAKER');
      expect(postData.data.breakerType).toBe('medium_voltage');
    });

    test('Formulaire Câbles', async ({ page }) => {
      await page.goto('/modern-website/products/cables');
      
      await page.fill('input[name="companyName"]', 'Cable Corp');
      await page.fill('input[name="contactName"]', 'Bob Cable');
      await page.fill('input[name="email"]', 'bob@cable.com');
      await page.fill('input[name="phone"]', '+33 6 11 22 33 44');
      await page.selectOption('select[name="cableType"]', 'power');
      await page.fill('input[name="length"]', '1000');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('CABLE');
    });

    test('Formulaire Onduleurs', async ({ page }) => {
      await page.goto('/modern-website/products/inverters');
      
      await page.fill('input[name="companyName"]', 'Solar Inc');
      await page.fill('input[name="contactName"]', 'Solar Sam');
      await page.fill('input[name="email"]', 'sam@solar.com');
      await page.fill('input[name="phone"]', '+33 6 55 66 77 88');
      await page.selectOption('select[name="inverterType"]', 'solar');
      await page.fill('input[name="power"]', '100');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('INVERTER');
    });

    test('Formulaire Groupes Électrogènes', async ({ page }) => {
      await page.goto('/modern-website/products/generators');
      
      await page.fill('input[name="companyName"]', 'Gen Power');
      await page.fill('input[name="contactName"]', 'Gen Gary');
      await page.fill('input[name="email"]', 'gary@genpower.com');
      await page.fill('input[name="phone"]', '+33 6 44 55 66 77');
      await page.selectOption('select[name="generatorType"]', 'diesel');
      await page.fill('input[name="power"]', '500');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('GENERATOR');
    });

    test('Formulaire Batteries', async ({ page }) => {
      await page.goto('/modern-website/products/batteries');
      
      await page.fill('input[name="companyName"]', 'Battery Co');
      await page.fill('input[name="contactName"]', 'Bat Ben');
      await page.fill('input[name="email"]', 'ben@battery.com');
      await page.fill('input[name="phone"]', '+33 6 99 88 77 66');
      await page.selectOption('select[name="batteryType"]', 'lithium');
      await page.fill('input[name="capacity"]', '200');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('BATTERY');
    });
  });

  test.describe('Services', () => {
    
    test('Formulaire Installation', async ({ page }) => {
      await page.goto('/modern-website/services/installation');
      
      await page.fill('input[name="companyName"]', 'Install Co');
      await page.fill('input[name="contactName"]', 'Install Ian');
      await page.fill('input[name="email"]', 'ian@install.com');
      await page.fill('input[name="phone"]', '+33 6 77 88 99 00');
      await page.fill('input[name="projectLocation"]', 'Paris, France');
      await page.fill('textarea[name="projectDescription"]', 'Installation de transformateur');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('INSTALLATION');
    });

    test('Formulaire Maintenance', async ({ page }) => {
      await page.goto('/modern-website/services/maintenance');
      
      await page.fill('input[name="companyName"]', 'Maint Co');
      await page.fill('input[name="contactName"]', 'Maint Mike');
      await page.fill('input[name="email"]', 'mike@maint.com');
      await page.fill('input[name="phone"]', '+33 6 11 22 33 44');
      await page.selectOption('select[name="maintenanceType"]', 'preventive');
      await page.fill('textarea[name="equipmentDetails"]', 'Transformateur 500kVA');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('MAINTENANCE');
    });

    test('Formulaire Conseil', async ({ page }) => {
      await page.goto('/modern-website/services/consulting');
      
      await page.fill('input[name="companyName"]', 'Consult Corp');
      await page.fill('input[name="contactName"]', 'Consult Carol');
      await page.fill('input[name="email"]', 'carol@consult.com');
      await page.fill('input[name="phone"]', '+33 6 55 44 33 22');
      await page.selectOption('select[name="consultingType"]', 'energy_audit');
      await page.fill('textarea[name="projectDetails"]', 'Audit énergétique site industriel');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('CONSULTING');
    });
  });

  test.describe('Services Digitaux', () => {
    
    test('Formulaire Applications Mobiles', async ({ page }) => {
      await page.goto('/modern-website/digital/mobile-apps');
      
      await page.fill('input[name="companyName"]', 'Mobile Inc');
      await page.fill('input[name="contactName"]', 'Mobile Mary');
      await page.fill('input[name="email"]', 'mary@mobile.com');
      await page.fill('input[name="phone"]', '+33 6 99 00 11 22');
      await page.check('input[name="platforms"][value="ios"]');
      await page.check('input[name="platforms"][value="android"]');
      await page.fill('textarea[name="appDescription"]', 'App de monitoring');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('MOBILE_APP');
    });

    test('Formulaire Data Analytics', async ({ page }) => {
      await page.goto('/modern-website/digital/data-analytics');
      
      await page.fill('input[name="companyName"]', 'Data Corp');
      await page.fill('input[name="contactName"]', 'Data Dan');
      await page.fill('input[name="email"]', 'dan@data.com');
      await page.fill('input[name="phone"]', '+33 6 88 77 66 55');
      await page.fill('textarea[name="dataNeeds"]', 'Analyse prédictive');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('DATA_ANALYTICS');
    });

    test('Formulaire IoT', async ({ page }) => {
      await page.goto('/modern-website/digital/iot-solutions');
      
      await page.fill('input[name="companyName"]', 'IoT Inc');
      await page.fill('input[name="contactName"]', 'IoT Iris');
      await page.fill('input[name="email"]', 'iris@iot.com');
      await page.fill('input[name="phone"]', '+33 6 22 33 44 55');
      await page.fill('input[name="deviceCount"]', '100');
      await page.fill('textarea[name="iotNeeds"]', 'Monitoring température');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('IOT');
    });

    test('Formulaire Cloud', async ({ page }) => {
      await page.goto('/modern-website/digital/cloud-integration');
      
      await page.fill('input[name="companyName"]', 'Cloud Co');
      await page.fill('input[name="contactName"]', 'Cloud Chris');
      await page.fill('input[name="email"]', 'chris@cloud.com');
      await page.fill('input[name="phone"]', '+33 6 77 66 55 44');
      await page.selectOption('select[name="cloudProvider"]', 'aws');
      await page.fill('textarea[name="integrationNeeds"]', 'Migration données');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('CLOUD');
    });
  });

  test.describe('Contact Global', () => {
    
    test('Formulaire Contact Principal', async ({ page }) => {
      await page.goto('/modern-website/contact');
      
      await page.fill('input[name="name"]', 'Contact Carl');
      await page.fill('input[name="email"]', 'carl@contact.com');
      await page.fill('input[name="phone"]', '+33 6 11 11 11 11');
      await page.fill('input[name="company"]', 'Contact Corp');
      await page.selectOption('select[name="subject"]', 'information');
      await page.fill('textarea[name="message"]', 'Demande d\'information générale');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('CONTACT');
    });
  });

  test.describe('Wizard de Projet', () => {
    
    test('Wizard complet - Projet Transformateur', async ({ page }) => {
      await page.goto('/modern-website');
      
      // Cliquer sur "Démarrer votre projet"
      await page.click('text=Démarrer votre projet');
      
      // Étape 1: Sélectionner "Produits"
      await page.click('text=Produits & Équipements');
      await page.click('button:has-text("Suivant")');
      
      // Étape 2: Sélectionner "Transformateurs"
      await page.click('text=Transformateurs');
      await page.click('button:has-text("Suivant")');
      
      // Étape 3: Formulaire
      await page.fill('input[name="companyName"]', 'Wizard Co');
      await page.fill('input[name="contactName"]', 'Wizard Will');
      await page.fill('input[name="email"]', 'will@wizard.com');
      await page.fill('input[name="phone"]', '+33 6 99 99 99 99');
      
      const apiPromise = page.waitForRequest(request => 
        request.url().includes('/api/send-email')
      );
      
      await page.click('button[type="submit"]');
      
      const request = await apiPromise;
      expect(request.postDataJSON().formType).toBe('WIZARD_TRANSFORMER');
    });
  });

  test.describe('Gestion d\'erreurs', () => {
    
    test('Erreur réseau - Retry automatique', async ({ page }) => {
      let attempts = 0;
      
      await page.route('**/api/send-email', route => {
        attempts++;
        if (attempts < 3) {
          route.abort('failed');
        } else {
          route.fulfill({
            status: 200,
            body: JSON.stringify({ success: true })
          });
        }
      });
      
      await page.goto('/modern-website/products/transformers');
      
      await page.fill('input[name="companyName"]', 'Test');
      await page.fill('input[name="contactName"]', 'Test');
      await page.fill('input[name="email"]', 'test@test.com');
      await page.fill('input[name="phone"]', '+33 6 00 00 00 00');
      
      await page.click('button[type="submit"]');
      
      // Vérifier que le retry fonctionne
      await expect(page.locator('text=Demande envoyée avec succès')).toBeVisible({ timeout: 10000 });
      expect(attempts).toBeGreaterThanOrEqual(3);
    });

    test('Erreur serveur - Message d\'erreur affiché', async ({ page }) => {
      await page.route('**/api/send-email', route => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Erreur serveur' })
        });
      });
      
      await page.goto('/modern-website/products/transformers');
      
      await page.fill('input[name="companyName"]', 'Test');
      await page.fill('input[name="contactName"]', 'Test');
      await page.fill('input[name="email"]', 'test@test.com');
      await page.fill('input[name="phone"]', '+33 6 00 00 00 00');
      
      await page.click('button[type="submit"]');
      
      // Vérifier le message d'erreur
      await expect(page.locator('text=/erreur/i')).toBeVisible({ timeout: 15000 });
    });
  });
});
