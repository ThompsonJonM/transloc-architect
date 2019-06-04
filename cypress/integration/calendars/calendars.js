import {
  Given,
  When,
  And,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import * as CONSTANTS from '../../support/architect/constants';
import CalendarsUtil from '../../support/architect/utilities/CalendarsUtil';
import TripsUtil from '../../support/architect/utilities/TripsUtil';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';

/**
 * Scenario: Calendars Indicate the Number of Trips they are Used By
 */
Given('we are viewing the "Trips" tab for a specific feed', () => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);
  FeedsUtil.selectFeedWithApi(1);
  
  cy.get(CONSTANTS.FEED.CALENDARS_SELECTOR)
    .click();

  CalendarsUtil.queryCalendarWithApiAndSetAliases();

  cy.get(CONSTANTS.NAVIGATION.FEED_LINK_SELECTOR)
    .contains('Automation')
    .click();

  cy.get(CONSTANTS.FEED.TRIPS_SELECTOR)
    .click();

  cy.url()
    .should('include', 'trips');
});

When('we create a trip using an existing calendar', () => {
  TripsUtil.createTripWithApi('earlyMorningLine');
});

And('navigate to the "Calendars" tab', () => {
  cy.get(CONSTANTS.NAVIGATION.FEED_LINK_SELECTOR)
    .contains('Automation Testing Feed')
    .click();

  cy.get(CONSTANTS.FEED.CALENDARS_SELECTOR)
    .click();

  cy.url()
    .should('include', 'calendars');
});

Then('the calendar should indicate trip usage', () => {

  /**
  * Get the alias from the before step, then get the calendar and its current
  * trip usage. Once done, compare the alias with current trip usage
  */
  cy.get('@usageBefore')
    .then(($usageBefore) => {
      cy.log($usageBefore);

      cy.get('@calendar')
        .find('p')
        .contains('trip')
        .then(($usageAfter) => {
          expect($usageBefore).to.not.eq($usageAfter.text())
        });
    });
})
