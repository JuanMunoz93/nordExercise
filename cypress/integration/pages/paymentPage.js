

export class PaymentPage{

    webElements = {
        priceWithoutTaxesLbl: () => cy.get("div[data-testid='SelectedCartSummaryCard-total-price']"),
    }


    verifyPriceToPay(){
        this.webElements.priceWithoutTaxesLbl()
        .invoke('text')
        .then((secondPrice) => {
            secondPrice=secondPrice.replace('€', '');
            cy.get('@oneYearSubPriceOnSelection').then((firstPrice)=>{
                assert.equal(secondPrice,firstPrice)
            })
        })
    }
}