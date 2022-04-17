import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from 'app/farm/Farm.service';
import { PestService } from 'app/pest/Pest.service';
import { UserService } from 'app/user-profile/User.service';
import { CropsService } from './crops.service';
declare var $: any;

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

  pestServiceObj: PestService;
  usersServiceObj: UserService;
  cropServiceObj: CropsService;
  farmServiceObj: FarmService;
  showAddUpdate=false;
  cropList: any;
  cropModels: any;
  pestList: any;
  farmList: any;
  farmerList: any;
  farmId: any;
  farmerId: any;
  pestId:any;
  userId: any;

  constructor(pestServiceObj: PestService,usersServiceObj: UserService,cropServiceObj: CropsService,farmServiceObj: FarmService, private router: Router) {
    this.cropModels = {};
    this.pestServiceObj = pestServiceObj;
    this.usersServiceObj = usersServiceObj;
    this.cropServiceObj = cropServiceObj;
    this.farmServiceObj = farmServiceObj;
    this.farmerList = [];
    this.farmList = [];
    this.pestList = [];
    this.cropList = [];
  }

  initialize() {
    this.cropModels = {};
    this.cropModels.id = 0;
    this.cropModels.crops_Id = 0;
    this.cropModels.crop_Name = '';
    this.cropModels.no_Acerage = 0;
    this.cropModels.intensity = 0;
    this.cropModels.farmer_Id = 0;
    this.cropModels.fram_Id = 0;
    this.cropModels.pest_id = 0;
    this.getFarmer();
  }

  ngOnInit() {

    if (sessionStorage.getItem('userId') == null || sessionStorage.getItem('userId') == undefined
      || sessionStorage.getItem('userId') == 'null' || sessionStorage.getItem('userId') == 'undefined') {
      this.router.navigateByUrl('/login');
    }
    else {
      console.log('user logged in : ' + sessionStorage.getItem('userId'));
      this.userId = sessionStorage.getItem('userId');
      this.initialize();
    }

  }

  getFarmer(){
    this.usersServiceObj.getProfileDetail(0).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        if (res.data[0].id > 0) {
          this.farmerList = res.data;
          console.log(this.farmerList);
        }
      }
    });
  }

  getFarmsByFarmerId(userId) {
    console.log(userId);
    this.farmServiceObj.GetFarmsForFarmer(userId).subscribe((res) => {
      if (res.count == 0) {
        this.farmList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.farmList = res.data;
        console.log(this.farmList);
      }
    });
  }

  getPest() {

    this.pestServiceObj.GetFarmsForFarmer().subscribe((res) => {
      if (res.count == 0) {
        this.pestList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.pestList = res.data;
        console.log(this.pestList);
      }
    });
  }

  showNotification(Message, type) {
    const types = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "notifications",
      message: Message

    }, {
      type: types[type],
      timer: 1000,
      placement: {
        from: 'top',
        align: 'center'
      },
      template:
        '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
