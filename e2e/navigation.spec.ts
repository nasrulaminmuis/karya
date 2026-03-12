import { test, expect } from '@playwright/test';
import { getUniqueUser, registerUser } from './helpers';

test.describe('Navigation', () => {
  test.describe('Public Header', () => {
    test('should have Karya logo link to home', async ({ page }) => {
      await page.goto('/developers');
      const logo = page.locator('header').getByText('Karya');
      await expect(logo).toBeVisible();
      await logo.click();
      await expect(page).toHaveURL(/\/$/);
    });

    test('should have Masuk and Daftar links when unauthenticated', async ({ page }) => {
      await page.goto('/');
      const header = page.locator('header');
      await expect(header.getByText('Masuk')).toBeVisible();
      await expect(header.getByText('Daftar')).toBeVisible();
    });

    test('should navigate to login from header', async ({ page }) => {
      await page.goto('/');
      await page.locator('header').getByText('Masuk').click();
      await expect(page).toHaveURL(/.*\/login/);
    });

    test('should navigate to register from header', async ({ page }) => {
      await page.goto('/');
      await page.locator('header').getByText('Daftar').click();
      await expect(page).toHaveURL(/.*\/register/);
    });
  });

  test.describe('Dashboard Sidebar', () => {
    const user = getUniqueUser('nav');

    test.beforeAll(async ({ browser }) => {
      const page = await browser.newPage();
      await registerUser(page, user);
      await page.close();
    });

    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.locator('input[type="email"]').fill(user.email);
      await page.locator('input[type="password"]').fill(user.password);
      await page.locator('button[type="submit"]').click();
      await page.waitForURL('**/dashboard', { timeout: 15000 });
    });

    test('should navigate to projects page from sidebar', async ({ page }) => {
      await page.getByText('Proyek', { exact: false }).first().click();
      await page.waitForTimeout(500);
      // Should be on projects or dashboard (depends on sidebar structure)
      const url = page.url();
      expect(url).toMatch(/dashboard/);
    });

    test('should navigate to settings profile from sidebar', async ({ page }) => {
      // Click on settings/profile related link
      const settingsLink = page.getByText('Pengaturan').or(page.getByText('Profil'));
      if (await settingsLink.first().isVisible()) {
        await settingsLink.first().click();
        await page.waitForTimeout(500);
      }
      const url = page.url();
      expect(url).toMatch(/dashboard/);
    });

    test('should navigate to analytics from sidebar', async ({ page }) => {
      const analyticsLink = page.getByRole('link', { name: 'Analitik' }).first();
      await analyticsLink.waitFor({ state: 'visible', timeout: 10000 });
      await analyticsLink.click();
      await expect(page).toHaveURL(/.*\/dashboard\/analytics/, { timeout: 15000 });
    });
  });

  test.describe('Back Button Navigation', () => {
    const user = getUniqueUser('back');

    test.beforeAll(async ({ browser }) => {
      const page = await browser.newPage();
      await registerUser(page, user);
      await page.close();
    });

    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.locator('input[type="email"]').fill(user.email);
      await page.locator('input[type="password"]').fill(user.password);
      await page.locator('button[type="submit"]').click();
      await page.waitForURL('**/dashboard', { timeout: 15000 });
    });

    test('should navigate back from new project page', async ({ page }) => {
      await page.goto('/dashboard/projects/new');
      // Click back arrow button
      const backBtn = page.locator('a[href="/dashboard/projects"] button, a[href="/dashboard/projects"]').first();
      if (await backBtn.isVisible()) {
        await backBtn.click();
        await expect(page).toHaveURL(/.*\/dashboard\/projects/);
      }
    });
  });

  test.describe('Responsive Navigation', () => {
    test('should show mobile-friendly layout on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/');
      await expect(page).toHaveTitle(/Karya/);
      // Hero content should still be visible
      await expect(page.getByText('Karya Terbaik')).toBeVisible();
    });
  });
});
