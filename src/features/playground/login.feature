Feature: As a user I can interact with login forms

    @smoke
    @regression
    Scenario: As a user I can populate login details leveraging environment variables - localhost
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "login form" form
        And I fill in the "email" input with "$.TEST_EMAIL"
        And I fill in the "password" input with "$.TEST_PASSWORD"
        And the "email" should contain the value "$.TEST_EMAIL"
        And the "password" should contain the value "$.TEST_PASSWORD"
        When I click the "login button" button