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
  static createRouteWithApi(routeFileName) {
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

  /**
  * A route deletion function which uses the API
  * to increase testing speed
  */
  static deleteRouteWithApi() {
    cy.request({
      "method": "GET",
      "url": CONSTANTS.API_URL + 'feeds',
      "headers": {
        "Authorization": CONSTANTS.API_TOKEN,
        "Content-Type": "application/json"
      }
    }).then((feedResponse) => {
      const feed = feedResponse.body[1].feed_id;

      cy.request({
        "method": "GET",
        "url": CONSTANTS.API_URL + 'feeds/' + feed + '/routes',
        "headers": {
          "Authorization": CONSTANTS.API_TOKEN,
          "Content-Type": "application/json"
        }
      }).then((routesResponse) => {
        const route = routesResponse.body[0].route_id;

        cy.request({
          "method": "DELETE",
          "url": CONSTANTS.API_URL + 'feeds/' + feed + '/routes/' + route,
          "headers": {
            "Authorization": CONSTANTS.API_TOKEN,
            "Content-Type": "application/json"
          }
        });
      });
    });
  }
}
