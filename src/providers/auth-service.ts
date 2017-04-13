import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserService, UserInfo } from './user-service';

const AUTH_API = '/api/auth';

@Injectable()
export class AuthService {
  userInfo: UserInfo;

  constructor(public http: Http, public userService: UserService) {}

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

    return this.http.get(url, options);
  }

  put(url, data?) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  delete(url, data?) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.delete(url, {
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
          this.http.get(AUTH_API + '/protected', {headers: headers}).subscribe(res => resolve(res.json()), err => reject(err));
        }
      });
    });
  }

  createAccount(details){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(AUTH_API + '/register', JSON.stringify(details), {headers: headers})
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

      this.http.post(AUTH_API + '/login', JSON.stringify(credentials), {headers: headers})
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
