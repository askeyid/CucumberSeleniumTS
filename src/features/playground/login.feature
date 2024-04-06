Feature: As a user I can interact with login forms

    @smoke
    @regression
    Scenario Outline: As a user I can populate login details leveraging environment variables
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "login form" form
        And I fill in the "email" input with "$.TEST_EMAIL"
        And I fill in the "password" input with "$.TEST_PASSWORD"
        And the "email" should contain the value "admin@testingtalkshub.com.au"
        And the "password" should contain the value "<password>"
        And I scroll to the "login button" button
        When I click the "login button" button
        And I click accept on the alert dialog

        @localhost
        Examples:
            | password     |
            | Password1234 |

        @production
        Examples:
            | password           |
            | verySecretPassword |

    @smoke
    @regression
    Scenario Outline: As a user I expect validation on the login input for an incorrect email
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "login form" form
        And I fill in the "email" input with "<email>"
        And the "email error" should contain the text "Please include an '@' in the email address."

        Examples:
            | email            |
            | com.testingtalks |
            | testingtalks     |
            | com              | 

    @smoke
    @regression
    Scenario: As a user I am able to input a random email
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        And I scroll to the "login form" form
        And I fill in the "email" input with random "email"
        And I fill in the "password" input with random "password"
