import * as CONSTANTS from '../constants'

/**
 * Class of helper functions related to Trips
 */
export default class TripsUtil {

  /**
  * A trip creation function which takes in parameters
  * to create a new trip
  *
  * @param tripName - The name of the trip
  * @param bikesAllowed - Whether bikes are allowed on the trip
  * @param wheelchairsAllowed - Whether wheelchairs are allowed on the trip
  */
  static createTrip(tripName, bikesAllowed, wheelchairsAllowed) {
    cy.get(CONSTANTS.TRIPS.NEW_TRIP_SELECTOR)
      .click();

    cy.get(CONSTANTS.TRIPS.TRIP_NAME_SELECTOR)
      .type(tripName)

    cy.get(CONSTANTS.TRIPS.BIKES_DROPDOWN_SELECTOR)
      .select(bikesAllowed);

    cy.get(CONSTANTS.TRIPS.WHEELCHAIR_DROPDOWN_SELECTOR)
      .select(wheelchairsAllowed);

    cy.get(CONSTANTS.TRIPS.STOP_TIME_SELECTOR)
      .each((selectors) => {
        cy.get(selectors)
          .type('0200')
      });

    cy.get(CONSTANTS.TRIPS.SAVE_BUTTON_SELECTOR)
      .click();
  }

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
