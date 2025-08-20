import { expect, Locator, Page } from '@playwright/test';

export class CustomAssertions {
  
  public async toBeVisibleWithText(locator: Locator, expectedText: string, timeout = 10000) {
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toContainText(expectedText, { timeout });
  }

  public async toBeVisible(locator: Locator,timeout = 10000) {
    await expect(locator).toBeVisible({ timeout });
  }
  
  public async toBeVisibleNotToHaveText(locator: Locator, expectedText: string, timeout = 10000) {
    console.log('Locator: ', locator);
    console.log('Expected Text: ', expectedText);
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).not.toHaveText(expectedText, { timeout });
  }

  public async toShowNotification(page: Page, expectedText: string, timeout = 15000) {
    await page.waitForLoadState('load');
    const notification = page.getByText(expectedText, { exact: true });
    await expect(notification).toBeVisible({ timeout });
  }
 

}

