Feature: As a user I can refresh the browser and see the application

    @smoke
    @regression
    Scenario: As a user I can refresh the browser and continue the use the application
        Given I navigate to the "home" page
        And I refresh the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        Given I refresh the "playground" page