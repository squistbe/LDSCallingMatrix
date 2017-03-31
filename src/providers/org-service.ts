import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';
import { MemberInfo } from './unit-service';

const ORG_API = '/api/org';

export interface Calling {
  name: string,
  _id: string,
  sortIndex: number,
  member?: MemberInfo,
  status?: any
}

export interface Org {
  name: string,
  _id: string,
  sortIndex: number,
  callings: Array<Calling>
}

@Injectable()
export class OrgService {

  constructor(public authService: AuthService) {}

  getOrgs() {
    return new Promise((resolve, reject) => {
      this.authService.get(ORG_API, null)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateCalling(params) {
    return new Promise((resolve, reject) => {
      this.authService.put(ORG_API + '/calling', JSON.stringify(params))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        })
    });
  }

  removeMember(params) {
    return new Promise((resolve, reject) => {
      this.authService.put(ORG_API + '/calling/member/remove', params)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        })
    });
  }
}
