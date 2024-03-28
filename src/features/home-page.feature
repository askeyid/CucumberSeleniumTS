Feature: As a user I expect to be able to navigate the home page

    @dev
    #@smoke @regression
    Scenario: As a user I expect to be able to see the contacts header
        Given I am on the "<PAGE_ID>" page
        Then the "<HEADER_ID>" should contain the text "<HEADER_TEXT>"
        Then the "<HEADER_LOGO_DATA_ID>" should be displayed

        Examples:
            | PAGE_ID | HEADER_ID       | HEADER_TEXT | HEADER_LOGO_DATA_ID |
            | home    | contacts header | Contacts    | header logo         |
            