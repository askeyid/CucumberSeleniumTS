Feature: As a user I expect to be able to create contacts

    @smoke
    @regression
    Scenario: As a user I expect to be able to create a new contact
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
        And the "full name label" should contain the text "Name:"
        And the "name" should equal the text "Alex Smith"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should equal the text "Other"
        And the "address label" should contain the text "Address:"
        And the "address" should equal the text "Main Avenue, New-City"
        And the "edit" should be displayed
        And the "delete" should be displayed

    @smoke
    @regression
    Scenario: As a user I do not expect s saved contact to persist after page refresh
        Given I navigate to the "home" page
        When I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        Then I fill in the "name" input with "Tanya Hardie"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "0957654321"
        And I fill in the "street" input with "Poor Avenue"
        And I fill in the "city" input with "Kyiv"
        When I click the "save" button
        Then I am directed to the "home" page
        And I fill in the "search" input with "Tanya Hardie"
        And the "contact" should be displayed
        Given I refresh the "home" page
        Then I fill in the "search" input with "Tanya Hardie"
        And the "contact" should not be displayed
