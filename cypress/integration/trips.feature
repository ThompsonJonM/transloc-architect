Feature: Trips
  As a TransLoc Architect user
  I would like to create new Trips

  Scenario: Create a New Trip
    Given we are viewing the "Trips" tab for a specific feed
    And we have existing routes, patterns, and calendars
    When we create a new trip
    Then our trip should be successfully created
