import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {}

  isLogin = false;

  logInSub : Subscription;

  ngOnInit() {
    this.logInSub = this.authService.isLogIn.subscribe(is => {
      this.isLogin = is;
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogOut() {
    this.authService.logOut();
    this.authService.isLogIn.next(false);
    this.router.navigate(['/auth']);
  }
}
