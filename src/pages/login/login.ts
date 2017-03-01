import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  loading: any;
  email: string;
  password: string;

  constructor( public authService: AuthService, public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams ) {}

  ionViewDidLoad() {
    this.showLoader('Loading...');

    // No need check authenticity
    if(!this.params.get('forceLogout')) {
      // Check if already authenticated
      this.authService.checkAuthentication().then((res) => {
          console.log("Already authorized");
          this.loading.dismiss();
          this.navCtrl.setRoot(DashboardPage);
      }, (err) => {
          console.log("Not already authorized");
          this.loading.dismiss();
      });
    } else {
      this.loading.dismissAll();
    }
  }

  doLogin() {
    this.showLoader('Logging in...');

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
        this.loading.dismiss();
        this.navCtrl.setRoot(DashboardPage);
    }, (err) => {
        this.loading.dismiss();
        console.log(err);
    });
  }

  launchRegister(){
    this.navCtrl.push(RegisterPage);
  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }
}
