import {
  Given,
  When,
  And,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';
import TripsUtil from '../../support/architect/utilities/TripsUtil';

beforeEach(() => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);

  FeedsUtil.selectFeedWithApi(1);
});

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
  })
});

When('we select to create a new trip', () => {
  TripsUtil.createTrip('midnightLine', 'No', 'No')
});

Then('our trip should be successfully created', () => {
  cy.get('div')
    .contains('Midnight Line')
    .should('exist')
})
after(() => {
  cy.get('div')
    .contains('Midnight Line')
    .find('.SidebarItem_removeIcon_mbZZ-')
    .click();

  cy.wait(50)
})
