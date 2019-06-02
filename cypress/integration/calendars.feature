Feature: Calendars
  As a TransLoc user
  I want to be informed of whether my calendar is in use or not

  Scenario: Calendars Indicate the Number of Trips they are Used By
    Given we are viewing the "Trips" tab for a specific feed
    When we create a trip using an existing calendar
    And navigate to the "Calendars" tab
    Then the calendar should indicate trip usage
