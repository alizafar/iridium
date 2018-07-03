// src/services/auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';

// Import AUTH_CONFIG, Auth0Cordova, and auth0.js
import { AUTH_CONFIG } from './auth.config';
import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;
  dev = true;

  constructor(
    public zone: NgZone,
    private storage: Storage
  ) {


    if (this.dev) {
      this.autoLogin();
    }
    else {
      this.storage.get('profile').then(user => this.user = user);
      this.storage.get('access_token').then(token => this.accessToken = token);
      this.storage.get('expires_at').then(exp => {
        this.loggedIn = Date.now() < JSON.parse(exp);
        this.loading = false;
      });

    }

  }

  login() {

    if (this.dev) {
      this.autoLogin();
    }
    else {
      this.actualLogin();
    }

  }

  autoLogin() {
    this.accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJURXhSa016TnpZM1JVSkNOMEl4UXpKRk5VRTBOVUkyT0VaRk9UTTBNek00T1RGRk1VRkJOQSJ9.eyJpc3MiOiJodHRwczovL2FsaXphZmFyLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YjFlMTRiNjFjMDhkYjU3NjI1NGFlMTUiLCJhdWQiOlsiaHR0cHM6Ly94YWZhci5jb20vYXBpLyIsImh0dHBzOi8vYWxpemFmYXIuYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUzMDQ1MjAyNywiZXhwIjoxNTMwNTM4NDI3LCJhenAiOiJnNm80V1A3YlJxU3lzVlhCSENMUjNJVHpqMElZNlZTYyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUifQ.O2RrADzEn346jZqCeVOfPhAMY1PALfQ_h09ZqDdss0ZnrGS5ysp9__9RFxjEsv5KSHwtmsFqufTNNVeC3L7vqGHcn4ctykh8tjlCQn6jR7jN4TGySbbuQ9f9-AOG9Z3UlegDf--yA2j5IQt2X1m5khAVEnbPTdZaSNLOx2k1eC_s-wLtaaM2lYOq52D8rAFgbo48WRUOG59p--t6SCZbK3vZx8VRXhfLPpHpoyy5DHf4yU-ZrsjoG9cS_gK261P9UpZtSInGOi99whur1jvJ-LES66F1DnJ9BIXQUj3e8GfGBtOF6kklgKGN-frxd7Sr7sVWvSPY0c59GK1T9I3VNg';
    this.loading = false;
    this.loggedIn = true;
    this.user = { name: 'alizafar@gmail.com' };
  }

  actualLogin() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access',
      audience: 'https://xafar.com/api/'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }

      // Set Access Token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      console.log(authResult.accessToken);

      // Set Access Token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);

      // Set logged in
      this.loading = false;
      this.loggedIn = true;

      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage.set('profile', profile).then(val =>
          this.zone.run(() => this.user = profile)
        );
      });
    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.user = null;
    this.loggedIn = false;
  }
}