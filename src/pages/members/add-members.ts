import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { UploadService } from '../../providers/upload-service';
import { UserService } from '../../providers/user-service';
import { UnitInfo, MemberInfo } from '../../providers/unit-service';

import { MembersPage } from './members';

@Component({
  templateUrl: 'add-members.html'
})
export class AddMembersPage {
  isDesktop: boolean;
  file: File;
  members: Array<MemberInfo>;

  constructor(public navParams: NavParams, public navCtrl: NavController, public plt: Platform, public uploadService: UploadService, public userService: UserService) {
    this.isDesktop = plt.is('core');
  }

  downloadMemberCsv() {
    if(this.isDesktop) window.open('https://www.lds.org/directory/services/web/v3.0/unit/member-list/' + this.userService.currentUser.user.unitNumber + '/csv');
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

  }
}
