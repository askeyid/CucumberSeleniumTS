Feature: As a user I can interract with checkboxes

    @smoke
    @regression
    Scenario: As a user I can interract and assert on checkboxes
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "blue" checkbox
        Then the "blue" check box should not be checked
        And the "red" check box should not be checked
        And the "blue" check box should not be checked
        And the "green" check box should not be checked
        And the "grey" check box should not be checked
        When I check the "green" check box
        Then the "green" check box should be checked
        When I uncheck the "green" check box
        Then the "green" check box should not be checked
