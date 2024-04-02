Feature: As a user I can interact and asser on browser alerts

    @smoke
    @regression
    Scenario: As a user I can interact and assert on browser alerts
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "browser alert" button
        When I click the "browser alert" link
        And I click accept on the alert dialog
        And I click the "browser alert" link
        And I click dismiss on the alert dialog
