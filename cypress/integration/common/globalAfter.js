import LogoutUtil from '../../support/architect/utilities/LogoutUtil';

/**
* Logout from the application upon test completion
*/
after(() => {
  LogoutUtil.logoutWithApi()
});
