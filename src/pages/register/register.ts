import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../providers/auth-service';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private register : FormGroup
  private loading : any;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController) {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
    this.loading = this.loadingCtrl.create({
      content: 'Creating account...'
    });
  }

  registerForm(){
    this.loading.present();

    this.authService.createAccount(this.register.value).then((result) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(DashboardPage);
    }, (err) => {
        this.loading.dismiss();
        console.log(err);
    });
  }
}
