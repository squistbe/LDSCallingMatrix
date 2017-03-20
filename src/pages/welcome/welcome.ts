import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UnitService, UnitInfo } from '../../providers/unit-service';
import { UserService, UserInfo } from '../../providers/user-service';

import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {}

  createUnit() {
    this.navCtrl.push(CreateUnitPage)
  }

  joinOrg() {
    this.navCtrl.push(JoinUnitPage)
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
    <form [formGroup]="joinUnitForm" (ngSubmit)="joinUnit()">
      <ion-item no-padding>
        <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>
      </ion-item>
      <div padding-vertical>
        <button type="submit" ion-button block [disabled]="!joinUnitForm.valid">Join</button>
        <button type="button" ion-button block outline (click)="dismiss()">Cancel</button>
      </div>
    </form>
  </ion-content>`
})
export class JoinUnitPage {
  private joinUnitForm: FormGroup;

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.joinUnitForm = this.formBuilder.group({
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
    <form [formGroup]="createUnitForm" (ngSubmit)="createUnit()">
      <ion-item no-padding>
        <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>
      </ion-item>
      <ion-item no-padding>
        <ion-input type="number" placeholder="Unit Number" formControlName="unitNumber"></ion-input>
      </ion-item>
      <div padding-vertical>
        <button type="submit" ion-button block [disabled]="!createUnitForm.valid">Create</button>
        <button type="button" ion-button block outline (click)="dismiss()">Cancel</button>
      </div>
    </form>
  </ion-content>`
})
export class CreateUnitPage {
  private createUnitForm: FormGroup;
  private loading: any;
  private currentUser: UserInfo

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public unitService: UnitService,
    public userService: UserService
  ) {
    this.createUnitForm = this.formBuilder.group({
      name: ['', Validators.required],
      unitNumber: ['', Validators.required]
    });

    this.loading = this.loadingCtrl.create({
      content: 'Creating...'
    });

    this.currentUser = this.userService.currentUser;
  }

  createUnit() {
    this.loading.present();

    let details = this.createUnitForm.value;
    details.ownerId = this.userService.currentUser.user._id;

    this.unitService.createUnit(details).then((result: UnitInfo) => {
      this.currentUser.user.unitNumber = result.unitNumber;
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
