import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UnitService, MemberInfo } from '../../providers/unit-service';

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {
  members: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public unitService: UnitService) {}

  ionViewDidLoad() {
    this.members = this.navParams.get('members');

    if(!this.members) {
      this.unitService.getUnitMembers().then((result) => {
        this.members = result;
      }, (err) => {
        console.log(err);
      });
    }
  }
}
