
import { test, expect } from '../fixtures/baseFixtures';
import { TestData } from '../utils/data/TestData'


test.describe('Add to Cart Scenario', () => {
  test.beforeEach('Go to balsamhill page', async ({ mainPage }) => {
    await mainPage.navigateMainPage();
  });

  test('Add to Cart Scenario with Customisation', { tag: ['@addToCart'] }, async ({ mainPage, productDetailsPage, shoppingCartPage, page, customAssert }) => {
    test.setTimeout(240000); // Set timeout for the entire test to 2 minutes
    const itemToBeSearched = TestData.ItemToBeSearched;
    let isCustomized = true;
    let resultsPageAmount: string | undefined;
    let totalPrice: string | undefined;
    let completeItemName: string | undefined;

    await test.step(`search for '${itemToBeSearched[0].value}'`, async () => {
      await mainPage.fillSearchBox(itemToBeSearched[0].value);
    });

    await test.step(`Select the third result that appears on the results page.`, async () => {
      resultsPageAmount = await mainPage.getResultsPageAmount(3);
      await mainPage.selectProductBasedNumberOfSearch(3);
    });

    await test.step(`On the product selection page, choose any available customization options.`, async () => {
      await productDetailsPage.setCustomizableFields(isCustomized, TestData.getCustomizableFields);
      totalPrice = await productDetailsPage.getTotalPrice() || '';
    });

    await test.step(`Click Add to Cart.`, async () => {
      await productDetailsPage.clickAddToCartButton();
    });

    await test.step(`Click View Cart.`, async () => {
      await productDetailsPage.clickViewToCartButton();
    });

    await test.step(`Validate that the price from displayed on the results page is the same on the product page and the cart page`, async () => {
      await shoppingCartPage.checkIfTotalAmountIsCorrect(isCustomized, resultsPageAmount as string, totalPrice as string);
    });

    await test.step(`Validate that the Cart icon shows the number 1, indicating an item has been added`, async () => {
      await shoppingCartPage.checkIfAddToCartIconCounterHasOneItem();
      completeItemName = await shoppingCartPage.getCompleteItemName();
    });

    await test.step(`Click the trash can icon to remove the item from the cart`, async () => {
      await shoppingCartPage.removeProductFromCart();
    });

    await test.step(`Validate the removal confirmation dialog that states <Item> has been removed.`, async () => {
      await customAssert.toShowNotification(page, `${completeItemName} has been removed.`);
    });

    test.step(`Close the webpage`, async () => {
      await page.close();
    });
  });



  test('Add to Cart Scenario without Customisation', { tag: ['@addToCart'] }, async ({ mainPage, productDetailsPage, shoppingCartPage, page, customAssert }) => {
    test.setTimeout(240000); // Set timeout for the entire test to 2 minutes
    const itemToBeSearched = TestData.ItemToBeSearched;
    let isCustomized = false;
    let resultsPageAmount: string | undefined;
    let totalPrice: string | undefined;
    let completeItemName: string | undefined;

    await test.step(`search for '${itemToBeSearched[0].value}'`, async () => {
      await mainPage.fillSearchBox(itemToBeSearched[0].value);
    });

    await test.step(`Select the third result that appears on the results page.`, async () => {
      resultsPageAmount = await mainPage.getResultsPageAmount(3);
      await mainPage.selectProductBasedNumberOfSearch(3);
    });

    await test.step(`On the product selection page, choose any available customization options.`, async () => {
      await productDetailsPage.setCustomizableFields(isCustomized, TestData.getCustomizableFields);
      totalPrice = await productDetailsPage.getTotalPrice() || '';
    });

    await test.step(`Click Add to Cart.`, async () => {
      await productDetailsPage.clickAddToCartButton(); 
    });

    await test.step(`Click View Cart.`, async () => {
      await productDetailsPage.clickViewToCartButton();
    });

    await test.step(`Validate that the price from displayed on the results page is the same on the product page and the cart page`, async () => {
      await shoppingCartPage.checkIfTotalAmountIsCorrect(isCustomized, resultsPageAmount as string, totalPrice as string);
    });

    await test.step(`Validate that the Cart icon shows the number 1, indicating an item has been added`, async () => {
      completeItemName = await shoppingCartPage.getCompleteItemName();
      await shoppingCartPage.checkIfAddToCartIconCounterHasOneItem();
    });

    await test.step(`Click the trash can icon to remove the item from the cart`, async () => {
      await shoppingCartPage.removeProductFromCart();
    });

    await test.step(`Validate the removal confirmation dialog that states <Item> has been removed.`, async () => {
      await customAssert.toShowNotification(page, `${completeItemName} has been removed.`);
    });

    test.step(`Close the webpage`, async () => {
      await page.close();
    });

  });

});




