Feature: As a user I can interact with avatars

    @smoke
    @regression
    Scenario: As a user I can interact and assert with avatars
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the 1st "avatar" avatar
        Then the 1st "avatar" should be displayed
        Then the 2st "avatar" should be displayed
        Then the "small avatar" should be displayed
        Then I should see 2 "avatar" be displayed
