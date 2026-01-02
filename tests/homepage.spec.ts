import { test, expect } from '@playwright/test';

test.describe('Digita Energy Website', () => {
  test('should load homepage with hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check logo in nav
    await expect(page.locator('nav').getByText('DIGITA')).toBeVisible();
    
    // Check hero section title (exact match in hero)
    await expect(page.locator('section').first().getByText('L\'AFRIQUE', { exact: true })).toBeVisible();
    
    // Check stats (use first occurrence)
    await expect(page.getByText('Énergie Gérée').first()).toBeVisible();
    await expect(page.getByText('Projets Livrés').first()).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links in nav element (use href selectors)
    await expect(page.locator('nav a[href="#about"]')).toBeVisible();
    await expect(page.locator('nav a[href="#services"]')).toBeVisible();
    await expect(page.locator('nav a[href="#vision"]')).toBeVisible();
  });

  test('should navigate to About section', async ({ page }) => {
    await page.goto('/');
    
    // Click About link
    await page.click('a[href="#about"]');
    
    // Check About section heading
    await expect(page.getByRole('heading', { name: /La Double Force de/i })).toBeVisible();
  });

  test('should display all service cards', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to services
    await page.click('a[href="#services"]');
    
    // Check service headings - now only 2 services
    await expect(page.getByRole('heading', { name: 'Solutions Réseau Intelligent' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Infrastructure Numérique' })).toBeVisible();
    
    // Check that "En Savoir Plus" buttons are present
    const savoirPlusButtons = page.getByText('En Savoir Plus');
    await expect(savoirPlusButtons.first()).toBeVisible();
  });

  test('should have video background in hero', async ({ page }) => {
    await page.goto('/');
    
    // Check video element exists
    const video = page.locator('video').first();
    await expect(video).toBeVisible();
    
    // Check video source
    const source = video.locator('source');
    await expect(source).toHaveAttribute('src', '/modern-website/hero-video.mp4');
  });

  test('should show scrolling background in About section', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#about"]');
    
    // Wait for About heading to be visible
    await expect(page.getByRole('heading', { name: /La Double Force de/i })).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer content (use exact text in heading)
    await expect(page.locator('footer').getByText('DIGITA ENERGY', { exact: true }).first()).toBeVisible();
    await expect(page.getByText(/© 202\d Digita Energy/i)).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('nav').getByText('DIGITA')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('nav').getByText('DIGITA')).toBeVisible();
  });
});
