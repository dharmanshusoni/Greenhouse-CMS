import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CropsService } from 'app/crops/crops.service';
import { PlantationService } from './Plantation.service';
declare var $: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-plantation',
  templateUrl: './plantation.component.html',
  styleUrls: ['./plantation.component.css']
})
export class PlantationComponent implements OnInit {

  plantationServiceObj: PlantationService;
  cropServiceObj: CropsService;
  showAddUpdate=false;
  plantationModels: any;
  plantationList: any;
  cropsList: any;
  userId: any;
  farmId: any;
  datePipes : any;

  constructor(plantationServiceObj: PlantationService,cropServiceObj: CropsService,private datePipe: DatePipe, private router: Router) {
    this.plantationModels = {};
    this.plantationServiceObj = plantationServiceObj;
    this.cropServiceObj = cropServiceObj;
    this.datePipes = datePipe;
  }

  initialize() {
    this.plantationModels = {};
    this.plantationModels.plantation_Id = 0;
    this.plantationModels.plantation_Date = '';
    this.plantationModels.cleanout_Date = '';
    this.plantationModels.no_Acerage = 0;
    this.plantationModels.crop_Id = 0;
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
      this.getPlantations();
    }

  }

  getCrops(){
    this.cropServiceObj.GetCrops().subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        if (res.data[0].crop_Id > 0) {
          this.cropsList = res.data;
        }
      }
    });
  }

  getPlantations() {
    this.plantationServiceObj.GetPlantations().subscribe((res) => {
      if (res.count == 0) {
        this.plantationList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.plantationList = res.data;
          console.log(this.plantationList);
      }
    });
  }

  getPlantationDetails(PlantationId) {
    this.plantationServiceObj.getPlantationDetail(PlantationId).subscribe((res) => {
      if (res.count == 0) {
        this.plantationList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.plantationModels = res.data[0];
          //this.plantationModels.plantation_Date = this.getDate(this.plantationModels.plantation_Date);
          //this.plantationModels.cleanout_Date = this.getDate(this.plantationModels.cleanout_Date);
          console.log(this.plantationModels);
          this.showAddUpdate = true;
      }
    });
  }

  Update(){
    this.plantationModels.plantation_Date = this.datePipes.transform(this.plantationModels.plantation_Date, 'MM/dd/yyyy');
    this.plantationModels.cleanout_Date = this.datePipes.transform(this.plantationModels.cleanout_Date, 'MM/dd/yyyy');
    console.log(this.plantationModels);
    var msg = '';
    if(this.plantationModels.plantation_Date == '' || this.plantationModels.plantation_Date == undefined || this.plantationModels.plantation_Date == 'undefined'){
      msg = msg+'Enter Plantation Date<br>';
    }
    if(this.plantationModels.cleanout_Date == '' || this.plantationModels.cleanout_Date == undefined || this.plantationModels.cleanout_Date  == 'undefined'){
      msg =  msg+'Enter Cleanout Date<br>';
    }
    if(this.plantationModels.no_Acerage == undefined || this.plantationModels.no_Acerage == 'undefined'){
      msg =  msg+'Enter No of Acerage<br>';
    }
    if(this.plantationModels.plantation_Id == 0 || this.plantationModels.plantation_Id == undefined || this.plantationModels.plantation_Id == 'undefined'){
      msg =  msg+'Invalid Plantation<br>';
    }
    if(this.plantationModels.crop_Id == 0 || this.plantationModels.crop_Id == undefined || this.plantationModels.crop_Id == 'undefined'){
      msg =  msg+'Select Crop<br>';
    }
    if(msg == '')
    {
      this.plantationServiceObj.UpdatePlantation(this.plantationModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].plantation_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getPlantations();
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
    this.plantationModels.plantation_Date = this.getDate(this.plantationModels.plantation_Date); //this.datePipes.transform(this.plantationModels.plantation_Date, 'MM/dd/yyyy');
    this.plantationModels.cleanout_Date = this.getDate(this.plantationModels.plantation_Date); //this.datePipes.transform(this.plantationModels.cleanout_Date, 'MM/dd/yyyy');
    var msg = '';
    if(this.plantationModels.plantation_Date == '' || this.plantationModels.plantation_Date == undefined || this.plantationModels.plantation_Date == 'undefined'){
      msg = msg+'Enter Plantation Date<br>';
    }
    if(this.plantationModels.cleanout_Date == '' || this.plantationModels.cleanout_Date == undefined || this.plantationModels.cleanout_Date  == 'undefined'){
      msg =  msg+'Enter Cleanout Date<br>';
    }
    if(this.plantationModels.no_Acerage == undefined || this.plantationModels.no_Acerage == 'undefined'){
      msg =  msg+'Enter No of Acerage<br>';
    }
    if(this.plantationModels.crop_Id == 0 || this.plantationModels.crop_Id == undefined || this.plantationModels.crop_Id == 'undefined'){
      msg =  msg+'Select Crop<br>';
    }
    if(msg == '')
    {
      this.plantationServiceObj.SavePlantation(this.plantationModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].plantation_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getPlantations();
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
    let findedData = this.cropsList.find(i => i.crop_Id === CropId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.crop_Name;
  }

  getDate(date){
    return this.datePipes.transform(date,'MM/dd/yyyy')
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
