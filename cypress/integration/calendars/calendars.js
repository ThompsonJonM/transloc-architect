import {
  Given,
  When,
  And,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import CalendarsUtil from '../../support/architect/utilities/CalendarsUtil'

/**
 * Scenario: Calendars Indicate the Number of Trips they are Used By
 */
Given('we are viewing the "Trips" tab for a specific feed', () => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);

  cy.request({
    "method": "GET",
    "url": CONSTANTS.API_URL + 'feeds',
    "headers": {
      "Authorization": CONSTANTS.API_TOKEN,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    const feed = response.body[1].feed_id;

    cy.get('[data-id=feed-' + feed + ']')
      .click();
  });

  cy.get(CONSTANTS.FEED.TRIPS_SELECTOR)
    .click();
});

When('we create a trip using an existing calendar', () => {
  cy.url()
    .should('include', 'trips');

  cy.get(CONSTANTS.TRIPS.NEW_TRIP_SELECTOR)
    .click();

  cy.get(CONSTANTS.TRIPS.TRIP_NAME_SELECTOR)
    .type('Early Morning Trip')

  cy.get(CONSTANTS.TRIPS.BIKES_DROPDOWN_SELECTOR)
    .select('Yes');

  cy.get(CONSTANTS.TRIPS.WHEELCHAIR_DROPDOWN_SELECTOR)
    .select('No');

  cy.get(CONSTANTS.TRIPS.STOP_TIME_SELECTOR)
    .each((selectors) => {
      cy.get(selectors)
        .type('0200')
    });

  cy.get(CONSTANTS.TRIPS.SAVE_BUTTON_SELECTOR)
    .click();
});

And('navigate to the "Calendars" tab', () => {
  cy.get(CONSTANTS.NAVIGATION.FEED_LINK_SELECTOR)
    .contains('Automation Testing Feed')
    .click();

  cy.get(CONSTANTS.FEED.CALENDARS_SELECTOR)
    .click();
});

Then('the calendar should indicate trip usage', () => {
  CalendarsUtil.queryCalendarWithApiAndCheckUsage();
})
