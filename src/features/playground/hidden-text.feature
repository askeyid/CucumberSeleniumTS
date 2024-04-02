Feature: As a user I can interact with hidden text

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on hidden and displayed text
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "show hide text" element
        And the "show hide text" should contain the text "This is visible"
        When I click the "show hide button" button
        Then the "show hide text" should not be displayed