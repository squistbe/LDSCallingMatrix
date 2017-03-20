import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';
import { UserService } from './user-service';

const UPLOAD_MEMBERS_API = '/api/upload/members';

@Injectable()
export class UploadService {
  constructor(public http: Http, public authService: AuthService, public userService: UserService) {}

  addMembers(file) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let formData: FormData = new FormData();

      formData.append('file', file);
      this.authService.createAuthorizationHeader(headers);
      headers.append('X-File-Name', file.name);
      headers.append('X-File-Size', file.size);
      headers.append('X-File-Type', file.type);

      this.http.post(UPLOAD_MEMBERS_API, formData, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
}
