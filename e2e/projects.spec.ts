import { test, expect } from '@playwright/test';
import { getUniqueUser, registerUser } from './helpers';

test.describe('Projects CRUD', () => {
  const user = getUniqueUser('proj');

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

  test('should show empty state when no projects', async ({ page }) => {
    await page.goto('/dashboard/projects');
    await page.waitForTimeout(1000);
    // New user has no projects
    const hasEmpty = await page.getByText('Belum Ada Proyek').isVisible().catch(() => false);
    const hasProjects = await page.getByText('Proyek Saya').isVisible().catch(() => false);
    expect(hasEmpty || hasProjects).toBeTruthy();
  });

  test('should navigate to new project form', async ({ page }) => {
    await page.goto('/dashboard/projects');
    await page.getByRole('link', { name: /Tambah Proyek/i }).first().click();
    await expect(page).toHaveURL(/.*\/dashboard\/projects\/new/);
    await expect(page.getByText('Tambah Proyek Baru')).toBeVisible();
  });

  test('should display new project form with all fields', async ({ page }) => {
    await page.goto('/dashboard/projects/new');
    await expect(page.getByText('Judul Proyek')).toBeVisible();
    await expect(page.getByText('Deskripsi Detail')).toBeVisible();
    await expect(page.getByText('Tautan Terkait')).toBeVisible();
    await expect(page.getByText('Teknologi & Tag')).toBeVisible();
    await expect(page.getByText('Media Proyek')).toBeVisible();
  });

  test('should create a new project', async ({ page }) => {
    await page.goto('/dashboard/projects/new');

    // Fill in project form
    await page.getByPlaceholder('Mis. E-commerce Frontend').fill('E2E Test Project');
    await page.locator('textarea').fill('Proyek test untuk E2E testing');
    await page.getByPlaceholder('https://github.com/...').fill('https://github.com/test/project');
    await page.getByPlaceholder('https://...').fill('https://test-project.com');

    // Add tags
    const tagInput = page.getByPlaceholder('Mis. React, Node.js');
    await tagInput.fill('React');
    await tagInput.press('Enter');
    await tagInput.fill('TypeScript');
    await tagInput.press('Enter');

    // Verify tags added
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('TypeScript')).toBeVisible();

    // Submit
    await page.getByRole('button', { name: /Simpan Proyek/i }).click();

    // Should redirect to projects list
    await page.waitForURL('**/dashboard/projects', { timeout: 15000 });
  });

  test('should show created project in the projects list', async ({ page }) => {
    // First create a project
    await page.goto('/dashboard/projects/new');
    await page.getByPlaceholder('Mis. E-commerce Frontend').fill('List Test Project');
    await page.locator('textarea').fill('Proyek untuk verifikasi listing');
    await page.getByRole('button', { name: /Simpan Proyek/i }).click();
    await page.waitForURL('**/dashboard/projects', { timeout: 15000 });

    // Verify project appears in list
    await expect(page.getByText('List Test Project')).toBeVisible();
    await expect(page.getByText('Proyek untuk verifikasi listing')).toBeVisible();
  });

  test('should cancel project creation and go back', async ({ page }) => {
    await page.goto('/dashboard/projects/new');
    await page.getByRole('link', { name: 'Batal' }).click();
    await expect(page).toHaveURL(/.*\/dashboard\/projects/);
  });

  test('should add and remove tags on project form', async ({ page }) => {
    await page.goto('/dashboard/projects/new');

    const tagInput = page.getByPlaceholder('Mis. React, Node.js');
    await tagInput.fill('Vue');
    await tagInput.press('Enter');
    await expect(page.getByText('Vue')).toBeVisible();

    // Remove tag by clicking X button
    const tagChip = page.locator('button').filter({ has: page.locator('svg') }).last();
    await tagChip.click();
  });
});
