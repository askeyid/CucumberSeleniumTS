Feature: As a user I can interact with iframes

    @smoke
    @regression
    Scenario: As a user I can interact with iframes
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "basic iframe" iframe
        And I fill in the "search" input on the "basic iframe" iframe with "Alvin Hamilton"
        And the "contact" on the "basic iframe" iframe should be displayed
        And the "full name label" on the "basic iframe" iframe should contain the text "Name:"
        And the "name" on the "basic iframe" iframe should equal the text "Alvin Hamilton"
        And the "gender label" on the "basic iframe" iframe should contain the text "Gender:"
        And the "gender" on the "basic iframe" iframe should equal the text "Male"
        And the "address label" on the "basic iframe" iframe should contain the text "Address:"
        And the "address" on the "basic iframe" iframe should contain the text "296-1266 Dolor. Rd."
        And the "edit" on the "basic iframe" iframe should be displayed
        And the "delete" on the "basic iframe" iframe should be displayed