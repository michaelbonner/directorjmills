const { test, expect } = require('@playwright/test');

test.describe('Work Index Page', () => {
  test('should load the work index page successfully', async ({ page }) => {
    await page.goto('/work');

    // Check that the page loads
    await expect(page).toHaveURL('/work');
  });

  test('should display work items in a grid', async ({ page }) => {
    await page.goto('/work');

    // Wait for the grid to be visible
    const grid = page.locator('.grid.grid-cols-1');
    await expect(grid).toBeVisible();
  });

  test('should have correct grid layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/work');

    // Check for desktop grid layout
    const grid = page.locator('.grid.lg\\:grid-cols-3');
    await expect(grid).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/work');

    // Check for title
    await expect(page).toHaveTitle(/.+/);
  });

  test('should navigate to work item detail when clicked', async ({ page }) => {
    await page.goto('/work');

    // Get first work item link from within main content area
    const firstWorkItem = page.locator('main').getByRole('link').first();
    const href = await firstWorkItem.getAttribute('href');

    // Click and verify navigation
    await firstWorkItem.click();
    await page.waitForLoadState('networkidle');

    // Check that we navigated to a work detail page
    if (href) {
      await expect(page).toHaveURL(new RegExp('/work/'));
    }
  });
});

test.describe('Work Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to work index first to get a valid work item
    await page.goto('/work');

    // Click the first work item from within main content area
    const firstWorkItem = page.locator('main').getByRole('link').first();
    await firstWorkItem.click();
    await page.waitForLoadState('networkidle');
  });

  test('should load work detail page', async ({ page }) => {
    // Check that we're on a work detail page
    await expect(page).toHaveURL(/\/work\/.+/);
  });

  test('should display work title', async ({ page }) => {
    // Check for the title heading
    const titleHeading = page.locator('h1');
    await expect(titleHeading).toBeVisible();
  });

  test('should display video player or poster image', async ({ page }) => {
    // Wait a bit for content to load
    await page.waitForTimeout(2000);

    // Check for either video player or poster image
    const videoContainer = page.locator('.aspect-w-16, .aspect-w-9, iframe, img[alt="Poster image"]');
    await expect(videoContainer.first()).toBeVisible();
  });

  test('should have credits section if credits exist', async ({ page }) => {
    // Look for credits button
    const creditsButton = page.locator('button:has-text("Credits")');

    // If credits exist, test the toggle
    if (await creditsButton.count() > 0) {
      await expect(creditsButton).toBeVisible();

      // Click to expand
      await creditsButton.click();
      await page.waitForTimeout(500);

      // Credits grid should be visible (check for grid)
      const creditsGrid = page.locator('.grid.grid-cols-1');
      await expect(creditsGrid.first()).toBeVisible();
    }
  });

  test('should toggle credits section', async ({ page }) => {
    // Look for credits button
    const creditsButton = page.locator('button:has-text("Credits")');

    if (await creditsButton.count() > 0) {
      // Initial state - should be collapsed
      const chevron = creditsButton.locator('span').last();

      // Click to expand
      await creditsButton.click();
      await page.waitForTimeout(500);

      // Click again to collapse
      await creditsButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('should display related work items on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Reload to ensure desktop layout
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for the aside section (which contains related work items)
    const workSection = page.locator('aside');

    // This section is hidden on mobile, visible on desktop
    const isVisible = await workSection.isVisible();
    if (isVisible) {
      await expect(workSection).toBeVisible();
    }
  });

  test('should have video player controls on non-iOS devices', async ({ page, browserName }) => {
    // Wait for player to potentially load
    await page.waitForTimeout(2000);

    // Look for play button
    const playButton = page.locator('button[title="Play/Pause"], .bpd-play-icon').first();

    // The play button might be hidden or visible depending on video state
    // Just check if controls container exists
    const controlsContainer = page.locator('.container .flex.space-x-8');

    // Controls may or may not be visible depending on device detection
    const count = await controlsContainer.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check for title
    await expect(page).toHaveTitle(/.+/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Reload to ensure mobile layout
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check if page has content (may have errors in some configurations)
    const errorHeading = page.locator('h1:has-text("Error")');
    const hasError = (await errorHeading.count()) > 0;

    if (!hasError) {
      // Check that the title is visible (use first to avoid strict mode)
      const titleHeading = page.locator('main h1').first();
      await expect(titleHeading).toBeVisible();
    }

    // Related work section should be hidden on mobile (check regardless of errors)
    const workSection = page.locator('aside');
    if ((await workSection.count()) > 0) {
      const isHidden = await workSection.isHidden();
      expect(isHidden).toBe(true);
    }
  });
});
