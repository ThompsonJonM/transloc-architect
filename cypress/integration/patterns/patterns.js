import {
  Given,
  When,
  And,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import * as CONSTANTS from '../../support/architect/constants';
import RoutesUtil from '../../support/architect/utilities/RoutesUtil';
import PatternsUtil from '../../support/architect/utilities/PatternsUtil';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';

/**
 * Scenario: Pattern Creation Requires Existing Routes
 *
 * @param do_or_do_not                The type of set up we are testing
 * @param should_or_should_not        The type of assertion we are passing
 */
Given('we are viewing a specific feed', () => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);
  FeedsUtil.selectFeedWithApi(1);

  PatternsUtil.deletePatternWithApi();
  RoutesUtil.deleteRouteWithApi();

  cy.get(CONSTANTS.FEED.FEED_NAME_SELECTOR)
    .should('have.value', CONSTANTS.FEED.TESTING_FEED_NAME)
});

And('we {string} have existing routes', (do_or_do_not) => {
  if(do_or_do_not == 'do') {
    RoutesUtil.createRouteWithApi('irvingPark')

    cy.get(CONSTANTS.FEED.ROUTES_SELECTOR)
      .click();

    cy.url()
      .should('include', 'routes');

    cy.get(CONSTANTS.SIDEBAR.SIDEBAR_BODY_SELECTOR)
      .should('contain', 'Irving Park');
  } else if(do_or_do_not == 'do not') {
    cy.get(CONSTANTS.FEED.ROUTES_SELECTOR)
      .click();

    cy.url()
      .should('include', 'routes');

    cy.get(CONSTANTS.SIDEBAR.SIDEBAR_BODY_SELECTOR)
      .should('contain', CONSTANTS.ROUTES.NO_ROUTES_MESSAGE);
  } else {
    throw new Error('Invalid example entry. This test requires "do" or "do not".')
  }
});

When('we select "Patterns"', () => {
  cy.get(CONSTANTS.NAVIGATION.FEED_LINK_SELECTOR)
    .contains(CONSTANTS.FEED.TESTING_FEED_NAME)
    .click();

  cy.get(CONSTANTS.FEED.PATTERN_SELECTOR)
    .click();

  cy.url()
    .should('contain', 'patterns')
});

Then('we {string} be able to create a new pattern', (should_or_should_not) => {
  if(should_or_should_not == 'should') {
      cy.get(CONSTANTS.PATTERNS.NEW_PATTERN_SELECTOR)
        .should('be.visible');

      RoutesUtil.deleteRouteWithApi();
  } else if(should_or_should_not == 'should not') {
      cy.get(CONSTANTS.PATTERNS.NEW_PATTERN_SELECTOR)
        .should('not.be.visible');
  } else {
    throw new Error('Invalid example entry. This test requires "should" or "should not".')
  }

  RoutesUtil.createRouteWithApi('irvingPark');
  PatternsUtil.createPatternWithApi();
})
