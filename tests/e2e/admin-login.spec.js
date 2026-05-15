import { test, expect } from '@playwright/test';

test.describe('Admin login shell', () => {
  test('admin login page is reachable', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByRole('heading', { name: /admin login|welcome back|sign in/i })).toBeVisible();
  });
});
