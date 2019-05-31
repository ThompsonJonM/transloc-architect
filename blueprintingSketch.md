### Blueprinting Notes
##### Main Page
  - Upload feed widget
    - Supports drag and drop actions
    - Requires cypress-file-upload
  - Left Rail
    - New feed button
    - Listing of feeds in left rail
      - Existing feeds may be selected
      - Ellipsis menu

##### Navigation Header
  - Help URL
  - User URL
  - Dropdown selector
  - Logout button
  - All feeds button

##### New Feed Page
  - Feed info form
    - Negative tests for error messaging
    - Date widget
  - Agency info form
    - Negative tests for error messaging
  - Cancel button
  - Save button
  - Tooltips

##### Existing Feed Page
- Edit an existing feed
- Add routes, patterns, etc to an existing feed

##### Stops
- Geographic map display
  - Enter LAT and LONG for pin drop
  - Ensure form can be completed
  - Verify sidebar shows name and code of the submitted stop
- Great candidate for scenario outline
  - Multiple entries based on data table

##### Patterns
- Require a route to enable patterns feature
  - May be good candidate for negative and positive testing
    - Verify patterns cannot be created until routes have been
    - Verify patterns can be created for an existing route

##### Journeys
- Requires a route, pattern, and calendar to enable journeys feature

---

### Gherkin Scenario Blueprinting

##### Patterns
Scenario: Create a New Pattern
- Given we are viewing a specific feed
 - And we have existing routes
    - Use cy.request to create routes for testing
- When we select 'Patterns'
 - And select 'New'
- Then we should be able to successfully create a pattern

OR

Scenario Outline: Patterns Require Existing Routes
- Given we are viewing a specific feed
  - And we '<do_or_do_not>' have existing routes
    - Check for routes prior to action statements
      - Use cy.request to delete any existing routes for setup
    - Use cy.request to create routes for second leg of scenario outline
- When we select 'Patterns'
- Then we '<should_or_should_not>' be able to create a new pattern
  - Use cy.request to delete any added routes for teardown
