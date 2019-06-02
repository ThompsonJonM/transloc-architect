Feature: Trips
  As a TransLoc Architect user
  I would like to create new Trips

  Scenario Outline: Create a New Trip
    Given we are viewing the 'Trips' tab for a specific feed
    And we have existing routes, patterns, and Calendars
    When we select to '<create_or_delete>' a trip
    Then our trip should be successfully '<created_or_deleted>'

    Examples:
      | create_or_delete | created_or_deleted |
      | create | created |
      | delete | deleted |
