Feature: As a user I can interact and assert on text areas

    @smoke
    @regression
    Scenario: As a user I can interact and assert on text areas
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "textarea" textarea
        And the "textarea" should contain the value "Testing Talks Hub has been established to teach the community how to build world class automation frameworks using the latest tooling."
        And I fill in the "textarea" input with "obviously smart text"
        And the "textarea" should contain the value "obviously smart text"