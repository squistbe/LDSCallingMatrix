import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

const ORG_API = '/api/org/';

interface Calling {
  name: string,
  callingId: string
}

export interface Org {
  name: string,
  _id: string,
  callings: Array<Calling>
}

@Injectable()
export class OrgService {

  constructor(public authService: AuthService) {}

  getOrgs() {
    return new Promise((resolve, reject) => {
      this.authService.get(ORG_API)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
