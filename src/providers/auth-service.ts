import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { UserService } from './user-service';

const AUTH_API = '/api/auth';

@Injectable()
export class AuthService {
  userInfo: any;

  constructor(public http: Http, public storage: Storage, public userService: UserService) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', this.userInfo.token);
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
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

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      //Load token if exists
      this.userService.getUserInfo().then((value) => {
        this.userInfo = value;

        let headers = new Headers();
        this.createAuthorizationHeader(headers);

        this.http.get(AUTH_API + '/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            this.userService.setUserInfo('');
            reject(err);
          });
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
