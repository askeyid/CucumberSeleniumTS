Feature: As a user I can interact with tooltips

    @smoke
    @regression
    Scenario: As a user I can interact with tooltips
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "tooltip" tooltip
        And the "tooltip" "title" attribute should contain the text "This is a tooltip"