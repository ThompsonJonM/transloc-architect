import * as CONSTANTS from '../constants'

/**
 * Class for helper functions related to Architect logout
 */
export default class LogoutUtil {

  /**
  * A logout function which uses the API to
  * increase testing speed
  */
  static logoutWithApi() {
    cy.request({
      "method": "GET",
      "url": CONSTANTS.LOGOUT_URL,
    });
  }
}
