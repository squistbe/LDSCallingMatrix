import { Component } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  private login : FormGroup;

  constructor( private formBuilder: FormBuilder, private authService: AuthService ) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService = authService;
  }

  public loginForm() {
    this.authService.authenticate(this.login.value);
  }

}
