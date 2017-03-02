import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  email: string;
  password: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public params: NavParams,
    public storage: Storage,
    private formBuilder: FormBuilder
  ) {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.showLoader('Loading...');

    // No need to check authenticity
    if(!this.params.get('forceLogout')) {
      // Check if already authenticated
      this.authService.checkAuthentication().then((res) => {
        this.launchDashboard();
      }, (err) => {
        this.loading.dismiss();
      });
    } else {
      this.loading.dismissAll();
    }
  }

  doLogin() {
    this.showLoader('Logging in...');

    this.authService.login(this.login.value).then((result) => {
      this.launchDashboard();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  launchDashboard() {
    this.loading.dismiss();
    this.navCtrl.setRoot(DashboardPage);
    if(!this.userService.currentUser.user.orgId) this.navCtrl.push(WelcomePage);
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
