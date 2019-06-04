import PatternsUtil from '../../support/architect/utilities/PatternsUtil';
import RoutesUtil from '../../support/architect/utilities/RoutesUtil';

/**
* Prepare the test environment by creating patterns and routes
*/
afterEach(() => {
  RoutesUtil.createRouteWithApi('irvingPark');
  PatternsUtil.createPatternWithApi();
})
