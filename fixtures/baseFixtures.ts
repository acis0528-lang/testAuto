import { test as base, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage';
import { ProductDetailsPage } from '../page/ProductDetailsPage';
import { ShoppingCartPage } from '../page/ShoppingCartPage';
import { CustomAssertions } from '../utils/CustomAssertions';


type CustomFixtures = {
  
  mainPage: MainPage;
  productDetailsPage: ProductDetailsPage;
  shoppingCartPage: ShoppingCartPage;
  customAssert: CustomAssertions;
  page: any; // This can be used to access the page object directly if needed
};

export const test = base.extend<CustomFixtures>({
  // Auto-login fixture
 

  // Page object fixtures
  page: async ({ page }, use) => {
    await use(page);
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
  customAssert: async ({}, use) => {
        await use(new CustomAssertions())
    },
  
});

export { expect };