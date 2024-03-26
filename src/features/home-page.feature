Feature: As a user I expect to be able to navigate the home page

    @dev @smoke @regression
    Scenario: As a user I expect to be able to see the contacts header
        Given I am on the "<HEADER_CLASS>" page
        Then the "<HEADER_ID>" should contain the text "<HEADER_TEXT>"
        Then the "<HEADER_LOGO_DATA_ID>" should be displayed

        Examples:
            | HEADER_CLASS | HEADER_ID            | HEADER_TEXT | HEADER_LOGO_DATA_ID     |
            | Contacts     | [data-id='contacts'] | Contacts    | [data-id='header-logo'] |
            # | DUMMY        | [data-id='contacts'] | Contacts    | [data-id='header-logo'] |
            | Contacts     | [data-id='DUMMY']    | Contacts    | [data-id='header-logo'] |
            # | Contacts     | [data-id='contacts'] | Contacts    | [data-id='header-logo'] |
