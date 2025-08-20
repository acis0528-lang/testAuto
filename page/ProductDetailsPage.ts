import { Page, Locator } from '@playwright/test';


export class ProductDetailsPage {

    private readonly customizeFields: (custom: string) => Locator;;
    private readonly totalPrice: Locator;
    private readonly addToCartButton: Locator;
    private readonly viewToCartButton: Locator;
    private readonly productName: Locator;
    page: any;

    constructor(page: Page) {
        this.page = page;

        this.customizeFields = (custom: string) => {
            return this.page.getByRole('radio', { name: custom });
        }
        this.totalPrice = this.page.locator('//div[contains(@class,"productDetailContainer_buybox")]//span[contains(@class,"productPrice_new-price")]')
        this.addToCartButton = this.page.getByTestId('produt-detail-container').getByTestId('pdc-btn-addtocart')
        this.viewToCartButton = this.page.getByRole('button', { name: 'View Cart' });
        this.productName = this.page.locator('//div[contains(@class,"productDetailNameRating_product-title")]')
    }
    async setCustomizableFields(customize: boolean, custimizableFields) {
        if (customize) {
            for (const field of custimizableFields) {
                await this.customizeFields(field.value).click();
            }
        }
    }

    async getTotalPrice() {
        let productTotalPrice = this.totalPrice
        await productTotalPrice.click();
        return await productTotalPrice.textContent();
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }

    async clickViewToCartButton() {
        await this.viewToCartButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.viewToCartButton.scrollIntoViewIfNeeded();
        console.log('View Cart button is visible and scrolled into view');
        await this.viewToCartButton.click();
    }

    async getProductName() {
        return await this.productName.locator("//h1").textContent();
    }
}