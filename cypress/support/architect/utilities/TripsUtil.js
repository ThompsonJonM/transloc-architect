import * as CONSTANTS from '../constants'

/**
 * Class of helper functions related to Trips
 */
export default class TripsUtil {

  /**
   * A trip deletion function which uses the API
   * to increase testing speed
   */
  static deleteTripWithAPI() {
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
          "method": "GET",
          "url": CONSTANTS.API_URL + 'feeds/' + feed + '/calendars',
          "headers": {
            "Authorization": CONSTANTS.API_TOKEN,
            "Content-Type": "application/json"
          }
        }).then((calendarResponse) => {
          const calendar = calendarResponse.body[0].calendar_id;

          cy.request({
            "method": "GET",
            "url": CONSTANTS.API_URL + 'feeds/' + feed + '/patterns/' + pattern + '/calendars/' + calendar,
            "headers": {
              "Authorization": CONSTANTS.API_TOKEN,
              "Content-Type": "application/json"
            }
          }).then((tripsResponse) => {
            const trip = tripsResponse.body[0].trip_id;

            cy.request({
              "method": "DELETE",
              "url": CONSTANTS.API_URL + 'feeds/' + feed + '/patterns/' + pattern + '/calendars/' + calendar + '/trips/' + trip,
              "headers": {
                "Authorization": CONSTANTS.API_TOKEN,
                "Content-Type": "application/json"
              }
            });
          });
        });
      });
    });
  }
}
