import * as CONSTANTS from '../constants'

/**
* Class for helper functions related to Routes
*/
export default class RoutesUtil {

  /**
  * A route creation function which uses the API
  * to increase testing speed
  *
  * @param routeFileName - The filename of the route fixture we are loading
  */
  static createRouteWithAPI(routeFileName) {
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

      cy.fixture('/routes/' + routeFileName)
        .then((route) => {
          cy.request({
            "method": 'POST',
            "url": CONSTANTS.API_URL + 'feeds/' + feed + '/routes',
            "headers": {
              "Authorization": CONSTANTS.API_TOKEN,
              "Content-Type": "application/json"
            },
            "body": route
          });
        });
    });
  }
}
