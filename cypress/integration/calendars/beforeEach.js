import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';

/**
* Login to the Architect application and select the feed created
* during environment setup
*/
beforeEach(() => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);
  FeedsUtil.selectFeedWithApi(1);
})
