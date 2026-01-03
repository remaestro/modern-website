import { test, expect } from '@playwright/test';

/**
 * Tests UNIQUEMENT pour les formulaires existants
 * - ContactForm (page d'accueil)
 * - TransformersPage
 */

test.describe('Formulaires Email Existants', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock API
    await page.route('**/api/send-email', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
  });

  test('Contact Form Homepage', async ({ page }) => {
    await page.goto('/modern-website/');
    
    // Scroll to contact
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Wait for form
    await page.waitForSelector('input[name="name"]');
    
    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '+33612345678');
    await page.fill('textarea[name="message"]', 'Message de test');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Check success (wait for any success indication)
    await page.waitForTimeout(2000);
  });

  test('Transformers Page Quote Form', async ({ page }) => {
    await page.goto('/modern-website/products/transformers');
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    
    // Wait for form
    await page.waitForSelector('input[name="company"]', { timeout: 10000 });
    
    // Fill form
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('input[name="contact"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@test.com');
    await page.fill('input[name="phone"]', '+33698765432');
    
    // Select options if they exist
    const powerSelect = page.locator('select[name="power"]');
    if (await powerSelect.count() > 0) {
      await powerSelect.selectOption({ index: 1 });
    }
    
    // Fill quantity if exists
    const quantityInput = page.locator('input[name="quantity"]');
    if (await quantityInput.count() > 0) {
      await quantityInput.fill('5');
    }
    
    // Fill details if exists
    const detailsTextarea = page.locator('textarea[name="details"]');
    if (await detailsTextarea.count() > 0) {
      await detailsTextarea.fill('Urgent project');
    }
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(2000);
  });
});
