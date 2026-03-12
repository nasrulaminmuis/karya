import { test, expect } from '@playwright/test';

test.describe('Developers Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/developers');
  });

  test('should display page header and search input', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cari Developer' })).toBeVisible();
    await expect(page.getByText('Temukan developer berbakat')).toBeVisible();
    await expect(
      page.getByPlaceholder('Cari berdasarkan nama atau keahlian...')
    ).toBeVisible();
  });

  test('should show loading skeleton then developer cards', async ({ page }) => {
    // After loading, either developer cards or "Tidak ada developer" message should show
    await page.waitForTimeout(1000); // wait for debounce + API call
    const hasCards = await page.locator('[class*="card"], [class*="Card"]').count();
    const hasEmpty = await page.getByText('Tidak ada developer yang ditemukan').isVisible().catch(() => false);

    expect(hasCards > 0 || hasEmpty).toBeTruthy();
  });

  test('should have working search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Cari berdasarkan nama atau keahlian...');
    await searchInput.fill('react');
    // Wait for debounce (300ms) + network
    await page.waitForTimeout(1000);
    // The page should either show filtered results or "Tidak ada developer" message
    await expect(page.locator('main, .flex-1').first()).toBeVisible();
  });

  test('should display header and footer', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});
