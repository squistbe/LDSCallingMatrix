import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

const CALLING_STATUS_API = '/api/org/calling/statuses';

export interface CallingStatus {
  name: string,
  type: string,
  label: string,
  value?: any,
  checked?: boolean,
  _id?: string,
  id?: string,
  description?: string,
  sortIndex: number
}

@Injectable()
export class CallingStatusService {

  constructor(public authService: AuthService) {}

  getCallingStatuses(params?) {
    return new Promise((resolve, reject) => {
      this.authService.get(CALLING_STATUS_API, params)
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
}
