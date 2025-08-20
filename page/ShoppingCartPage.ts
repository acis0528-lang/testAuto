import { expect, Page, Locator } from '@playwright/test';
import { CustomAssertions } from '../utils/CustomAssertions';


export class ShoppingCartPage {

    private readonly totalAmount: Locator;
    private readonly addToCartIconCounter: Locator;
    private readonly removeProductButton: Locator;
    page: any;
    customAssert: CustomAssertions;

    constructor(page: Page) {
        this.page = page;
        this.customAssert = new CustomAssertions();
        this.totalAmount = this.page.locator('//span[contains(@class,"totalAmountCard_total-value")]//child::span[contains(text(),"$")]')
        this.addToCartIconCounter = this.page.locator('//img[contains(@src,"shopping-cart")]//preceding-sibling::span');
        this.removeProductButton  = this.page.locator('//button[contains(@data-testid,"cc-btn-remove")]').first();
        
    }
    async checkIfTotalAmountIsCorrect(isCustomized:boolean, resultsPageAmount: string, productDetailsAmount: string) {
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(1000); // Wait for any potential animations to finish
        await this.customAssert.toBeVisible(this.totalAmount);
        await this.customAssert.toBeVisible(this.addToCartIconCounter);
        const cartTotalAmount = await this.totalAmount.textContent();
        if (isCustomized) {
             await this.customAssert.toBeVisibleWithText(this.totalAmount, productDetailsAmount);
             await this.customAssert.toBeVisibleNotToHaveText(this.totalAmount, resultsPageAmount);
        } else {
            await this.customAssert.toBeVisibleWithText(this.totalAmount, productDetailsAmount);
            await this.customAssert.toBeVisibleWithText(this.totalAmount, resultsPageAmount);
        }
    }

    async checkIfAddToCartIconCounterHasOneItem() {
        const cartIconCounter = await this.addToCartIconCounter.textContent();
        await this.customAssert.toBeVisibleWithText(this.addToCartIconCounter, '1');
    }

    async removeProductFromCart() {  
        try {
            await this.removeProductButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.removeProductButton.scrollIntoViewIfNeeded();
            console.log('Remove button is visible and scrolled into view');
            // Click the remove button
            console.log('Attempting to click the remove button')
            await this.removeProductButton.click();
            await this.page.waitForTimeout(1000); // Wait for the action to complete
            console.log('Remove button clicked successfully');
        } catch (error) {
            console.error('Error clicking remove button:', error);
            throw error; // Re-throw the error to ensure the test fails
        }
        
    }

    async getCompleteItemName() {  
        await this.customAssert.toBeVisible(this.removeProductButton);
        let ariaLabelOfButton = await this.removeProductButton.getAttribute('aria-label');
        ariaLabelOfButton = ariaLabelOfButton?.trim() || '';
        ariaLabelOfButton = ariaLabelOfButton.replace('Remove ', '');
        return ariaLabelOfButton
    }
}
