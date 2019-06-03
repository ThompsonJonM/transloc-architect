// Base URLs
export const LOGIN_URL = Cypress.env('loginDomain');
export const API_URL = Cypress.env('apiDomain');
export const ARCHITECT_URL = Cypress.env('architectDomain');

// API Tokens
export const API_TOKEN = Cypress.env('apiToken');

// Users
export const ARCHITECT_USER = Cypress.env('username');
export const ARCHITECT_PASSWORD = Cypress.env('password');

// Pages and Objects
export const CALENDARS = {
  TRIP_USAGE_SELECTOR: 'p'
};

export const FEED = {
  CALENDARS_SELECTOR: '[data-id=calendars]',
  FEED_NAME_SELECTOR: '[data-id=field-name]',
  ROUTES_SELECTOR: '[data-id=routes]',
  TRIPS_SELECTOR: '[data-id=trips]',
};

export const LOGIN = {
  USERNAME_FIELD_SELECTOR: '#username',
  PASSWORD_FIELD_SELECTOR: '#password',
  SUBMIT_BUTTON_SELECTOR: 'input[type=submit]'
};

export const MAIN = {

};

export const NAVIGATION = {
  FEED_LINK_SELECTOR: 'a'
}

export const PATTERNS = {
  NEW_PATTERN_SELECTOR: '[data-id=new-button]'
}

export const TRIPS = {
  CALENDAR_DROPDOWN_SELECTOR: 'select[name=calendar]',
  CREATE_FORM_SELECTORS: {
    BIKES_DROPDOWN_SELECTOR: 'select[name=bikes_allowed]',
    SAVE_BUTTON_SELECTOR: '[data-id=save-button]',
    STOP_TIME_SELECTOR: 'input[placeholder="HH:MM"]',
    TRIP_NAME_SELECTOR: 'input[name=name]',
    WHEELCHAIR_DROPDOWN_SELECTOR: 'select[name=wheelchair_accessible]'
  },
  PATTERN_DROPDOWN_SELECTOR: 'select[name=pattern]',
  NEW_TRIP_SELECTOR: '[data-id=new-button]',
  ROUTE_DROPDOWN_SELECTOR: 'select[name=route]'
};
