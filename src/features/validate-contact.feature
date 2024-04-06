Feature: As a user I expect to be able validate a new contact

    @smoke
    @regression
    Scenario: As a user I can hit a validation error on each field then create a new contact
        Given I navigate to the "home" page
        When I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        And the "gender" should equal the value "Male"
        And I select the "Other" option from the "gender"
        And the "gender" should equal the value "Other"

        When I click the "save" button
        Then the "error message" should contain the text "Error: The "name" field can't be empty."
        And I fill in the "name" input with "Alex Smith"

        When I click the "save" button
        Then the "error message" should contain the text "Error: The "phone" field can't be empty."
        And I fill in the "phone" input with "0951234567"

        When I click the "save" button
        Then the "error message" should contain the text "Error: The "street" field can't be empty."
        And I fill in the "street" input with "Main Avenue"

        When I click the "save" button
        Then the "error message" should contain the text "Error: The "city" field can't be empty."
        And I fill in the "city" input with "New-City"

        When I click the "save" button
        Then the "error message" should not be displayed
