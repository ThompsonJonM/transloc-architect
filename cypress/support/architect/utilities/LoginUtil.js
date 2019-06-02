import * as CONSTANTS from '../constants'

/**
* Class for helper functions related to Architect login
*/
export default class LoginUtil {

  /**
  * A login function which takes a username and password
  * to gain access to the Architect application
  *
  * @param username       The username to login with
  * @param password       The password for the username
  */
  static loginAsArchitectUser(username, password) {
    cy.visit(CONSTANTS.LOGIN_URL)
    
    cy.get(CONSTANTS.LOGIN.USERNAME_FIELD_SELECTOR)
      .type(CONSTANTS.ARCHITECT_USER);

    cy.get(CONSTANTS.LOGIN.PASSWORD_FIELD_SELECTOR)
      .type(CONSTANTS.ARCHITECT_PASSWORD);

    cy.get(CONSTANTS.LOGIN.SUBMIT_BUTTON_SELECTOR)
      .click();
  }
}
