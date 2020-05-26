import { Component, OnInit } from "@angular/core";

import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";
import { User } from "../shared/user.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLogIn = false;
  isSignUp = false;
  isSignUpError = false;
  isSignUpSuccess = false;
  isLogInError = false;
  userList: User[];
  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLogIn = this.authService.loggedIn;
    this.userService.getUsers().subscribe(user => {
      this.userList = user
    });
  }

  onSubmit(value) {
    console.log(this.userList);

    if (!this.isSignUp) {
      if (
        this.userList.some(
          (item) =>
            item.userName === value.username && item.password === value.password
        )
      ) {
        this.authService.logIn();
        this.authService.isLogIn.next(true);
        this.isLogIn = true;
        this.route.navigate(["/product-list"]);
        this.isLogInError = false;
      } else {
        this.isLogInError = true;
      }
    } else {
      if (this.userList.some((item) => item.userName === value.username)) {
        this.isSignUpError = true;
        this.isSignUpSuccess = false;
      } else {
        let newUser: User = {
          userName: value.username,
          password: value.password,
        };
        this.userList.push(newUser);
        this.isSignUp = false;
        this.isSignUpError = false;
        this.isSignUpSuccess = true;
        this.userService.saveUser(this.userList);
      }
    }
  }

  onModeChange(form: NgForm) {
    this.isSignUp = !this.isSignUp;
    if (this.isSignUp === true) {
      this.isLogInError = false;
    }
    form.reset();
  }
}
