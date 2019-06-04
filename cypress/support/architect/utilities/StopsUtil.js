import * as CONSTANTS from '../constants'

/**
 * Class for helper functions related to Stops
 */
export default class StopsUtil {

  /**
   * A stops creation function which uses the API
   * to increase testing speed
   *
   * @param stopsFileName - The filename of the stops fixture we are loading
   */
  static createStopsWithApi(stopsFileName) {
    cy.request({
      "method": "GET",
      "url": CONSTANTS.API_URL + 'feeds',
      "headers": {
        "Authorization": CONSTANTS.API_TOKEN,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      cy.log(response)

      const feed = response.body[1].feed_id;

      cy.fixture('/stops/' + stopsFileName)
        .then((stop) => {
          cy.request({
            "method": 'POST',
            "url": CONSTANTS.API_URL + 'feeds/' + feed + '/stops',
            "headers": {
              "Authorization": CONSTANTS.API_TOKEN,
              "Content-Type": "application/json"
            },
            "body": stop
          });
        });
    });
  }
}
