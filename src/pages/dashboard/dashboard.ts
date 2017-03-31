import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, ItemSliding, AlertController } from 'ionic-angular';

import { UploadService } from '../../providers/upload-service';
import { OrgService, Org, Calling } from '../../providers/org-service';
import { UnitInfo, MemberInfo } from '../../providers/unit-service';
import { UserService } from '../../providers/user-service';
import { CallingStatusService, CallingStatus } from '../../providers/calling-status-service';

import { EditCallingModal } from '../../modals/edit-calling/edit-calling';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  orgs: Array<Org>;
  editCallingModal: any;
  callingStatusModal: any;
  selectedOrg: Org;
  selectedCalling: Calling;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public uploadService: UploadService,
    public orgService: OrgService,
    public userService: UserService,
    public callingStatusService: CallingStatusService
  ) {}

  ionViewDidLoad() {
    this.orgService.getOrgs().then((result: Array<Org>) => {
      this.orgs = result;
    }, (err) => {
      console.log(err)
    });
  }

  moreClick(calling, org, slide: ItemSliding) {
    slide.close();

    let actionSheet = this.actionSheetCtrl.create({
      title: 'More',
      buttons: [
        {
          text: 'Add Member',
          handler: () => {
            this.editCallingModal = this.modalCtrl.create(EditCallingModal, {calling: calling, org: org});
            this.editCallingModal.present();
            this.editCallingModal.onDidDismiss((calling: Calling) => {
              calling = calling;
            });
          }
        },
        {
          text: 'Remove Member',
          role: 'destructive',
          handler: () => {
            let params = {
              memberId: calling.member._id,
              callingId: calling._id,
              orgId: org._id
            }

            this.orgService.removeMember(params);
          }
        },
        {
          text: 'Calling Status',
          handler: () => {
            this.callingStatusService.getCallingStatuses().then((result: Array<CallingStatus>) => {
              let config = {
                title: 'Calling Status',
                inputs: result,
                buttons: [
                  {
                    text: 'OK',
                    handler: data => {
                      let params = {
                        statusId: data,
                        callingId: calling._id,
                        orgId: org._id
                      };

                      this.orgService.updateCalling(params).then((result: Calling) => {
                        console.log(result);
                      }, (err) => {
                        console.log(err);
                      });
                    }
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]
              };

              this.callingStatusModal = this.alertCtrl.create(config);
              this.callingStatusModal.present();
            }, (err) => {
              console.log(err);
            });
          }
        },
        {
          text: 'Duplicate'
        },
        {
          text: 'Email'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  contact(member, type, slide: ItemSliding) {
    slide.close();
    if (member && member.phone) {
      let memberNumber = encodeURIComponent(member.phone);
      window.location.href = type + ':' + memberNumber;
    }
  }
}
