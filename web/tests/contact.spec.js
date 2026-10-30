const { test, expect } = require('@playwright/test');

test.describe('Contact Page', () => {
  test('should load the contact page successfully', async ({ page }) => {
    await page.goto('/contact');

    // Check that the page loads
    await expect(page).toHaveURL('/contact');
  });

  test('should display the headshot photo', async ({ page }) => {
    await page.goto('/contact');

    const photo = page.locator('img[alt*="Headshot"]').first();
    await expect(photo).toBeVisible();
  });

  test('should display bio section', async ({ page }) => {
    await page.goto('/contact');

    // Look for prose sections (PortableText renders in prose class)
    const proseSection = page.locator('.prose').first();
    await expect(proseSection).toBeVisible();
  });

  test('should display representation section', async ({ page }) => {
    await page.goto('/contact');

    const representationHeading = page.locator('h2:has-text("Representation")');
    await expect(representationHeading).toBeVisible();
  });

  test('should have "Show More" button initially', async ({ page }) => {
    await page.goto('/contact');

    // Find the Show More button
    const showMoreButton = page.locator('button:has-text("Show More")');
    await expect(showMoreButton).toBeVisible();
  });

  test('should expand awards section when "Show More" is clicked', async ({ page }) => {
    await page.goto('/contact');

    // Click the Show More button
    const showMoreButton = page.locator('button:has-text("Show More")');
    await showMoreButton.click();

    // Wait for animation
    await page.waitForTimeout(1500);

    // Button text should change to "Close"
    const closeButton = page.locator('button:has-text("Close")');
    await expect(closeButton).toBeVisible();
  });

  test('should collapse awards section when "Close" is clicked', async ({ page }) => {
    await page.goto('/contact');

    // Click Show More
    const showMoreButton = page.locator('button:has-text("Show More")');
    await showMoreButton.click();

    // Wait for expansion animation
    await page.waitForTimeout(1500);

    // Click Close
    const closeButton = page.locator('button:has-text("Close")');
    await closeButton.click();

    // Wait for collapse animation
    await page.waitForTimeout(1500);

    // Button should be back to "Show More"
    const showMoreAgain = page.locator('button:has-text("Show More")');
    await expect(showMoreAgain).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/contact');

    // Check for title
    await expect(page).toHaveTitle(/.+/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');

    const photo = page.locator('img[alt*="Headshot"]').first();
    await expect(photo).toBeVisible();

    // Check that content sections are visible
    const proseSection = page.locator('.prose').first();
    await expect(proseSection).toBeVisible();
  });

  test('should display the page heading', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.locator('main h1')).toHaveText(/Jeremy Miller/i);
  });
});
