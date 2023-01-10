import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import {ProductSelectionPage} from "../../pages/productSelectionPage";
import {CheckoutPage} from "../../pages/checkoutPage";
import {PaymentPage} from "../../pages/paymentPage";

const productSelectionPage= new ProductSelectionPage();
const checkoutPage= new CheckoutPage();
const paymentPage= new PaymentPage();

Given('I am in the nordsecurity products site', () => {
    const url= `${Cypress.env('ecommBaseUrl')}/products`;
    cy.visit(url)
  })

  When('I select the nordvpn product', () => {
    productSelectionPage.selectNordVpnProduct();
  })

  When('I click on the login link', () => {
    checkoutPage.waitUntilSiteLoads();
    checkoutPage.goToLogin();
  })

  Then('I am redirected to the login site', () => {
    cy.url({ timeout: 20000 }).should('contain', '/login')
  })

  When('I select the one year license', () => {
    checkoutPage.getOneYearSubscriptionPrice();
    checkoutPage.selectOneYearPlan();
  })

  When('I continue to the payment', () => {
    checkoutPage.proceedToPayment();
  })

  Then('The prices between the plan selection and checkout are the same', () => {
    paymentPage.verifyPriceToPay();
  })

  And('I go back to the product site', () => {
    cy.go('back');
  })

  