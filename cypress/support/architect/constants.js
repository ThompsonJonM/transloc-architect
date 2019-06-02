// Base URLs
export const LOGIN_URL = Cypress.env('loginDomain');
export const API_URL = Cypress.env('apiDomain');
export const ARCHITECT_URL = Cypress.env('architectDomain');

// Users
export const ARCHITECT_USER = Cypress.env('username');
export const ARCHITECT_PASSWORD = Cypress.env('password');

// Pages and Objects
export const CALENDARS = {

};

export const LOGIN = {
  USERNAME_FIELD_SELECTOR: '#username',
  PASSWORD_FIELD_SELECTOR: '#password',
  SUBMIT_BUTTON_SELECTOR: 'input[type=submit]'
};

export const ROUTES = {

};

export const TRIPS = {

};
