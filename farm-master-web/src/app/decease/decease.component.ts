import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CropsService } from 'app/crops/crops.service';
import { DeceaseService } from './decease.service';
declare var $: any;

@Component({
  selector: 'app-decease',
  templateUrl: './decease.component.html',
  styleUrls: ['./decease.component.css']
})
export class DeceaseComponent implements OnInit {

  deceaseServiceObj: DeceaseService;
  cropServiceObj: CropsService;
  showAddUpdate=false;
  deceaseModels: any;
  deceaseList: any;
  cropsList:any;
  userId: any;
  
  constructor(deceaseServiceObj: DeceaseService,cropServiceObj: CropsService, private router: Router,private http: HttpClient) {
    this.deceaseModels = {};
    this.deceaseServiceObj = deceaseServiceObj;
    this.cropServiceObj = cropServiceObj;
  }

  initialize() {
    this.deceaseModels = {};
    this.deceaseModels.id = 0;
    this.deceaseModels.decease_Id = 0;
    this.deceaseModels.decease_Name = '';
    this.deceaseModels.crop_Id = 0;
    this.deceaseModels.stickey_Card_Updated = false;
    this.getCrops();
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
      this.getDeceases();
    }
  }

  getCrops(){
    this.cropServiceObj.GetCrops().subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        if (res.data[0].crops_Id > 0) {
          this.cropsList = res.data;
        }
      }
    });
  }

  getDeceases() {
    this.deceaseServiceObj.GetDeceases().subscribe((res) => {
      if (res.count == 0) {
        this.deceaseList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.deceaseList = res.data;
      }
    });
  }

  getDeceaseDetails(DeceaseId) {
    this.deceaseServiceObj.getDeceaseDetail(DeceaseId).subscribe((res) => {
      if (res.count == 0) {
        this.deceaseList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.deceaseModels = res.data[0];
          this.showAddUpdate = true;
          console.log(this.deceaseModels);
      }
    });
  }

  Update(){
    var msg = '';
    if(this.deceaseModels.decease_Name == '' || this.deceaseModels.decease_Name == undefined || this.deceaseModels.decease_Name == 'undefined'){
      msg = msg+'Enter Decease Name<br>';
    }
    if(this.deceaseModels.crop_Id == 0 || this.deceaseModels.crop_Id == undefined || this.deceaseModels.crop_Id == 'undefined'){
      msg =  msg+'Select Crop<br>';
    }
    if(this.deceaseModels.decease_Id == 0 || this.deceaseModels.decease_Id == undefined || this.deceaseModels.decease_Id == 'undefined'){
      msg =  msg+'Invalid Decease<br>';
    }
    if(msg == '')
    {
      this.deceaseServiceObj.UpdateDecease(this.deceaseModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].decease_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getDeceases();
            this.showNotification('Data Updated Successfull', 2);
          }
        }
      });
    }
    else{
      this.showNotification(msg, 3);
    }
  }

  Save(){
    var msg = '';
    if(this.deceaseModels.decease_Name == '' || this.deceaseModels.decease_Name == undefined || this.deceaseModels.decease_Name == 'undefined'){
      msg = msg+'Enter Decease Name<br>';
    }
    if(this.deceaseModels.crop_Id == 0 || this.deceaseModels.crop_Id == undefined || this.deceaseModels.crop_Id == 'undefined'){
      msg =  msg+'Select Crop<br>';
    }
    if(msg == '')
    {
      this.deceaseServiceObj.SaveDecease(this.deceaseModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].decease_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getDeceases();
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else{
      this.showNotification(msg, 3);
    }
  }

  getCropById(CropId){
    let findedData = this.cropsList.find(i => i.crops_Id === CropId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.crop_Name;
  }
  
  chkStickeyCardUpdated(event){
    this.deceaseModels.stickey_Card_Updated = event.checked;
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
