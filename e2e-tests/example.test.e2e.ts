import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://cesalberca.com/')

  await expect(page).toHaveTitle(/César Alberca/)
})
