import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedIn = false;
  isLogIn = new Subject<boolean>();
 
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
