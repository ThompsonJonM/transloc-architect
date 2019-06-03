import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';

/**
* Global before event which logs in as an architect user, then
* uses the API to select a specific feed
*/
before(() => {
  cy.log('Spinning up!')

  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);

  FeedsUtil.selectFeedWithApi(1);
})
