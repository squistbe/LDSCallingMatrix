import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

const UNIT_API = '/api/unit';

interface MemberName {
  first: string,
  last: string
}

interface ChildInfo {
  name: MemberName,
  phone?: string,
  email?: string
}

export interface HouseholdInfo {
  children?: Array<ChildInfo>,
  coupleName?: string,
  familyName: string,
  familyPhone?: string,
  familyEmail?: string,
  familyAddress: string,
  headOfHouseName: MemberName,
  headOfHousePhone?: string,
  headOfHouseEmail?: string,
  spouseName?: MemberName,
  spousePhone?: string,
  spouseEmail?: string,
}

export interface MemberInfo {
  name: MemberName,
  phone?: string,
  email?: string,
  callingId?: string
}

export interface UnitInfo {
  _id: string,
  name: string,
  unitNumber: string,
  ownerId?: string,
  members?: Array<MemberInfo>
}

@Injectable()
export class UnitService {
  currentUnit: UnitInfo;

  constructor(public authService: AuthService) {}

  createUnit(details) {
    return new Promise((resolve, reject) => {
      this.authService.post(UNIT_API, JSON.stringify(details))
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUnitHouseholds() {
    return new Promise((resolve, reject) => {
      this.authService.get(UNIT_API + '/households')
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
