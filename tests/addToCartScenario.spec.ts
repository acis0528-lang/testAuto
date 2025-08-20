
import { test, expect } from '../fixtures/baseFixtures';
import { TestData } from '../utils/data/TestData'

test('Add to Cart Scenario with Customisation', { tag: ['@addToCart'] }, async ({ mainPage, productDetailsPage, shoppingCartPage, page, customAssert }) => {

  const itemToBeSearched = TestData.ItemToBeSearched;
  let isCustomized = true;
  let resultsPageAmount: string | undefined;
  let totalPrice: string | undefined;
  let completeItemName: string | undefined;

  test.step(`Go to balsamhill page: ${itemToBeSearched[0].value}`, async () => {
    await mainPage.navigateMainPage();
  });

  test.step(`search for '${itemToBeSearched[0].value}'`, async () => {
    await mainPage.fillSearchBox(itemToBeSearched[0].value);
  });

  resultsPageAmount = await mainPage.getResultsPageAmount(3);

  test.step(`Select the third result that appears on the results page.`, async () => {
    await mainPage.selectProductBasedNumberOfSearch(3);
  });

  test.step(`On the product selection page, choose any available customization options.`, async () => {
    await productDetailsPage.setCustomizableFields(isCustomized, TestData.getCustomizableFields);

  });

  totalPrice = await productDetailsPage.getTotalPrice() || '';

  test.step(`Click Add to Cart.`, async () => {
    await productDetailsPage.clickAddToCartButton();
  });

  test.step(`Click View Cart.`, async () => {
    await productDetailsPage.clickViewToCartButton();
  });

  test.step(`Validate that the price from displayed on the results page is the same on the product page and the cart page`, async () => {
    await shoppingCartPage.checkIfTotalAmountIsCorrect(isCustomized, resultsPageAmount as string, totalPrice as string);
  });

  test.step(`Validate that the Cart icon shows the number 1, indicating an item has been added`, async () => {
    await shoppingCartPage.checkIfAddToCartIconCounterHasOneItem();
  });

  completeItemName = await shoppingCartPage.getCompleteItemName();

  test.step(`Click the trash can icon to remove the item from the cart`, async () => {
    await shoppingCartPage.removeProductFromCart();
  });

  test.step(`Validate the removal confirmation dialog that states ${completeItemName} has been removed'`, async () => {
    await customAssert.toShowNotification(page, `${completeItemName} has been removed.`, 5000);
  });

  test.step(`Close the webpage`, async () => {
    await page.close();
  });

});