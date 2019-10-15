/* eslint no-restricted-globals: 0*/
import auth0 from 'auth0-js';
const jwtDecode = require('jwt-decode');

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'call900913.auth0.com',
    clientID: 'NftEyeCHwrt1pgeaFAzHteGabolarq8I',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://call900913.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    console.log('ENTER HANDLEAUTHENTICATION')
    this.auth0.parseHash((err, authResults) =>  {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
        console.log('I. ', authResults.accessToken)
        localStorage.setItem('access_token', authResults.accessToken);
        console.log('II. ', authResults.idToken)
        localStorage.setItem('id_token', authResults.idToken);
        localStorage.setItem('expires_at', expiresAt);
        location.hash  = '';
        location.pathname = '/';
      } else if (err) {
         console.log(err);
      }
    })
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    location.pathname = '/'
  }

  user() {
    if (localStorage.getItem('id_token')) {
      console.log(localStorage.getItem('id_token'));
      return jwtDecode(localStorage.getItem('id_token'));
    } else {
      return {};
    }
  }
}
