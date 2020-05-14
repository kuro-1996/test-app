import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  constructor(private authService: AuthService) {
  }

  onLogIn(formAuth: NgForm) {
    if(formAuth.value.username === 'admin' && formAuth.value.password === '1111' ) {
      this.authService.logIn();
    }
    formAuth.reset();
  }
}
