
import { test, expect } from '../fixtures/baseFixtures';
import { TestData } from '../utils/data/TestData'

test('Add to Cart Scenario with Customisation', { tag: ['@addToCart'] }, async ({ mainPage, productDetailsPage, shoppingCartPage,page,customAssert }) => {

  const itemToBeSearched = TestData.ItemToBeSearched;
  let isCustomized = true;

  await mainPage.navigateMainPage();
  await mainPage.fillSearchBox(itemToBeSearched[0].value);
  let resultsPageAmount = await mainPage.getResultsPageAmount(3);
  await mainPage.selectProductBasedNumberOfSearch(3);
  let productName = await productDetailsPage.getProductName();
  await productDetailsPage.setCustomizableFields(isCustomized, TestData.getCustomizableFields);
  let totalPrice = await productDetailsPage.getTotalPrice();
  await productDetailsPage.clickAddToCartButton();
  await productDetailsPage.clickViewToCartButton();
  await shoppingCartPage.checkIfTotalAmountIsCorrect(isCustomized as boolean, resultsPageAmount as string, totalPrice as string);
  await shoppingCartPage.checkIfAddToCartIconCounterHasOneItem();
  let completeItemName = await shoppingCartPage.getCompleteItemName(productName as string);
  await shoppingCartPage.removeProductFromCart(productName as string);
  await customAssert.toShowNotification(page, ` ${completeItemName} has been removed`, 5000);
  
});