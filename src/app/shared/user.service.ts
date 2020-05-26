import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
  private userList: User[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    return this.http.get<User[]>('https://ng-complete-guide-465a8.firebaseio.com/user.json')
  }

  saveUser(user: User[]) {
    this.http.put('https://ng-complete-guide-465a8.firebaseio.com/user.json',user)
    .subscribe(
      response => console.log(response)
    );
  }
}