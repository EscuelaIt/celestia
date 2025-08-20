import { test, expect } from '@playwright/test'

test.describe('Destinations E2E Tests', () => {
  test('should list destinations on the home page', async ({ page }) => {
    await page.goto('/')

    // Check that the page loads with the correct title
    await expect(page).toHaveTitle(/Celestia/)

    // Check main heading is present
    await expect(page.locator('h1')).toContainText('Celestia')
    await expect(page.locator('text=Space Travel Planner')).toBeVisible()

    // Wait for destinations to load and check they are displayed
    await expect(page.locator('[data-testid="destination-card"]').first()).toBeVisible({ timeout: 10000 })

    // Check that destination cards contain expected content
    const destinationCards = page.locator('[data-testid="destination-card"]')
    await expect(destinationCards).toHaveCountGreaterThan(0)

    // Check specific destinations are present
    await expect(page.locator('text=Moon')).toBeVisible()
    await expect(page.locator('text=Mars')).toBeVisible()
    await expect(page.locator('text=Jupiter')).toBeVisible()

    // Check destination cards have required information
    await expect(page.locator('text=million km')).toBeVisible()
    await expect(page.locator('text=Our natural satellite')).toBeVisible()
  })

  test('should select destination, select classic ship and calculate trip', async ({ page }) => {
    await page.goto('/')

    // Wait for destinations to load
    await expect(page.locator('[data-testid="destination-card"]').first()).toBeVisible({ timeout: 10000 })

    // Select Mars destination
    await page.locator('text=Mars').first().click()

    // Wait for ship selection to appear
    await expect(page.locator('text=/Ship Type')).toBeVisible()

    // Verify classic rocket is selected by default
    const classicCard = page.locator('[data-testid="ship-classic"]')
    await expect(classicCard).toHaveClass(/ring-2/)

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
    await page.locator('button', { hasText: 'Add New Destination' }).click()

    // Check add destination form is displayed
    await expect(page.locator('text=/Add New Destination')).toBeVisible()

    // Fill out the form
    await page.fill('#name', 'Neptune')
    await page.fill('#emoji', '🔵')
    await page.fill('#distance', '4495')
    await page.fill('#classicTravelTime', '1200')
    await page.fill('#advancedTravelTime', '600')
    await page.fill('#description', 'The ice giant at the edge of our solar system')

    // Submit the form
    await page.click('button[type="submit"]')

    // Should return to destinations list
    await expect(page.locator('text=/Select Destination')).toBeVisible({ timeout: 10000 })

    // Check that Neptune was added to the list
    await expect(page.locator('text=Neptune')).toBeVisible()
    await expect(page.locator('text=The ice giant at the edge')).toBeVisible()
    await expect(page.locator('text=4495 million km')).toBeVisible()
  })
})
