import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {}

  createOrg() {
    let createModal = this.modalCtrl.create(CreateOrgModal);
    createModal.present();
  }

  joinOrg() {
    let joinModal = this.modalCtrl.create(JoinOrgModal);
    joinModal.present();
  }

  cancel() {
    this.navCtrl.pop();
  }
}

@Component({
  template:
  `<ion-header>
    <ion-navbar>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
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
export class JoinOrgModal {
  private joinOrgForm: FormGroup;

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.joinOrgForm = this.formBuilder.group({
      name: ['']
    });
  }

  joinOrg() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  template:
  `<ion-header>
    <ion-navbar>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
      <ion-title>Create a Ward/Branch</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <form [formGroup]="createOrgForm" (ngSubmit)="createOrg()">
      <ion-item no-padding>
        <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>
      </ion-item>
      <ion-item no-padding>
        <ion-input type="text" placeholder="Unit Number" formControlName="unitNumber"></ion-input>
      </ion-item>
      <div padding-vertical>
        <button type="submit" ion-button block [disabled]="!createOrgForm.valid">Create</button>
        <button type="button" ion-button block outline (click)="dismiss()">Cancel</button>
      </div>
    </form>
  </ion-content>`
})
export class CreateOrgModal {
  private createOrgForm: FormGroup;

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.createOrgForm = this.formBuilder.group({
      name: [''],
      unitNumber: ['']
    });
  }

  createOrg() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
