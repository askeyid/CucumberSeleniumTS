Feature: As a user I can interact and assert on cards

    @smoke
    @regression
    Scenario: As a user I can interact and assert on cards
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "card header" element
        And the "card header" should equal the text "Word of the Day"
        And the "card main" should equal the text "Automation"
        And the "card type" should equal the text "noun"
        And the "card overview" should contain the text "Automate the execution of tests"
        And the "card overview" should contain the text "compares actual with expected"
        And the "card action" should equal the text "LEARN MORE"
