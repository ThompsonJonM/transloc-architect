import * as CONSTANTS from '../constants'

/**
* Class for helper functions related to Feeds
*/
export default class FeedsUtil {

  /**
  * A feed creation function which uses the API
  * to increase testing speed
  *
  * @param feedFileName - The filename of the fixture we are loading
  */
  static createFeedWithApi(feedFileName) {
    cy.fixture('/feeds/' + feedFileName)
      .then((feed) => {
        cy.request({
          "method": "POST",
          "url": CONSTANTS.API_URL + 'feeds',
          "headers": {
            "Authorization": CONSTANTS.API_TOKEN,
            "Content-Type": "application/json"
          },
          "body": feed
        });
      });
  }

  /**
  * A feed deletion function which uses the API
  * to increase testing speed
  */
  static deleteFeedWithApi() {
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
        "method": "DELETE",
        "url": CONSTANTS.API_URL + 'feeds/' + feed,
        "headers": {
          "Authorization": CONSTANTS.API_TOKEN,
          "Content-Type": "application/json"
        }
      });
    });
  }

  /**
  * A function for querying, then selecting a feed
  * using the API to increase test speed
  *
  * @param feedArrayId - The array location of the feed we would like to select
  */
  static selectFeedWithApi(feedArrayId) {
    cy.request({
      "method": "GET",
      "url": CONSTANTS.API_URL + 'feeds',
      "headers": {
        "Authorization": CONSTANTS.API_TOKEN,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      const feed = response.body[feedArrayId].feed_id;

      cy.get('[data-id=feed-' + feed + ']')
        .click();
    });
  }
}
