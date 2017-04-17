import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { OrgService, Org } from '../../providers/org-service';

@Component({
  selector: 'page-add-calling',
  templateUrl: 'add-calling.html'
})
export class AddCallingModal {
  selectedCalling: any;
  loading: any;
  items: Array<Org>;
  calling: any;
  org: any;

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    public orgService: OrgService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.org = this.params.get('org');
    this.loading = this.loadingCtrl.create({content: 'Adding Calling...'});
  }

  ionViewDidLoad() {
    this.orgService.getOrgCallings({name: this.org.name}).then((result: Array<Org>) => {
      this.items = result;
    }, err => console.log(err));
  }

  save() {
    this.loading.present();
    this.orgService.addOrgCalling(this.selectedCalling, this.org._id).then(result => {
      this.org.callings.push(result);
      this.loading.dismiss();
      this.dismiss();
    }, err => console.log(err));
  }

  addCalling() {
    let alertCtrl = this.alertCtrl.create({
      title: 'Add Calling',
      message: 'Add a Calling to this orgization and a Class Name if applicable:',
      inputs: [
        {
          name: 'name',
          placeholder: 'Calling'
        },
        {
          name: 'className',
          placeholder: 'Class Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',

        },
        {
          text: 'Add',
          handler: data => {
            this.loading.present();
            if (data.className) data.hasClass = !!data.className;
            this.orgService.addOrgCalling(data, this.org._id).then(result => {
              this.org.callings.push(result);
              this.loading.dismiss();
              this.dismiss();
            }, err => console.log(err));
          }
        }
      ]
    });
    alertCtrl.present();
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
