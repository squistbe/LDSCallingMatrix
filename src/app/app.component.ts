import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Login } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Login;
  pages: Array<{title: string, component: any}>;
  user: any;

  constructor(public platform: Platform, public auth: AuthService, public userService: UserService) {
    this.initializeApp();
    this.pages = [
      { title: 'Dashboard', component: DashboardPage }
    ];
    this.user = this.userService.currentUser ? this.userService.currentUser.user : '';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(Login, {
      forceLogout: true
    });
  }
}
