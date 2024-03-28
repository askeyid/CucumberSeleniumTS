Feature: As a user I expect to be able to create contacts

    @smoke
    Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    When I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"