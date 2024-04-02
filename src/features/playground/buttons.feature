Feature: As a user I can interact with buttons

    @smoke
    @regression
    Scenario: As a user I can interact and asser on buttons at index
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the 1st "my button" button
        When I click the 1st "my button" button
        Then the 1st "my button" should contain the text "ONE"
        When I click the 2nd "my button" button
        Then the 2nd "my button" should contain the text "TWO"
        When I click the 3rd "my button" button
        Then the 3rd "my button" should contain the text "THREE"
