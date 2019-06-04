import PatternsUtil from '../../support/architect/utilities/PatternsUtil';
import RoutesUtil from '../../support/architect/utilities/RoutesUtil';

afterEach(() => {
  RoutesUtil.createRouteWithApi('irvingPark');
  PatternsUtil.createPatternWithApi();
})
