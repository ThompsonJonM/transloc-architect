import {
  Given,
  When,
  And,
  Then
} from 'cypress-cucumber-preprocessor/steps';
import * as CONSTANTS from '../../support/architect/constants';
import LoginUtil from '../../support/architect/utilities/LoginUtil';

/**
 * Scenario: Calendars Indicate the Number of Trips they are Used By
 */
Given('we are viewing the "Trips" tab for a specific feed', () => {
  LoginUtil.loginAsArchitectUser()
});

When('we create a trip using an existing calendar', () => {

});

And('navigate to the "Calendars" tab', () => {

});

Then('the calendar should indicate trip usage', () => {

})
