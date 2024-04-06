Feature: As a user I expect to be able to delete a contact

    @smoke
    @regression
    Scenario: As a user I can delete an existing contact
        Given I navigate to the "home" page
        Then I fill in the "search" input with "Abraham Perry"
        And the "contact" should be displayed
        When I click the "delete" button
        And I click accept on the alert dialog
        Then the "contact" should not be displayed
