import { test, expect } from '@playwright/test';

test.describe('About Section Title Layout', () => {
  test('should display title on correct number of lines', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to About section
    await page.click('a[href="#about"]');
    await page.waitForTimeout(1000);
    
    // Find the h2 title
    const title = page.locator('section#about h2');
    await expect(title).toBeVisible();
    
    // Take screenshot
    await title.screenshot({ path: 'title-screenshot.png' });
    
    // Get the bounding box to analyze layout
    const box = await title.boundingBox();
    console.log('Title dimensions:', box);
    
    // Get text content
    const text = await title.textContent();
    console.log('Title text:', text);
    
    // Count line breaks
    const spans = await title.locator('span').count();
    console.log('Number of span elements:', spans);
    
    // Check for line breaks
    const br = await title.locator('br').count();
    console.log('Number of br elements:', br);
  });
  
  test('should verify title structure in desktop view', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Navigate to About section
    await page.click('a[href="#about"]');
    await page.waitForTimeout(1000);
    
    // Find the h2 title
    const title = page.locator('section#about h2');
    await expect(title).toBeVisible();
    
    // Screenshot for desktop
    await title.screenshot({ path: 'title-desktop.png' });
    
    // Get computed styles
    const fontSize = await title.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    console.log('Font size:', fontSize);
    
    // Get line height
    const lineHeight = await title.evaluate((el) => 
      window.getComputedStyle(el).lineHeight
    );
    console.log('Line height:', lineHeight);
    
    // Get actual height
    const height = await title.evaluate((el) => el.offsetHeight);
    console.log('Title height:', height);
  });
});
