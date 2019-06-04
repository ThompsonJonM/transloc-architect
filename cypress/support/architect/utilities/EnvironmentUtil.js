import CalendarsUtil from './CalendarsUtil';
import FeedsUtil from './FeedsUtil';
import RoutesUtil from './RoutesUtil';
import PatternsUtil from './PatternsUtil';
import StopsUtil from './StopsUtil';
import TripsUtil from './TripsUtil';

/**
* Class for helper functions related to Testing Environments
*/
export default class EnvironmentUtil {

  /**
  * An environment creation function which uses the API
  * to increase testing speed
  *
  * @param feedFileName - The filename of the feed fixture we are loading
  * @param calendarFileName - The filename of the calendar fixture we are loading
  * @param routeFileName - The filename of the route fixture we are loading
  * @param tripFileName - The filename of the trip fixture we are loading
  * @param stopFileNames - The filenames of the stop fixtures we are loading
  */
  static createEnvironmentWithApi(feedFileName, calendarFileName, routeFileName, tripFileName, ...stopFileNames) {
    const stopsArray = [...stopFileNames];

    FeedsUtil.createFeedWithApi(feedFileName);
    cy.log(feedFileName + ' feed created.');

    stopsArray.forEach((stopName) => {
      StopsUtil.createStopsWithApi(stopName);
      cy.log(stopName + ' stop created.');
    })

    CalendarsUtil.createCalendarWithApi(calendarFileName);
    cy.log(calendarFileName + ' calendar created.')

    RoutesUtil.createRouteWithApi(routeFileName);
    cy.log(routeFileName + ' route created.');

    PatternsUtil.createPatternWithApi();
    cy.log('Pattern created.');

    TripsUtil.createTripWithApi(tripFileName);
    cy.log(tripFileName + ' trip created.')
  }
}
