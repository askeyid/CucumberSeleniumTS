Feature: Ad a user I can interact with page alerts

    @smoke
    @regression
    Scenario: As a user I can interact and assert on page alerts
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "error alert" alert
        And the "error alert" should contain the text "This is an error alert — check it out!"
        And the "warning alert" should contain the text "This is a warning alert — check it out!"
        And the "info alert" should contain the text "This is an info alert — check it out!"
        And the "success alert" should contain the text "This is a success alert — check it out!"
