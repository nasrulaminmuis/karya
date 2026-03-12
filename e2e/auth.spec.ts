import { test, expect } from '@playwright/test';
import { getUniqueUser, registerUser, loginUser, logoutUser } from './helpers';

test.describe('Authentication Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    const user = getUniqueUser('reg');

    await page.goto('/register');
    await expect(page).toHaveTitle(/Karya/);
    await expect(page.getByText('Buat Akun Baru')).toBeVisible();

    // Fill form
    await page.locator('input[type="text"]').fill(user.name);
    await page.locator('input[type="email"]').fill(user.email);
    const passwords = page.locator('input[type="password"]');
    await passwords.nth(0).fill(user.password);
    await passwords.nth(1).fill(user.password);
    await page.locator('input[type="checkbox"]').check();

    await page.locator('button[type="submit"]').click();

    // Should redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should show validation error for short password', async ({ page }) => {
    await page.goto('/register');
    await page.locator('input[type="text"]').fill('Test');
    await page.locator('input[type="email"]').fill('short@test.com');
    const passwords = page.locator('input[type="password"]');
    await passwords.nth(0).fill('123'); // less than 8 chars
    await passwords.nth(1).fill('123');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();

    // Should stay on register page with error
    await expect(page.getByText('Kata sandi minimal 8 karakter')).toBeVisible();
  });

  test('should show validation error for password mismatch', async ({ page }) => {
    await page.goto('/register');
    await page.locator('input[type="text"]').fill('Test');
    await page.locator('input[type="email"]').fill('mismatch@test.com');
    const passwords = page.locator('input[type="password"]');
    await passwords.nth(0).fill('Password123!');
    await passwords.nth(1).fill('DifferentPass!');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText('Kata sandi tidak cocok')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    const user = getUniqueUser('login');

    // Register first
    await registerUser(page, user);
    await logoutUser(page);

    // Now login
    await loginUser(page, user);
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.getByText('Selamat Datang')).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[type="email"]').fill('nonexistent@test.com');
    await page.locator('input[type="password"]').fill('WrongPassword!');
    await page.locator('button[type="submit"]').click();

    // Should show error message and stay on login page
    await expect(page.locator('.text-error, .bg-red-50')).toBeVisible({ timeout: 10000 });
  });

  test('should logout successfully', async ({ page }) => {
    const user = getUniqueUser('logout');
    await registerUser(page, user);

    // Click logout
    await logoutUser(page);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should redirect unauthenticated user from dashboard to login', async ({ page }) => {
    // Clear any stored tokens
    await page.goto('/login');
    await page.evaluate(() => localStorage.removeItem('karya_token'));

    await page.goto('/dashboard');
    await page.waitForURL('**/login', { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should navigate from login to register and back', async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Daftar sekarang').click();
    await expect(page).toHaveURL(/.*\/register/);

    await page.getByText('Masuk').first().click();
    await expect(page).toHaveURL(/.*\/login/);
  });
});
