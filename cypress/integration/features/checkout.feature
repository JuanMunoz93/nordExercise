Feature: purchase licenses site

@Task2 @FE
Scenario: Challenge
    Given I am in the nordsecurity products site
    When I select the nordvpn product
    And I click on the login link
    And I am redirected to the login site
    And I go back to the product site
    And I select the one year license
    And I continue to the payment
    Then The prices between the plan selection and checkout are the same

 @FE
Scenario: Verify login redirect on plan selection
    Given I am in the nordsecurity products site
    When I select the nordvpn product
    And I click on the login link
    Then I am redirected to the login site

 @FE
Scenario: Verify prices on the purchase proces
    Given I am in the nordsecurity products site
    When I select the nordvpn product
    And I select the one year license
    And I continue to the payment
    Then The prices between the plan selection and checkout are the same
