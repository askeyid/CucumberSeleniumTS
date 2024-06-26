Feature: As a user I can interact with tabs

    @smoke
    @regression
    Scenario: As a user I can interact and assert on tabs
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "new tab" button
        When I click the "new tab" button
        Then the 2nd tab should contain the title "Contacts"
        And the 1st tab should contain the title "Playground"
        And I fill in the "search" input on the 2nd tab with "Sloane Juarez"
        And the "contact" on the 2nd tab should be displayed
        And the "full name label" on the 2nd tab should contain the text "Name:"
        And the "name" on the 2nd tab should equal the text "Sloane Juarez"
        And the "gender label" on the 2nd tab should contain the text "Gender:"
        And the "gender" on the 2nd tab should equal the text "Female"
        And the "address label" on the 2nd tab should contain the text "Address:"
        And the "address" on the 2nd tab should equal the text "8162 Tincidunt Rd., Ludhiana"
        And the "edit" on the 2nd tab should be displayed
        And the "delete" on the 2nd tab should be displayed
