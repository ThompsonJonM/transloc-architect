import * as CONSTANTS from '../constants'

/**
 * Class of helper functions related to Patterns
 */
export default class PatternsUtil {

  /**
   * A pattern creation function which uses the API
   * to increase testing speed
   */
  static createPatternWithApi() {
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
          "method": "GET",
          "url": CONSTANTS.API_URL + 'feeds/' + feed + '/stops',
          "headers": {
            "Authorization": CONSTANTS.API_TOKEN,
            "Content-Type": "application/json"
          }
        }).then((stopsResponse) => {
          const stopOne = stopsResponse.body[0].stop_id;
          const stopTwo = stopsResponse.body[1].stop_id;
          const stopThree = stopsResponse.body[2].stop_id;

          cy.request({
            "method": "POST",
            "url": CONSTANTS.API_URL + 'feeds/' + feed + '/patterns',
            "headers": {
              "Authorization": CONSTANTS.API_TOKEN,
              "Content-Type": "application/json"
            },
            "body": {
              "geometry": "{fa_Gla~uOE_E?WAaCAuCAcA?U?U?MAsACqDFAh@IRCVEJAJALAHANAl@Ef@EXAh@CjBBd@?hAbHbApGrA`JLAM@gB?{DB",
              "headsign": "150",
              "items": [{
                  "stop_id": stopOne,
                  "timepoint": true
                },
                {
                  "stop_id": stopTwo,
                  "timepoint": true
                },
                {
                  "stop_id": stopThree,
                  "timepoint": true
                }
              ],
              "name": "150 Bus Lake Shore S",
              "opposite_direction": false,
              "route_id": route,
              "waypoints": [0, 11, 25, 29, 32]
            }
          });
        });
      });
    });
  }

  /**
  * A pattern deletion function which uses the API
  * to increase testing speed
  */
  static deletePatternWithApi() {
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
        "url": CONSTANTS.API_URL + 'feeds/' + feed + '/patterns',
        "headers": {
          "Authorization": CONSTANTS.API_TOKEN,
          "Content-Type": "application/json"
        }
      }).then((patternsResponse) => {
        const pattern = patternsResponse.body[0].pattern_id;

        cy.request({
          "method": "DELETE",
          "url": CONSTANTS.API_URL + 'feeds/' + feed + '/patterns/' + pattern,
          "headers": {
            "Authorization": CONSTANTS.API_TOKEN,
            "Content-Type": "application/json"
          }
        })
      });
    });
  }
}
