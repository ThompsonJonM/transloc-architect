import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';
import FeedsUtil from '../../support/architect/utilities/FeedsUtil';
import PatternsUtil from '../../support/architect/utilities/PatternsUtil';
import RoutesUtil from '../../support/architect/utilities/RoutesUtil';

beforeEach(() => {
  LoginUtil.loginAsArchitectUser(CONSTANTS.ARCHITECT_USER, CONSTANTS.ARCHITECT_PASSWORD);
  FeedsUtil.selectFeedWithApi(1);

  PatternsUtil.deletePatternWithApi();
  RoutesUtil.deleteRouteWithApi();
})
