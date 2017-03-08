import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

export interface Org {
  _id: string,
  name: string,
  unitNumber: string,
  ownerId?: string
}

@Injectable()
export class OrgService {
  currentOrg: Org;

  constructor(public authService: AuthService) {}

  createOrg(details) {
    return new Promise((resolve, reject) => {
      this.authService.post('/api/org', JSON.stringify(details))
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
