import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserService, UserInfo } from './user-service';

const AUTH_API = '/api/auth';

@Injectable()
export class AuthService {
  userInfo: UserInfo;

  constructor(public http: Http, public userService: UserService, public platform: Platform) {}

  getRoot() {
    return this.platform.is('cordova') ? 'https://lds-bishopric-tools.herokuapp.com' : '';
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', this.userService.currentUser.token);
  }

  get(url: string, search?: any) {
    let headers = new Headers();
    let params = new URLSearchParams();

    this.createAuthorizationHeader(headers);
    for (var param in search) {
      params.set(param, search[param]);
    }

    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this.http.get(this.getRoot() + url, options);
  }

  put(url, data?) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.createAuthorizationHeader(headers);
    return this.http.put(this.getRoot() + url, data, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.createAuthorizationHeader(headers);
    return this.http.post(this.getRoot() + url, data, {
      headers: headers
    });
  }

  delete(url, data?) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.delete(this.getRoot() + url, {
      headers: headers
    });
  }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      // load token if exists
      this.userService.getUserInfo().then((value) => {
        if (value) {
          this.userInfo = value;
          let headers = new Headers();
          this.createAuthorizationHeader(headers);
          this.http.get(this.getRoot() + AUTH_API + '/protected', {headers: headers}).subscribe(res => resolve(res.json()), err => reject(err));
        }
        else reject({error: 'No user found'});
      });
    });
  }

  createAccount(details){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.getRoot() + AUTH_API + '/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.userService.setUserInfo(data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(credentials){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.getRoot() + AUTH_API + '/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.userService.setUserInfo(data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout(){
    this.userService.setUserInfo('');
  }
}
