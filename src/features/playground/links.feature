Feature: As a user I can interact with links

    @smoke
    @regression
    Scenario: As a user I can interact and assert on links
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "primary" button
        Then the "primary" should contain the text "PRIMARY"
        And the "secondary" should not be enabled
        And the "secondary" should equal the text "DISABLED"
        When I click the "third" link
        Then the "third" should contain the text "LINK"
