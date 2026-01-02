import { test, expect } from '@playwright/test';

test.describe('Products & Services Page', () => {
  test('should load products and services page', async ({ page }) => {
    await page.goto('/products-services');
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Produits & Services/i })).toBeVisible();
    
    // Check navigation
    await expect(page.getByText('DIGITA ENERGY')).toBeVisible();
  });

  test('should display energy section', async ({ page }) => {
    await page.goto('/products-services#energy');
    
    // Wait for energy section
    await expect(page.getByRole('heading', { name: /Produits & Services Énergie/i })).toBeVisible();
    
    // Check for Products and Services cards
    await expect(page.getByRole('heading', { name: 'Produits' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
  });

  test('should display digital section', async ({ page }) => {
    await page.goto('/products-services#digital');
    
    // Wait for digital section
    await expect(page.getByRole('heading', { name: /Services Digitaux/i })).toBeVisible();
    
    // Check for some digital services
    await expect(page.getByText('Cloud & Infrastructure')).toBeVisible();
    await expect(page.getByText('Plateformes IoT')).toBeVisible();
    await expect(page.getByText('Data & Analytics')).toBeVisible();
  });

  test('should have working navigation back to home', async ({ page }) => {
    await page.goto('/products-services');
    
    // Click home link
    await page.click('a[href="/"]');
    
    // Should be back on homepage
    await expect(page.getByText('L\'AFRIQUE')).toBeVisible();
  });
});
