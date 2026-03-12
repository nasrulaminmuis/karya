import { type Page, expect } from '@playwright/test';

/**
 * Generate unique test user data
 */
export function getUniqueUser(prefix = 'e2e') {
  const id = Date.now();
  return {
    name: `${prefix} User ${id}`,
    email: `${prefix}-${id}@test.com`,
    password: 'TestPass123!',
  };
}

/**
 * Register a new user via the UI
 */
export async function registerUser(
  page: Page,
  user: { name: string; email: string; password: string }
) {
  await page.goto('/register');
  await page.locator('input[type="text"]').fill(user.name);
  await page.locator('input[type="email"]').fill(user.email);

  const passwords = page.locator('input[type="password"]');
  await passwords.nth(0).fill(user.password);
  await passwords.nth(1).fill(user.password);

  await page.locator('input[type="checkbox"]').check();
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/dashboard', { timeout: 15000 });
}

/**
 * Login an existing user via the UI
 */
export async function loginUser(
  page: Page,
  user: { email: string; password: string }
) {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill(user.email);
  await page.locator('input[type="password"]').fill(user.password);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/dashboard', { timeout: 15000 });
}

/**
 * Logout the current user via sidebar
 */
export async function logoutUser(page: Page) {
  const logoutBtn = page.getByLabel('Logout').first();
  if (await logoutBtn.isVisible()) {
    await logoutBtn.click();
    await page.waitForURL('**/login', { timeout: 10000 });
  }
}

/**
 * Ensure user is on the dashboard (authenticated)
 */
export async function ensureOnDashboard(page: Page) {
  await expect(page).toHaveURL(/.*\/dashboard/);
}
