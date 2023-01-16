require('@cypress/xpath');

export class CheckoutPage{

    webElements = {
        loginLint: () => cy.get("a[data-testid='UserProfile-login-button']"),
        proceedToPaymentBtn: () => cy.xpath('//a[@data-testid="PaymentButton" and not(@disabled)]'),
        
        //oneYearSubBtn: () => cy.xpath('//button[@data-testid="MainPlanCard-button" and contains(.,"45") and not(@disabled)]', { timeout: 10000 }),
        //oneYearSubPriceLbl: () => cy.xpath('//button[@data-testid="MainPlanCard-button" and contains(.,"45")]//span[@data-testid="TotalBilledText-total-price"]'),
        allSubsOptions: () => cy.get('button[data-testid="MainPlanCard-button"]'),
        allSubsPriceLbl: () => cy.get('button[data-testid="MainPlanCard-button"] span[data-testid="TotalBilledText-total-price"]'),
        disabledBtns: () => cy.get('button[data-testid="MainPlanCard-button"]:disabled'),
    }

    waitUntilSiteLoads(){
        //this.webElements.oneYearSubBtn().should('be.visible');

        this.webElements.disabledBtns().should('have.length', 0);
    }

    goToLogin(){
        this.webElements.loginLint().click();
    }

    selectOneYearPlan(){
        //this.webElements.oneYearSubBtn().click();
        //const plans = this.webElements.allSubsOptions();
        
        this.webElements.allSubsOptions().eq(1).click();
    }

    getOneYearSubscriptionPrice(){

        /*
        this.webElements.oneYearSubPriceLbl()
        .invoke('text')
        .then((elementText) => {
            elementText=elementText.replace('€', '');
            cy.wrap(elementText).as('oneYearSubPriceOnSelection')
        })*/
        
        this.webElements.allSubsPriceLbl().eq(1)
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