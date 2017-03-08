import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { OrgService, Org } from '../../providers/org-service';
import { UserService, UserInfo } from '../../providers/user-service';

import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {}

  createOrg() {
    this.navCtrl.push(CreateOrgPage)
  }

  joinOrg() {
    this.navCtrl.push(JoinOrgPage)
  }

  cancel() {
    this.navCtrl.pop();
  }
}

@Component({
  template:
  `<ion-header>
    <ion-navbar>
      <ion-title>Join a Ward/Branch</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <form [formGroup]="joinOrgForm" (ngSubmit)="joinOrg()">
      <ion-item no-padding>
        <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>
      </ion-item>
      <div padding-vertical>
        <button type="submit" ion-button block [disabled]="!joinOrgForm.valid">Join</button>
        <button type="button" ion-button block outline (click)="dismiss()">Cancel</button>
      </div>
    </form>
  </ion-content>`
})
export class JoinOrgPage {
  private joinOrgForm: FormGroup;

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.joinOrgForm = this.formBuilder.group({
      name: ['']
    });
  }

  joinOrg() {

  }

  dismiss() {
    this.navCtrl.pop();
  }
}

@Component({
  template:
  `<ion-header>
    <ion-navbar>
      <ion-title>Create a Ward/Branch</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <form [formGroup]="createOrgForm" (ngSubmit)="createOrg()">
      <ion-item no-padding>
        <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>
      </ion-item>
      <ion-item no-padding>
        <ion-input type="number" placeholder="Unit Number" formControlName="unitNumber"></ion-input>
      </ion-item>
      <div padding-vertical>
        <button type="submit" ion-button block [disabled]="!createOrgForm.valid">Create</button>
        <button type="button" ion-button block outline (click)="dismiss()">Cancel</button>
      </div>
    </form>
  </ion-content>`
})
export class CreateOrgPage {
  private createOrgForm: FormGroup;
  private loading: any;
  private currentUser: UserInfo

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public orgService: OrgService,
    public userService: UserService
  ) {
    this.createOrgForm = this.formBuilder.group({
      name: ['', Validators.required],
      unitNumber: ['', Validators.required]
    });

    this.loading = this.loadingCtrl.create({
      content: 'Creating...'
    });

    this.currentUser = this.userService.currentUser;
  }

  createOrg() {
    this.loading.present();

    let details = this.createOrgForm.value;
    details.ownerId = this.userService.currentUser.user._id;

    this.orgService.createOrg(details).then((result: Org) => {
      this.currentUser.user.orgId = result._id;
      this.userService.setUserInfo(this.currentUser);
      this.loading.dismiss();
      this.navCtrl.setRoot(DashboardPage);
    }, (err) => {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: 'Oops...',
        subTitle: 'Ward already exists. You must have permission to join.',
        buttons: ['OK']
      }).present();
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
