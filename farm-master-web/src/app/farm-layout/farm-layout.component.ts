import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from 'app/farm/Farm.service';
import { FarmLayoutService } from './farm-layout.service';
import { Phase,House } from './Phase';
declare var $: any;

@Component({
  selector: 'app-farm-layout',
  templateUrl: './farm-layout.component.html',
  styleUrls: ['./farm-layout.component.css']
})
export class FarmLayoutComponent implements OnInit {
  
  farmLayoutServiceObj: FarmLayoutService;
  farmServiceObj: FarmService;
  showAddUpdate=false;
  phaseModels: Phase;
  houseModels: House;
  phaseList:any;
  farmList: any;
  houseList:any;
  userId:any;
  farmId = 0;
  phaseId = 0;

  constructor(farmLayoutServiceObj: FarmLayoutService,farmServiceObj: FarmService, private router: Router) {
    this.farmLayoutServiceObj = farmLayoutServiceObj;
    this.farmServiceObj = farmServiceObj;
    this.farmList = [];
    this.phaseList = [];
  }

  initialize() {
    this.phaseModels = new Phase();
    this.phaseModels.phase_Id = 0;

    this.houseModels = new House();
    this.houseModels.house_Id = 0;

    this.getFarmsByFarmerId(this.userId);
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

  getPhase(farmId){
    this.farmLayoutServiceObj.GetPhase(farmId).subscribe((res) => {
      if (res.count == 0) {
        this.phaseList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.phaseList = res.data;
      }
    });
  }

  getHouse(phaseId){
    this.farmLayoutServiceObj.GetHouse(phaseId).subscribe((res) => {
      if (res.count == 0) {
        this.houseList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.houseList = res.data;
      }
    });
  }

  getFarmsByFarmerId(userId) {
    this.farmServiceObj.GetFarmsForFarmer(userId).subscribe((res) => {
      if (res.count == 0) {
        this.farmList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.farmList = res.data;
     }
    });
  }

  SavePhase(){
    this.phaseModels.farm_Id = this.farmId;
    this.phaseModels.farmer_Id = this.userId;
    console.log(this.phaseModels);
    var msg = '';
    if(this.phaseModels.farm_Id == 0 || this.phaseModels.farm_Id == undefined ){
      msg = msg+'Select Farm<br>';
    }
    if(this.phaseModels.farmer_Id == 0 || this.phaseModels.farmer_Id == undefined){
      msg = msg+'Select Farmer<br>';
    }
    if(this.phaseModels.phase_Name == "" || this.phaseModels.phase_Name == undefined || this.phaseModels.phase_Name == "undefined"){
      msg = msg+'Enter Phase Name<br>';
    }
    if(msg == '')
    {
      this.farmLayoutServiceObj.SavePhase(this.phaseModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].phase_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getPhase(this.farmId);
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else{
      this.showNotification(msg, 3);
    }
  }

  SaveHouse(){
    this.houseModels.phase_Id = this.phaseId;
    console.log(this.phaseModels);
    var msg = '';
    if(this.houseModels.phase_Id == 0 || this.houseModels.phase_Id == undefined ){
      msg = msg+'Select Phase<br>';
    }
    if(this.houseModels.house_Name == "" || this.houseModels.house_Name == undefined || this.houseModels.house_Name == "undefined"){
      msg = msg+'Enter House Name<br>';
    }
    if(msg == '')
    {
      this.farmLayoutServiceObj.SaveHouse(this.houseModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].house_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getPhase(this.farmId);
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else{
      this.showNotification(msg, 3);
    }
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
