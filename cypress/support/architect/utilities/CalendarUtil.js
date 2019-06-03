import * as CONSTANTS from '../constants'

/**
 * Class for helper functions related to Calendars
 */
export default class CalendarUtil {

  /**
   * A calendar creation function which uses the API
   * to increase testing speed
   *
   * @param calendarFileName - The filename of the calendar fixture we are loading
   */
  static createCalendarWithAPI(calendarFileName) {
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

      cy.fixture('/calendars/' + calendarFileName)
        .then((calendar) => {
          cy.request({
            "method": 'POST',
            "url": CONSTANTS.API_URL + 'feeds/' + feed + '/calendars',
            "headers": {
              "Authorization": CONSTANTS.API_TOKEN,
              "Content-Type": "application/json"
            },
            "body": calendar
          });
        });
    });
  }

  static queryCalendarWithAPIAndCheckUsage() {
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

      cy.request({
        "method": 'GET',
        "url": CONSTANTS.API_URL + 'feeds/' + feed + '/calendars',
        "headers": {
          "Authorization": CONSTANTS.API_TOKEN,
          "Content-Type": "application/json"
        }
      }).then((calendarResponse) => {
        const calendar = calendarResponse.body[0].calendar_id;

        cy.get('[data-id=calendar-' + calendar + ']')
          .should('not.eq', '0 trips')
      });
    });
  }
}
