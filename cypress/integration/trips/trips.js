import {
  Given,
  When,
  And,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import * as CONSTANTS from '../../support/architect/constants';
import TripsUtil from '../../support/architect/utilities/TripsUtil';

/**
 * Scenario: Create a New Trip
 */
Given('we are viewing the "Trips" tab for a specific feed', () => {
  cy.get(CONSTANTS.FEED.TRIPS_SELECTOR)
    .click();

  cy.url()
    .should('include', 'trips');
});

And('we have existing routes, patterns, and calendars', () => {
  const constantsArray = [
    CONSTANTS.TRIPS.CALENDAR_DROPDOWN_SELECTOR,
    CONSTANTS.TRIPS.ROUTE_DROPDOWN_SELECTOR,
    CONSTANTS.TRIPS.PATTERN_DROPDOWN_SELECTOR
  ];

  constantsArray.forEach(($selector) => {
    cy.get($selector)
      .children()
      .should('have.length', 1)
  });
});

When('we create a new trip', () => {
  TripsUtil.createTrip('Midnight Line', 'No', 'No')
});

Then('our trip should be successfully created', () => {
  cy.get(CONSTANTS.NAVIGATION.BREADCRUMB_PREVIOUS_SELECTOR)
    .click();

  cy.get(CONSTANTS.TRIPS.EXISTING_TRIP_SELECTOR)
    .contains('Midnight Line')
    .should('be.visible');

  /**
  * Clean up the environment by deleting the trip created during testing
  */
  cy.get('div')
    .contains('Midnight Line')
    .find('.SidebarItem_removeIcon_mbZZ-')
    .click();
})
