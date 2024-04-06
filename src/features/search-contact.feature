Feature: As a user I expect to be able to search a new contact

    @smoke
    @regression
    Scenario: As a user I don't expect to see a contact that does not exist
        Given I navigate to the "home" page
        Then I fill in the "search" input with "Funky name"
        And the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"


    @regression
    Scenario: As a user I can search on a newly created and edited contact and see full contact details
        Given I navigate to the "home" page
        When I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        Then I fill in the "name" input with "Alex Smith"
        And I select the "Other" option from the "gender"
        And I fill in the "phone" input with "0951234567"
        And I fill in the "street" input with "Main Avenue"
        And I fill in the "city" input with "New-City"
        When I click the "save" button

        Then I am directed to the "home" page
        And I fill in the "search" input with "Alex Smith"
        And the "contact" should be displayed
        When I click the "edit" button

        Then I am directed to the "edit contact" page
        And I fill in the "name" input with "Homer Simpson"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "7654321590"
        And I fill in the "street" input with "Little Street"
        And I fill in the "city" input with "Kyiv"
        When I click the "save" button

        Then I am directed to the "home" page
        And I fill in the "search" input with "Alex Smith"
        And the "contact" should not be displayed
        And I fill in the "search" input with "Homer Simpson"
        And the "contact" should be displayed