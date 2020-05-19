import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{
  isLogIn = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit () {
    this.isLogIn = this.authService.loggedIn;
  }

  onLogIn(formAuth: NgForm) {
    if(formAuth.value.username === 'admin' && formAuth.value.password === '1111' ) {
      this.authService.logIn();
      this.isLogIn = true;
    }
    formAuth.reset();
  }

  onLogOut() {
    this.authService.logOut();
    this.isLogIn = false;
  }
}
