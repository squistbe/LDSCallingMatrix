import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

const USER_INFO: string = 'userInfo';

interface User {
  _id: string,
  name: string,
  email: string,
  role: string,
  unitNumber?: string
}

export interface UserInfo {
  token?: string,
  user?: User
}

@Injectable()
export class UserService {
  currentUser: UserInfo;

  constructor(public http: Http, public storage: Storage) {}

  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.storage.get(USER_INFO).then(res => {
        this.currentUser = res;

        if(this.currentUser) resolve(this.currentUser);
        else resolve({error: 'No user found'});
      });
    });
  }

  setUserInfo(user: UserInfo) {
    this.currentUser = user; // in memory and
    this.storage.set(USER_INFO, user); // local storage
  }

  getUserById(userId) {

  }
}
