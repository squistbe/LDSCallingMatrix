import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { DebugElement } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MembersPage } from '../pages/members/members';
import { AddMembersPage } from '../pages/members/add-members';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { WelcomePage } from '../pages/welcome/welcome';

import { AuthService } from '../providers/auth-service';
import { UserService } from '../providers/user-service';


import { NavMock, AuthMock, UserMock, PlatformMock } from '../mocks';

let comp: MyApp = null;

describe('Component: Root Component', () => {
  beforeEach(() => {
    comp = new MyApp((<any> new PlatformMock), (<any>new AuthMock), (<any>new UserMock()), (<any>new SplashScreen()), (<any>new StatusBar()));
    comp['nav'] = (<any>new NavMock());
  });

  it('is created', () => {
    expect(comp).toBeTruthy();
    expect(comp instanceof MyApp);
  });

  it('initializes with a root page', () => {
    expect(comp['rootPage']).not.toBe(null);
  });

  it('menu pages should have four', () => {
    expect(comp.pages.length).toBe(4);
  });

  it('opens a page', () => {
    spyOn(comp['nav'], 'setRoot');
    comp.openPage(comp['pages'][1]);
    expect(comp['nav'].setRoot).toHaveBeenCalledWith(MembersPage);
  });

  it('opens My Profile page', () => {
    spyOn(comp['nav'], 'setRoot');
    comp.myProfile();
    expect(comp['nav'].setRoot).toHaveBeenCalledWith(MyProfilePage);
  });

  it('logs out of app', () => {
    spyOn(comp['nav'], 'setRoot');
    spyOn(comp['authService'], 'logout');
    comp.logout();
    expect(comp['nav'].setRoot).toHaveBeenCalledWith(Login);
    expect(comp.authService.logout).toHaveBeenCalled();
  });
});
