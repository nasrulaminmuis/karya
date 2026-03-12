import { test, expect } from '@playwright/test';
import { getUniqueUser, registerUser } from './helpers';

test.describe('Dashboard', () => {
  const user = getUniqueUser('dash');

  test.beforeAll(async ({ browser }) => {
    // Register test user once
    const page = await browser.newPage();
    await registerUser(page, user);
    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.locator('input[type="email"]').fill(user.email);
    await page.locator('input[type="password"]').fill(user.password);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/dashboard', { timeout: 15000 });
  });

  test('should display welcome message with user name', async ({ page }) => {
    await expect(page.getByText('Selamat Datang')).toBeVisible();
    await expect(page.getByText('Berikut ringkasan portofolio Anda')).toBeVisible();
  });

  test('should display stats cards', async ({ page }) => {
    await expect(page.getByText('Total Proyek')).toBeVisible();
    await expect(page.getByText('Total Kunjungan')).toBeVisible();
    await expect(page.getByText('Total Impresi')).toBeVisible();
  });

  test('should display recent projects section', async ({ page }) => {
    await expect(page.getByText('Proyek Terbaru')).toBeVisible();
  });

  test('should display quick action cards', async ({ page }) => {
    await expect(page.getByText('Aksi Cepat')).toBeVisible();
    await expect(page.getByText('Tambah Proyek Baru')).toBeVisible();
    await expect(page.getByText('Lihat Analitik')).toBeVisible();
    await expect(page.getByText('Edit Profil')).toBeVisible();
  });

  test('should have "Tambah Proyek" button that navigates to new project form', async ({ page }) => {
    await page.getByRole('link', { name: /Tambah Proyek/i }).first().click();
    await expect(page).toHaveURL(/.*\/dashboard\/projects\/new/);
  });

  test('should navigate to projects list via "Lihat Semua"', async ({ page }) => {
    await page.getByText('Lihat Semua').first().click();
    await expect(page).toHaveURL(/.*\/dashboard\/projects/);
  });
});
