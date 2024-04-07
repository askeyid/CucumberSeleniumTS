Feature: Generate accessibility reports actorss our website

    @accessibility
    @regression
    Scenario: Generate an accessibility report for the home page
        Given I navigate to the "home" page
        Then I generate an accessibility analysis report

    @accessibility
    @regression
    Scenario: Generate an accessibility report for the playground page
        Given I navigate to the "home" page
        When I click the "playground" button
        Then I am directed to the "playground" page
        Then I generate an accessibility analysis report

    @accessibility
    @regression
    Scenario: Generate an accessibility report for the create contact page
        Given I navigate to the "home" page
        When I click the "create" button
        Then I am directed to the "create contact" page
        Then I generate an accessibility analysis report

    @accessibility
    @regression
    Scenario: Generate an accessibility report for the edit contact page
        Given I navigate to the "home" page
        When I click the 1st "edit" button
        Then I am directed to the "edit contact" page
        Then I generate an accessibility analysis report
