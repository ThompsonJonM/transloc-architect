import * as CONSTANTS from '../../support/architect/constants';
import EnvironmentUtil from '../../support/architect/utilities/EnvironmentUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';
import LoginUtil from '../../support/architect/utilities/LoginUtil';

/**
* Before tests run, ensure that we delete the previous testing environment,
* then create a new environment prior to testing
*
* Environments are deleted on start up to ensure that engineers have the ability
* to view the environment in situ following test failures
*/
before(() => {
  cy.log('Deleting previous test environment.')

  FeedsUtil.deleteFeedWithApi();

  cy.log('Creating new test environment.');

  EnvironmentUtil.createEnvironmentWithApi('automation', 'juneCalendar', 'irvingPark', 'earlyEveningLine', 'irvingAndClarendon', 'irvingAndMarine', 'irvingAndPineGrove', 'lakeAndWSheridan', 'marineAndIrvingPark');

  cy.log('Environment successfully created. Spinning up!');
})
