Feature: As a user I expect to be able to navigate the home page

    @smoke
    @regression
    Scenario: As a user I expect to be able to see the contacts header
        Given I navigate to the "home" page
        Then the "contacts header" should contain the text "Contacts"
        Then the "header logo" should be displayed
