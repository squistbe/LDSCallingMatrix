import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { UserService } from './user-service';

@Injectable()
export class AuthService {
  userInfo: any;

  constructor(public http: Http, public storage: Storage, public userService: UserService) { }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      //Load token if exists
      this.userService.getUserInfo().then((value) => {
        this.userInfo = value;

        let headers = new Headers();
        headers.append('Authorization', this.userInfo.token);

        this.http.get('/api/auth/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
        });
    });
  }

  createAccount(details){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('/api/auth/register', JSON.stringify(details), {headers: headers})
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

      this.http.post('/api/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          let data = res.json();
          this.userService.setUserInfo(data);
          resolve(data);
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  logout(){
    this.userService.setUserInfo('');
  }
}
