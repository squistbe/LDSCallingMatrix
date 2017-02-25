import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class User {
  name: Name;
  username: string;
  email: string;
  password: string;
  orgId: number;

  constructor(name: Name, email: string) {
    this.name = name;
    this.email = email;
  }
}

export interface Name {
  first: string,
  last: string
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public http: Http) {
    this.http = http;
  }

  public authenticate(user) {
    this.http.post('http://localhost:5000/login', user)
    .map(response => response.json());
  }

  public getUserInfo() : User {
    return this.currentUser;
  }
}
