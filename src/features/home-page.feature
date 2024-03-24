Feature: As a user I expect to be able to navigate the home page

    @dev
    Scenario: As a user I expect to be able to see the contacts header
        Given I am on the "Contacts" page
        And the "[data-id='contacts']" should contain the text "Contacts"
        Then the "header logo" should be displayed
