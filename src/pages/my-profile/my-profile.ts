import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {
  toolbarColor: string;
  editing: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  edit() {
    this.toolbarColor = 'primary';
    this.editing = true;
  }

  save() {

  }
}
