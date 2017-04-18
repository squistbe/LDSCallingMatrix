import { Injectable } from '@angular/core';
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

  getOrgs(params?) {
    return new Promise((resolve, reject) => {
      this.authService.get(ORG_API, params).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }

  getOrgCallings(params?) {
    return new Promise((resolve, reject) => {
      this.authService.get(ORG_API + '/callings', params).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }

  addOrgCalling(params, id) {
    return new Promise((resolve, reject) => {
      this.authService.post(ORG_API + `/${id}/calling`, JSON.stringify(params)).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }

  updateOrgCalling(orgId, callingId, params) {
    return new Promise((resolve, reject) => {
      this.authService.put(ORG_API + `/${orgId}/calling/${callingId}`, params).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }

  removeOrgCalling(orgId, callingId) {
    return new Promise((resolve, reject) => {
      this.authService.delete(ORG_API + `/${orgId}/calling/${callingId}`).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }

  reorderCallings(orgId, params) {
    return new Promise((resolve, reject) => {
      this.authService.put(ORG_API + `/${orgId}/callings/reorder`, params).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }

  removeMemberFromCalling(orgId, callingId, memberId) {
    return new Promise((resolve, reject) => {
      this.authService.delete(ORG_API + `/${orgId}/calling/${callingId}/member/${memberId}`).subscribe(res => resolve(res.json()), err => reject(err));
    });
  }
}
