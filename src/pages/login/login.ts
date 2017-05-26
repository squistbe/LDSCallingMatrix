import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Nav } from 'ionic-angular/components/nav/nav';

import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/user-service';

import { DashboardPage } from '../dashboard/dashboard';
import { RegisterPage } from '../register/register';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  private login: FormGroup;
  loading: any;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public navCtrl: Nav,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    this.showLoader('Logging in...');

    this.authService.login(this.login.value).then((result) => {
      this.launchDashboard();
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: 'Oops...',
        subTitle: 'Invalid username or password.',
        buttons: ['OK']
      }).present();
    });
  }

  launchDashboard() {
    this.loading.dismiss();
    this.navCtrl.setRoot(DashboardPage);
    if(!this.userService.currentUser.user.unitNumber) this.navCtrl.push(WelcomePage);
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
