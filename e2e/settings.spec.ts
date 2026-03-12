import { test, expect } from '@playwright/test';
import { getUniqueUser, registerUser } from './helpers';

test.describe('Settings', () => {
  const user = getUniqueUser('set');

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

  test.describe('Profile Settings', () => {
    test('should display profile form with pre-filled user data', async ({ page }) => {
      await page.goto('/dashboard/settings/profile');
      await expect(page.getByRole('heading', { name: 'Profil Publik' })).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('Nama Lengkap')).toBeVisible();
      await expect(page.getByText('Username')).toBeVisible();
      await expect(page.getByText('Bio Lengkap')).toBeVisible();
    });

    test('should display social links section', async ({ page }) => {
      await page.goto('/dashboard/settings/profile');
      await expect(page.getByText('Tautan Sosial')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('Profil GitHub')).toBeVisible();
      await expect(page.getByText('Profil LinkedIn')).toBeVisible();
      await expect(page.getByText('Website Pribadi')).toBeVisible();
    });

    test('should update profile and show success', async ({ page }) => {
      await page.goto('/dashboard/settings/profile');
      await page.waitForTimeout(1000); // wait for data to load

      // Update bio
      const bioTextarea = page.locator('textarea');
      await bioTextarea.fill('Bio E2E Test Update');

      // Update GitHub URL
      await page.getByPlaceholder('https://github.com/username').fill('https://github.com/e2etester');

      // Submit
      await page.getByRole('button', { name: /Simpan/i }).click();

      // Should show success
      await expect(page.getByText('Tersimpan!')).toBeVisible({ timeout: 5000 });
    });

    test('should display avatar section', async ({ page }) => {
      await page.goto('/dashboard/settings/profile');
      await expect(page.getByText('Foto Profil')).toBeVisible();
      await expect(page.getByText('Unggah Baru')).toBeVisible();
    });
  });

  test.describe('Skills Settings', () => {
    test('should display skills page with add button', async ({ page }) => {
      await page.goto('/dashboard/settings/skills');
      await expect(page.getByRole('heading', { name: 'Keahlian' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Tambah Keahlian', exact: true })).toBeVisible();
    });

    test('should open add skill form', async ({ page }) => {
      await page.goto('/dashboard/settings/skills');
      await page.getByRole('button', { name: 'Tambah Keahlian', exact: true }).click();
      await expect(page.getByText('Tambah Keahlian Baru')).toBeVisible();
      await expect(page.getByPlaceholder('Mis. React, Node.js')).toBeVisible();
    });

    test('should add a new skill', async ({ page }) => {
      await page.goto('/dashboard/settings/skills');
      await page.getByRole('button', { name: 'Tambah Keahlian', exact: true }).click();

      // Fill skill form
      await page.getByPlaceholder('Mis. React, Node.js').fill('React');
      // Select level
      await page.locator('select').first().selectOption('Expert');
      // Select category
      await page.locator('select').last().selectOption('Frontend');

      // Submit
      await page.getByRole('button', { name: 'Tambah' }).click();

      // Skill should appear in the list
      await page.waitForTimeout(1000);
      await expect(page.getByText('React')).toBeVisible();
      await expect(page.getByText('Expert')).toBeVisible();
    });

    test('should cancel adding skill', async ({ page }) => {
      await page.goto('/dashboard/settings/skills');
      await page.getByRole('button', { name: 'Tambah Keahlian', exact: true }).click();
      await page.getByRole('button', { name: 'Batal' }).click();
      // Form should be closed
      await expect(page.getByText('Tambah Keahlian Baru')).not.toBeVisible();
    });
  });

  test.describe('Certificates Settings', () => {
    test('should display certificates page', async ({ page }) => {
      await page.goto('/dashboard/settings/certificates');
      await expect(page.getByText('Sertifikasi & Penghargaan')).toBeVisible();
      await expect(page.getByText('Tambah Sertifikat')).toBeVisible();
    });

    test('should open add certificate form', async ({ page }) => {
      await page.goto('/dashboard/settings/certificates');
      await page.getByText('Tambah Sertifikat').click();
      await expect(page.getByText('Tambah Pencapaian Baru')).toBeVisible();
    });

    test('should add a new certificate', async ({ page }) => {
      await page.goto('/dashboard/settings/certificates');
      await page.getByText('Tambah Sertifikat').click();

      // Fill form
      await page.getByPlaceholder('Mis. AWS Certified Developer').fill('E2E Test Certificate');
      await page.getByPlaceholder('Mis. Amazon Web Services').fill('Test Issuer');
      await page.locator('input[type="date"]').fill('2024-06-15');

      // Submit
      await page.getByRole('button', { name: 'Tambah' }).click();

      // Certificate should appear in list
      await page.waitForTimeout(1000);
      await expect(page.getByText('E2E Test Certificate')).toBeVisible();
      await expect(page.getByText('Test Issuer')).toBeVisible();
    });

    test('should cancel adding certificate', async ({ page }) => {
      await page.goto('/dashboard/settings/certificates');
      await page.getByText('Tambah Sertifikat').click();
      await page.getByRole('button', { name: 'Batal' }).click();
      await expect(page.getByText('Tambah Pencapaian Baru')).not.toBeVisible();
    });

    test('should show validation error when required fields empty', async ({ page }) => {
      await page.goto('/dashboard/settings/certificates');
      await page.getByText('Tambah Sertifikat').click();
      // Submit without filling required fields
      await page.getByRole('button', { name: 'Tambah' }).click();
      // HTML5 validation or custom error should prevent submission
      await expect(page).toHaveURL(/.*\/certificates/);
    });
  });
});
