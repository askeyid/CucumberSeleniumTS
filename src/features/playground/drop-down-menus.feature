Feature: As a user I can interact with drop down menus

    @smoke
    @regression
    Scenario: As a user I can interact and assert on drop down menus
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "drop down button" button
        When I click the "drop down button" button
        Then the "drop down profile" should contain the text "Profile"
        And the "drop down my account" should contain the text "My account"
        And the "drop down logout" should contain the text "Logout"
        When I click the "drop down logout" button
        Then the "drop down profile" should not be displayed
        Then the "drop down my account" should not be displayed
        Then the "drop down logout" should not be displayed