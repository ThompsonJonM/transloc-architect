import * as CONSTANTS from '../constants'

/**
 * Class for helper functions related to Stops
 */
export default class StopsUtil {

  /**
   * A stops creation function which uses the API
   * to increase testing speed
   *
   * @param stopFileName - The filename of the stop fixture we are loading
   */
  static createStopsWithAPI(stopFileName) {
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

      cy.fixture('/stops/' + stopFileName)
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
