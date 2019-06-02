Feature: Patterns
  As a TransLoc Architect user
  I would like to create new Patterns

  Scenario Outline: Pattern Creation Requires Existing Routes
    Given we are viewing a specific feed
    And we '<do_or_do_not>' have existing routes
    When we select 'Patterns'
    Then we '<should_or_should_not>' be able to create a new pattern

    Examples:
      | do_or_do_not | should_or_should_not |
      | do | should |
      | do not | should not |
