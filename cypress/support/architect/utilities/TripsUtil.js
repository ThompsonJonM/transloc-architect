import * as CONSTANTS from '../constants'

/**
 * Class of helper functions related to Trips
 */
export default class TripsUtil {

  /**
   * A trips creation function which uses the API
   * to increase testing speed
   *
   * @param tripName - The filename of the trips fixture we are loading
   */
  static createTripWithApi(tripName) {
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
      }).then((patternResponse) => {
        const pattern = patternResponse.body[0].pattern_id;

        cy.request({
          "method": "GET",
          "url": CONSTANTS.API_URL + 'feeds/' + feed + '/calendars',
          "headers": {
            "Authorization": CONSTANTS.API_TOKEN,
            "Content-Type": "application/json"
          }
        }).then((calendarResponse) => {
          const calendar = calendarResponse.body[0].calendar_id;

          cy.fixture('/trips/' + tripName)
            .then((trip) => {
              cy.request({
                "method": "POST",
                "url": CONSTANTS.API_URL + 'feeds/' + feed + '/patterns/' + pattern + '/calendars/' + calendar + '/trips',
                "headers": {
                  "Authorization": CONSTANTS.API_TOKEN,
                  "Content-Type": "application/json"
                },
                "body": trip
              });
            });
        });
      });
    });
  }

  /**
   * A trip deletion function which uses the API
   * to increase testing speed
   */
  static deleteTripWithApi() {
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
