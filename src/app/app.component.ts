import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Login } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MembersPage } from '../pages/members/members';
import { AddMembersPage } from '../pages/members/add-members';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { WelcomePage } from '../pages/welcome/welcome';

import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, icon?: string, component?: any}>;
  user: any;

  constructor(
    public platform: Platform,
    public authService: AuthService,
    public userService: UserService,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Dashboard', icon: 'podium', component: DashboardPage },
      { title: 'Members', icon: 'people', component: MembersPage },
      { title: 'Add Members', icon: 'person-add', component: AddMembersPage },
      { title: 'Calling Status Definitions', icon: 'book' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Check if already authenticated
      this.authService.checkAuthentication().then((res) => {
        this.nav.setRoot(DashboardPage);
        if(!this.userService.currentUser.user.unitNumber) this.nav.push(WelcomePage);
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }, (err) => {
        this.nav.setRoot(Login);
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  myProfile() {
    this.nav.setRoot(MyProfilePage);
  }

  logout() {
    this.authService.logout();
    this.nav.setRoot(Login);
  }
}
