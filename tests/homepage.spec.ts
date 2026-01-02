import { test, expect } from '@playwright/test';

test.describe('Digita Energy Website', () => {
  test('should load homepage with hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page.getByText('DIGITA ENERGY')).toBeVisible();
    
    // Check animated text
    await expect(page.getByText('L\'AFRIQUE')).toBeVisible();
    
    // Check stats
    await expect(page.getByText('Énergie Gérée')).toBeVisible();
    await expect(page.getByText('Projets Livrés')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links
    await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Vision' })).toBeVisible();
  });

  test('should navigate to About section', async ({ page }) => {
    await page.goto('/');
    
    // Click About link
    await page.click('a[href="#about"]');
    
    // Check About section is visible
    await expect(page.getByText('La Double Force de')).toBeVisible();
    await expect(page.getByText('l\'Énergie')).toBeVisible();
    await expect(page.getByText('du Digital')).toBeVisible();
  });

  test('should display all service cards', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to services
    await page.click('a[href="#services"]');
    
    // Check service titles
    await expect(page.getByText('Solutions Réseau Intelligent')).toBeVisible();
    await expect(page.getByText('Infrastructure Numérique')).toBeVisible();
    await expect(page.getByText('Intégration Durable')).toBeVisible();
  });

  test('should have video background in hero', async ({ page }) => {
    await page.goto('/');
    
    // Check video element exists
    const video = page.locator('video');
    await expect(video).toBeVisible();
    
    // Check video source
    const source = video.locator('source');
    await expect(source).toHaveAttribute('src', '/modern-website/hero-video.mp4');
  });

  test('should show scrolling background in About section', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#about"]');
    
    // Wait for section to be visible
    await expect(page.getByText('La Double Force de')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer content
    await expect(page.getByText('DIGITA ENERGY')).toBeVisible();
    await expect(page.getByText('© 2024 DIGITA ENERGY')).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.getByText('DIGITA ENERGY')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.getByText('DIGITA ENERGY')).toBeVisible();
  });
});
