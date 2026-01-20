# Playwright Tests

This directory contains end-to-end tests for the Director Jeremy Mills website using Playwright.

## Test Coverage

### Home Page (`home.spec.js`)
- Page loading and rendering
- Work items grid display
- Responsive layouts (desktop/mobile)
- Navigation to work items
- SEO meta tags
- Hero video display

### Contact Page (`contact.spec.js`)
- Page loading and rendering
- Headshot photo display
- Bio and representation sections
- Awards section with expand/collapse functionality
- SEO meta tags
- Responsive layouts

### Work Pages (`work.spec.js`)
- Work index page loading and grid display
- Work detail page loading
- Video player or poster image display
- Credits section toggle
- Related work items display
- Video player controls (non-iOS)
- SEO meta tags
- Responsive layouts

### Stills Pages (`stills.spec.js`)
- Stills page loading (if enabled)
- Hero content display
- Image gallery display
- Image shuffling
- Lightbox functionality
- SEO meta tags
- Responsive layouts

## Running Tests

### Run all tests (headless mode)
```bash
bun run test
```

### Run tests with browser visible
```bash
bun run test:headed
```

### Run tests in UI mode (interactive)
```bash
bun run test:ui
```

### View test report
```bash
bun run test:report
```

### Run specific test file
```bash
bunx playwright test tests/home.spec.js
```

### Run tests on specific browser
```bash
bunx playwright test --project=chromium
```

## Configuration

The test configuration is in `playwright.config.js` at the project root. Key settings:
- Base URL: `http://localhost:3000`
- Web server starts automatically with `bun run dev`
- Tests run in Chromium by default
- Screenshots and traces captured on failure

## Notes

- Tests require the development server to be running on port 3000
- The test suite automatically starts the dev server if it's not running
- Stills page tests will skip if the stills page is not enabled in your CMS
- Tests include responsive checks for both mobile (375x667) and desktop (1280x720) viewports

## Adding New Tests

To add new tests:
1. Create a new `.spec.js` file in the `tests` directory
2. Import test and expect from `@playwright/test`
3. Use `test.describe()` to group related tests
4. Use `test()` to define individual test cases
5. Use Playwright's locator API to find and interact with elements

Example:
```javascript
const { test, expect } = require('@playwright/test');

test.describe('My New Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```
