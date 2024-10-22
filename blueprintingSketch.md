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

##### Trips
- Requires a route, pattern, and calendar to enable journeys feature

---

### Gherkin Scenario Blueprinting

#### Patterns
Scenario: Create a New Pattern
- Given we are viewing the 'Patterns' tab for a specific feed
 - And we have existing routes
    - Use cy.request to create routes for testing
- When we select the 'New' button
- Then we should be able to successfully create a pattern

###### Why test this function?
Manually submitting forms during acceptance and regression testing can become laborious. Since these are behaviors which do not require a human's eye for detail, we can safely automate them and let the computer take care of it.

Scenario Outline: Pattern Creation Requires Existing Routes
- Given we are viewing a specific feed
  - And we '<do_or_do_not>' have existing routes
    - Check for routes prior to action statements
      - Use cy.request to delete any existing routes for setup
    - Use cy.request to create routes for second leg of scenario outline
- When we select 'Patterns'
- Then we '<should_or_should_not>' be able to create a new pattern
  - Use cy.request to delete any added routes for teardown
- Examples: 'do', 'do not', 'should', 'should not'

###### Why test this function?
This is a critical feature for the 'Patterns' tab. Given this, we want to ensure that new patterns cannot be created unless we have an existing route.

---

#### Trips
Scenario Outline: Create a New Trip
- Given we are viewing the 'Trips' tab for a specific feed
  - And we have existing routes, patterns, and calendars
- When we select to '<create_or_delete>' a trip
- Then our trip should be successfully '<created_or_deleted>'
- Examples: 'create', 'delete', 'created', 'deleted'

###### Why test this function?
Manually submitting forms during acceptance and regression testing can become laborious. Since these are behaviors which do not require a human's eye for detail, we can safely automate them and let the computer take care of it.

Scenario Outline: Trip Creation Requires Existing Routes, Patterns, and Calendars
- Given we are viewing a specific feed
  - And we '<do_or_do_not>' have existing routes, patterns, and calendars
- When we select 'Trips'
- Then we '<should_or_should_not>' be able to create a new trip
- Examples: 'do', 'do not', 'should', 'should not'

###### Why test this function?
This is a critical feature for the 'Trips' tab. Given this, we want to ensure that new trips cannot be created unless each item (route, pattern, calendar) has been satisfied.

---

#### Calendars
Scenario: Calendars Indicate the Number of Trips they are Used By
- Given we are viewing the 'Trips' tab for a specific feed
- When we create a trip using an existing calendar
  - And navigate to the 'Calendars' tab
- Then the calendar should indicate trip usage

###### Why test this function?
I feel this is an element of the application which, if not expressly known about, can slip between the cracks during acceptance and regression testing. With this in mind, I felt it pertinent to add as an automation candidate.
