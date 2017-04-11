import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewController, Platform, NavParams, LoadingController } from 'ionic-angular';

import { OrgService, Org } from '../../providers/org-service';

@Component({
  templateUrl: 'add-calling.html'
})
export class AddCallingModal {
  selectedCalling: any;
  loading: any;
  items: Array<Org>;
  calling: any;
  org: any;

  constructor(public viewCtrl: ViewController, public params: NavParams, public orgService: OrgService, public loadingCtrl: LoadingController) {
    this.org = this.params.get('org');
  }

  ionViewDidLoad() {
    this.orgService.getOrgCallings({name: this.org.name}).then((result: Array<Org>) => {
      this.items = result;
    }, err => console.log(err));
  }

  save() {
    this.loading = this.loadingCtrl.create({content: 'Adding Calling...'});
    this.loading.present();
    this.orgService.addOrgCalling({name: this.selectedCalling.name}, this.org._id).then(result => {
      this.org.callings.push(result);
      this.loading.dismiss();
      this.dismiss();
    }, err => console.log(err));
  }

  removeCalling() {
      delete this.selectedCalling;
  }

  itemSelected(item) {
    this.selectedCalling = item;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
