import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedIn = false;
  constructor() {}

  isAuthenticated() {
    const promise = new Promise(
      (resolve, rejects) => {
        resolve(this.loggedIn);
      }
    )
    return promise;
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
