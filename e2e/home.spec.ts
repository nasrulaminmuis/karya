import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with title and CTA', async ({ page }) => {
    await expect(page).toHaveTitle(/Karya/);
    await expect(page.getByText('Karya Terbaik')).toBeVisible();
    await expect(page.getByText('Mulai Gratis')).toBeVisible();
    await expect(page.getByText('Jelajahi Developer')).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    await expect(page.getByText('1,200+')).toBeVisible();
    await expect(page.getByText('4,500+')).toBeVisible();
    await expect(page.getByText('10K+')).toBeVisible();
    await expect(page.getByText('Kunjungan/bulan')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await expect(page.getByText('Semua yang Anda Butuhkan')).toBeVisible();
    await expect(page.getByText('Kelola Proyek').first()).toBeVisible();
    await expect(page.getByText('Integrasi GitHub').first()).toBeVisible();
    await expect(page.getByText('Kustomisasi Tampilan').first()).toBeVisible();
    await expect(page.getByText('Analitik Portofolio').first()).toBeVisible();
    await expect(page.getByText('Keamanan Terjamin').first()).toBeVisible();
    await expect(page.getByText('URL Unik').first()).toBeVisible();
  });

  test('should display developer unggulan section', async ({ page }) => {
    await expect(page.getByText('Developer Unggulan')).toBeVisible();
    await expect(page.getByText('Lihat Semua Developer')).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    await expect(page.getByText('Siap Memulai?')).toBeVisible();
    await expect(page.getByText('Buat Portofolio Gratis')).toBeVisible();
  });

  test('should navigate to register from hero CTA', async ({ page }) => {
    await page.getByText('Mulai Gratis').click();
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('should navigate to developers page', async ({ page }) => {
    await page.getByText('Jelajahi Developer').click();
    await expect(page).toHaveURL(/.*\/developers/);
  });

  test('should display header with navigation links', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByText('Karya')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
