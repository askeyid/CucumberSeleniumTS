Feature: As a user I expect to be able to edit a contact

    @smoke
    @regression
    Scenario: As a user I can edit a newly created contact
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
        And I select the "Male" option from the "gender"
        When I click the "save" button

        Then I am directed to the "home" page
        And I fill in the "search" input with "Alex Smith"
        And the "contact" should be displayed
        And the "gender" should contain the text "Male"