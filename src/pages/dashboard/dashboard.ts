import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileChooser } from 'ionic-native';

import { UploadService } from '../../providers/upload-service';
import { OrgService, Org } from '../../providers/org-service';
import { UnitInfo } from '../../providers/unit-service';

import { MembersPage } from '../members/members';

import * as _ from 'lodash'

@Pipe({ name: 'order-by' })
export class OrderByPipe {
  transform(array, args) {
    return _.sortBy(array, args);
  }
}

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  file: File;
  members: any;
  orgs: Org;

  constructor(public navCtrl: NavController, public uploadService: UploadService, public orgService: OrgService) {}

  ionViewDidLoad() {
    this.orgService.getOrgs().then((result: Org) => {
      this.orgs = result;
    }, (err) => {
      console.log(err)
    });
  }

  uploadChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.uploadService.addMembers(this.file).then((result: UnitInfo) => {
      this.navCtrl.push(MembersPage, { members: result.members });
      this.members = result.members;
    }, (err) => {
      console.log(err)
    });
  }

  addMembers() {
    FileChooser.open()
    .then(uri => console.log(uri))
    .catch(e => console.log(e));
  }
}
