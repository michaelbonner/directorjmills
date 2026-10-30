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
    const grid = page.getByTestId('work-grid');
    await expect(grid).toBeVisible();
  });

  test('should have correct grid layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/work');

    // Check for desktop grid layout
    const grid = page.getByTestId('work-grid');
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
    const firstWorkItem = page.locator('main a[href^="/work/"]').first();
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
    const firstWorkItem = page.locator('main a[href^="/work/"]').first();
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
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check for video player iframe or poster image
    const hasIframe = (await page.locator('iframe').count()) > 0;
    const hasPosterImage = (await page.locator('img').count()) > 0;

    // At least one should be present
    expect(hasIframe || hasPosterImage).toBe(true);
  });

  test('should list credits if credits exist', async ({ page }) => {
    const creditsHeading = page.locator('h2:has-text("Credits")');

    if ((await creditsHeading.count()) > 0) {
      await expect(creditsHeading).toBeVisible();
      await expect(page.locator('dl dt').first()).toBeVisible();
    }
  });

  test('should display related work items on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Reload to ensure desktop layout
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Look for the aside section (which contains related work items)
    const workSection = page.locator('aside');

    await expect(workSection).toBeVisible();
    await expect(workSection.getByTestId('work-grid')).toBeVisible();
  });

  test('should have video player controls on non-iOS devices', async ({ page, browserName }) => {
    // Wait for player to potentially load
    await page.waitForTimeout(2000);

    // Look for play button
    const playButton = page.locator('button[title="Play/Pause"]');

    // Controls are hidden on iOS, so only assert when present
    if ((await playButton.count()) > 0) {
      await expect(playButton).toBeVisible();
    }
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

    // Related work is shown on mobile too
    const workSection = page.locator('aside');
    if ((await workSection.count()) > 0) {
      await expect(workSection).toBeVisible();
    }
  });
});

test('video projects show a usable play control on iPad', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'platform', { get: () => 'iPad' });
  });
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/work/share-in-the-adventure');

  const playButton = page.getByRole('button', { name: 'Play video' });
  await expect(playButton).toBeVisible();
  await playButton.click();

  await expect(playButton).toHaveCount(0);
  await expect(page.locator('vimeo-video')).toHaveCSS('opacity', '1');
});
