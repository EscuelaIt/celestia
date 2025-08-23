import { test, expect } from '@playwright/test'

test.describe('Destinations', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('/api/reset-test-data')
  })

  test('should list destinations', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('[data-testid="destination-card"]').first()).toBeVisible({ timeout: 10000 })

    await expect(async () => {
      const count = await page.locator('[data-testid="destination-card"]').count()
      expect(count).toBeGreaterThan(0)
    }).toPass()
  })

  test('should select destination, select classic ship and calculate trip', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('[data-testid="destination-card"]').first()).toBeVisible({ timeout: 10000 })

    // Select Mars destination
    await page.locator('text=Mars').first().click()

    // Wait for ship selection to appear
    await expect(page.locator('text=/Ship Type')).toBeVisible()

    // Click calculate trip button
    await page.locator('button', { hasText: 'Calculate Trip' }).click()

    // Should navigate to trip results page
    await expect(page).toHaveURL(/\/trip\/mars\/classic/)

    // Wait for trip results to load
    await expect(page.locator('text=/Trip Plan')).toBeVisible({ timeout: 10000 })

    // Check trip results content
    await expect(page.locator('text=Destination: Mars')).toBeVisible()
    await expect(page.locator('text=🚀 Classic Rocket')).toBeVisible()
    await expect(page.locator('text=Distance')).toBeVisible()
    await expect(page.locator('text=Travel Time')).toBeVisible()
    await expect(page.locator('text=Average Speed')).toBeVisible()

    // Check specific Mars data is displayed
    await expect(page.locator('text=225')).toBeVisible() // Mars distance
    await expect(page.locator('text=260')).toBeVisible() // Classic travel time
  })

  test('should create a new destination', async ({ page }) => {
    await page.goto('/')

    // Wait for page to load
    await expect(page.locator('[data-testid="destination-card"]').first()).toBeVisible({ timeout: 10000 })

    // Click Add New Destination button
    await page.locator('button', { hasText: 'Create New Destination' }).click()

    // Check add destination form is displayed
    await expect(page.locator('text=/Create New Destination')).toBeVisible()

    // Create unique destination name using timestamp to ensure idempotency
    const timestamp = Date.now()
    const uniqueName = `TestPlanet${timestamp}`

    // Fill out the form with unique data
    await page.fill('#name', uniqueName)
    await page.fill('#emoji', '🟣')
    await page.fill('#distance', '3000')
    await page.fill('#classicTravelTime', '800')
    await page.fill('#advancedTravelTime', '400')
    await page.fill('#description', `Test planet created at ${timestamp}`)

    // Submit the form
    await page.click('button[type="submit"]')

    // Should return to destinations list
    await expect(page.locator('text=/Select Destination')).toBeVisible({ timeout: 10000 })

    // Check that the new destination was created
    await expect(page.locator(`text=${uniqueName}`)).toBeVisible()
    await expect(page.locator(`text=Test planet created at ${timestamp}`)).toBeVisible()
    await expect(page.locator('text=3000 million km')).toBeVisible()
  })
})
