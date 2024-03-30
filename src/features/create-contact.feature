Feature: As a user I expect to be able to create contacts

    @smoke
    Scenario: As a user I expect to be able to create a new contact
        Given I am on the "home" page
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
        And I fill in the "search" input with "Smith"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Alex Smith"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Other"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "Main Avenue, New-City"
        And the "edit" should be displayed
        And the "delete" should be displayed
        
    #@smoke
    Scenario: As a user I expect to be able to create a new contact
        Given I am on the "home" page
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

    #@smoke
    Scenario: As a user I expect to be able to create a new contact
        Given I am on the "home" page
        When I click the "create" button
        Then I am directed to the "create contact" page
        Then the "create contact header" should contain the text "Create Contact"
        Then I fill in the "name" input with "Alex Smith"
        And I select the "Otherr" option from the "gender"
        And I fill in the "phone" input with "0951234567"
        And I fill in the "street" input with "Main Avenue"
        And I fill in the "city" input with "New-City"
        When I click the "save" button
        Then I am directed to the "home" page
