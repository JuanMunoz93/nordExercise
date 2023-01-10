require('@cypress/xpath');

export class CheckoutPage{

    webElements = {
        loginLint: () => cy.get("a[data-testid='UserProfile-login-button']"),
        oneYearSubBtn: () => cy.xpath('//button[@data-testid="MainPlanCard-button" and contains(.,"45") and not(@disabled)]', { timeout: 10000 }),
        oneYearSubPriceLbl: () => cy.xpath('//button[@data-testid="MainPlanCard-button" and contains(.,"45")]//span[@data-testid="TotalBilledText-total-price"]'),
        proceedToPaymentBtn: () => cy.xpath('//a[@data-testid="PaymentButton" and not(@disabled)]'),
    }

    waitUntilSiteLoads(){
        this.webElements.oneYearSubBtn().should('be.visible');
    }

    goToLogin(){
        this.webElements.loginLint().click();
    }

    selectOneYearPlan(){
        this.webElements.oneYearSubBtn().click();
    }

    getOneYearSubscriptionPrice(){
        this.webElements.oneYearSubPriceLbl()
        .invoke('text')
        .then((elementText) => {
            elementText=elementText.replace('€', '');
            cy.wrap(elementText).as('oneYearSubPriceOnSelection')
        })
    }

    proceedToPayment(){
        this.webElements.proceedToPaymentBtn().click();
    }
}