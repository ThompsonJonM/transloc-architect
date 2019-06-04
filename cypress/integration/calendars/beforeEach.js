import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';

beforeEach(() => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);
  FeedsUtil.selectFeedWithApi(1);
})
