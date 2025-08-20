import { Page, Locator } from '@playwright/test';


export class MainPage {
    private readonly searchBox: Locator;
    private readonly productLink: (order: number) => Locator;
    private readonly resultsPageAmount: (order: number) => Locator;
    page: any;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByTestId('constructor-search-input');
        this.productLink = (order: number) => {
            return this.page.locator('//a[contains(@data-testid,"productListing") and contains(@href,"https://www.balsamhill.com")]//img').nth(order);
        };
        this.resultsPageAmount = (order: number) => {
            return this.page.locator('//span[contains(@data-testid,"undefinedprice")]').nth(order);
        }
    }

    async navigateMainPage() {
        await this.page.goto('https://www.balsamhill.com/'); // Replace with the actual URL
    }

    async fillSearchBox(itemToBeSearched: any) {
        await this.page.waitForLoadState('load');
        await this.searchBox.click();
        await this.searchBox.fill(itemToBeSearched);
        await this.searchBox.press('Enter');
    }

    async selectProductBasedNumberOfSearch(chronologicalOrder: number) {
        await this.productLink(chronologicalOrder - 1).click();
    }

    async getResultsPageAmount(chronologicalOrder: number) {
        const amount = await this.resultsPageAmount(chronologicalOrder - 1).textContent();
        return amount ? amount.trim() : '';
    }


}