export class ProductSelectionPage{

    webElements = {
        nordVpnBtn: () => cy.get("a[data-testid='ProductGroupButton'][href*='nordvpn']"),
    }


    selectNordVpnProduct(){
        this.webElements.nordVpnBtn().click();
    }

}