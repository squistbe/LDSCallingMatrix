import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

import { UnitService, MemberInfo } from '../../providers/unit-service';
import { OrgService } from '../../providers/org-service';

@Component({
  selector: 'page-edit-calling',
  templateUrl: 'edit-calling.html'
})
export class EditCallingModal {
  searchTerm: string = '';
	searchControl: FormControl;
	items: any;
	searching: any = false;
  calling: any;
  org: any;
  selectedMember: MemberInfo;

  constructor(public viewCtrl: ViewController, public params: NavParams, public unitService: UnitService, public orgService: OrgService) {
    this.calling = this.params.get('calling');
    this.org = this.params.get('org');
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(1000).subscribe(search => {
      this.setFilteredItems();
    });
  }

  onSearchInput(){
		this.searching = true;
	}

  setFilteredItems() {
    let params = {
      searchTerm: this.searchTerm
    };

    this.unitService.filterMembers(params).then((result) => {
      this.searching = false;
      this.items = result;
    }, (err) => {
      console.log(err);
    });;
  }

  itemSelected(member) {
    this.selectedMember = member;
  }

  removeMember() {
    delete this.selectedMember;
  }

  save() {
    let params = {
      memberId: this.selectedMember._id
    };

    this.orgService.updateOrgCalling(this.org._id, this.calling._id, params).then((result: MemberInfo) => {
      this.viewCtrl.dismiss(result);
    }, err => console.log(err));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
