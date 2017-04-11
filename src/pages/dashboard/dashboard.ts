import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ActionSheetController, ModalController, ItemSliding, AlertController, LoadingController, reorderArray } from 'ionic-angular';

import { UploadService } from '../../providers/upload-service';
import { OrgService, Org, Calling } from '../../providers/org-service';
import { UnitInfo, MemberInfo } from '../../providers/unit-service';
import { UserService } from '../../providers/user-service';
import { CallingStatusService, CallingStatus } from '../../providers/calling-status-service';

import { EditCallingModal } from '../../modals/edit-calling/edit-calling';
import { AddCallingModal } from '../../modals/add-calling/add-calling';

interface FilterQuery {
  vacantCallings?: boolean,
  filterByOrg?: string
  filterByStatus?: string
}

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  orgs: Array<Org>;
  editCallingModal: any;
  addCallingModal: any;
  callingStatusModal: any;
  selectedOrg: Org;
  selectedCalling: Calling;
  loading: any;
  filteredOrgs: any;
  filteredStatus: any;
  filterQuery: FilterQuery = {};
  reorderCallings: boolean = false;
  toolbarColor: string = 'light';
  title: string = 'Dashboard';

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public uploadService: UploadService,
    public orgService: OrgService,
    public userService: UserService,
    public callingStatusService: CallingStatusService,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    this.orgService.getOrgs().then((result: Array<Org>) => {
      this.orgs = result;
      this.filteredOrgs = result.map(org => {
        return {
          type: 'checkbox',
          label: org.name,
          value: org._id
        };
      });
    }, (err) => {
      console.log(err)
    });
  }

  moreClick(calling, org, slide: ItemSliding) {
    slide.close();

    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: (calling.member ? 'Change' : 'Add') + ' Member',
          handler: () => {
            this.editCallingModal = this.modalCtrl.create(EditCallingModal, {calling: calling, org: org});
            this.editCallingModal.present();
            this.editCallingModal.onDidDismiss(() => this.orgService.getOrgs().then((orgs: Array<Org>) => this.orgs = orgs));
          }
        },
        {
          text: 'Duplicate Calling'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    if (calling.hasClass) {
      actionSheet.addButton({
        text: (calling.className ? 'Change' : 'Add') + ' Class',
        handler: () => {

        }
      });
    }

    if (calling.member) {
      actionSheet.addButton({
        text: (calling.status ? 'Change' : 'Add') + ' Calling Status',
        handler: () => {
          this.callingStatusService.getCallingStatuses({type: 'radio'}).then((result: Array<CallingStatus>) => {
            let config = {
              title: 'Calling Status',
              inputs: result,
              buttons: [
                {
                  text: 'Apply',
                  handler: statusId => {
                    this.orgService.updateOrgCalling(org._id, calling._id, {statusId: statusId}).then(() => this.orgService.getOrgs().then((orgs: Array<Org>) => this.orgs = orgs));
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
      });

      if (calling.member.email) {
        actionSheet.addButton({text: 'Email Member'});
      }

      actionSheet.addButton({
        text: 'Remove Member',
        role: 'destructive',
        handler: () => this.orgService.removeMemberFromCalling(org._id, calling._id, calling.member._id).then(() => this.orgService.getOrgs().then((orgs: Array<Org>) => this.orgs = orgs))
      });

      actionSheet.addButton({
        text: 'Remove Calling',
        role: 'destructive',
        handler: () => this.orgService.removeOrgCalling(org._id, calling._id).then(() => this.orgService.getOrgs().then((orgs: Array<Org>) => this.orgs = orgs))
      });
    }
    actionSheet.present();
  }

  contact(member, type, slide: ItemSliding) {
    slide.close();
    let memberNumber = encodeURIComponent(member.phone);
    window.location.href = type + ':' + memberNumber;
  }

  reorderItems(indexes, orgId, callings) {
    let params = {
      orgId: orgId,
      from: indexes.from,
      to: indexes.to
    };

    this.showLoader('Reordering...');
    callings = reorderArray(callings, indexes);
    this.orgService.reorderOrgs(params).then((result: Array<Org>) => {
      this.orgs = result;
      this.loading.dismiss();
    }, err => {
      console.log(err);
    });
  }

  openFilter() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Filter by Organization',
          handler: () => {
            let filterAlert = this.alertCtrl.create({
              title: 'Filter by Organziation',
              inputs: this.filteredOrgs,
              buttons: [
                {
                  text: 'Apply',
                  handler: data => {
                    this.filteredOrgs.forEach(item => {item.checked = !!~data.indexOf(item.value);});
                    let params = Object.assign(this.filterQuery, {
                      filterByOrg: data.join(',')
                    });

                    this.showLoader('Filtering...');
                    this.orgService.getOrgs(params).then((result: Array<Org>) => {
                      this.orgs = result;
                      this.loading.dismiss();
                    }, err => {
                      console.log(err);
                      this.loading.dismiss();
                    });
                  }
                },
                {
                  text: 'Cancel',
                  role: 'cancel'
                }
              ]
            });
            filterAlert.present();
          }
        },
        {
          text: 'Show ' + (this.filterQuery.vacantCallings ? 'All' : 'Vacant') + ' Callings',
          handler: () => {
            this.showLoader('Filtering...');
            this.orgService.getOrgs(Object.assign(this.filterQuery, {vacantCallings: !this.filterQuery.vacantCallings})).then((result: Array<Org>) => {
              this.orgs = result;
              this.loading.dismiss();
            }, err => console.log(err))
          }
        },
        {
          text: 'Filter by Calling Status',
          handler: () => {
            this.callingStatusService.getCallingStatuses({type: 'checkbox'}).then((result: Array<CallingStatus>) => {
              this.filteredStatus = this.filteredStatus || result;
              let filterAlert = this.alertCtrl.create({
                title: 'Filter by Calling Status',
                inputs: this.filteredStatus,
                buttons: [
                  {
                    text: 'Apply',
                    handler: data => {
                      this.filteredStatus.forEach(item => {item.checked = !!~data.indexOf(item.value);});
                      let params = Object.assign(this.filterQuery, {
                        filterByStatus: data.join(',')
                      })

                      this.showLoader('Filtering...');
                      this.orgService.getOrgs(params).then((result: Array<Org>) => {
                        this.orgs = result;
                        this.loading.dismiss();
                      }, err => {
                        console.log(err);
                        this.loading.dismiss();
                      });
                    }
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel'
                  }
                ]
              });
              filterAlert.present();
            });
          }
        },
        {
          text: 'Clear Filters',
          handler: () => {
            this.filterQuery = {};
            this.filteredOrgs.forEach(item => {item.checked = false;});
            this.filteredStatus.forEach(item => {item.checked = false;});
            this.showLoader('Removing Filters...');
            this.orgService.getOrgs().then((result: Array<Org>) => {
              this.orgs = result;
              this.loading.dismiss();
            }, err => console.log(err));
          }
        },
        {
          text: 'Reorder Callings',
          handler: () => {
            this.reorderCallings = true;
            this.toolbarColor = 'primary';
            this.title = 'Reorder';
          }
        }
      ]
    });
    actionSheet.present();
  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  doneReordering() {
    this.reorderCallings = false;
    this.toolbarColor = 'light';
    this.title = 'Dashboard';
  }

  addCalling(org) {
    this.addCallingModal = this.modalCtrl.create(AddCallingModal, {org: org});
    this.addCallingModal.present();
  }

  removeCalling(org, calling) {
    this.orgService.removeOrgCalling(org._id, calling._id).then(result => {
      org.callings.splice(org.callings.indexOf(calling), 1);
    }, err => console.log(err));
  }
}

export class Test extends AlertController{

}
