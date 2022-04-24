import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from 'app/farm/Farm.service';
import { PestService } from 'app/pest/Pest.service';
import { UserService } from 'app/user-profile/User.service';
import { environment } from 'environments/environment';
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
  pestImage='';

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
    this.cropModels.farm_Id = 0;
    this.cropModels.pest_Id = 0;
    this.getFarmer();
    this.getFarmsByFarmerId(0);
    this.getPest();
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
      this.getCrops();
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
    console.log("this.farmList");
    this.farmServiceObj.GetFarmsForFarmer(userId).subscribe((res) => {
      if (res.count == 0) {
        this.farmList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.farmList = res.data;
        //this.getPest();
        console.log(this.farmList);
      }
    });
  }

  getPest() {
    this.pestServiceObj.GetPests().subscribe((res) => {
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

  getCrops() {
    this.cropServiceObj.GetCrops().subscribe((res) => {
      if (res.count == 0) {
        this.cropList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.cropList = res.data;
      }
    });
  }

  getCropDetails(CropId) {
    this.cropServiceObj.getCropDetail(CropId).subscribe((res) => {
      if (res.count == 0) {
        this.pestList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.cropModels = res.data[0];
          this.showAddUpdate = true;
      }
    });
  }

  Update(){
    var msg = '';
    if(this.cropModels.crop_Name == '' || this.cropModels.crop_Name == undefined || this.cropModels.crop_Name == 'undefined'){
      msg = msg+'Enter Crop Name<br>';
    }
    if(this.cropModels.no_Acerage == undefined || this.cropModels.no_Acerage == 'undefined'){
      msg =  msg+'Enter No of Acerage<br>';
    }
    if(this.cropModels.intensity == undefined || this.cropModels.intensity == 'undefined'){
      msg =  msg+'Enter Intensity<br>';
    }
    if(this.cropModels.farmer_Id == 0 || this.cropModels.farmer_Id == undefined || this.cropModels.farmer_Id == 'undefined'){
      msg =  msg+'Select Farmer<br>';
    }
    if(this.cropModels.farm_Id == 0 || this.cropModels.farm_Id == undefined || this.cropModels.farm_Id == 'undefined'){
      msg =  msg+'Select Farm<br>';
    }
    if(this.cropModels.pest_Id == 0 || this.cropModels.pest_Id == undefined || this.cropModels.pest_Id == 'undefined'){
      msg =  msg+'Select Pest<br>';
    }
    if(this.cropModels.crops_Id == 0 || this.cropModels.crops_Id == undefined || this.cropModels.crops_Id == 'undefined'){
      msg =  msg+'Invalid Crop<br>';
    }
    if(msg == '')
    {
      this.cropServiceObj.UpdatCrop(this.cropModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].crops_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getCrops();
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
    if(this.cropModels.crop_Name == '' || this.cropModels.crop_Name == undefined || this.cropModels.crop_Name == 'undefined'){
      msg = msg+'Enter Crop Name<br>';
    }
    if(this.cropModels.no_Acerage == undefined || this.cropModels.no_Acerage == 'undefined'){
      msg =  msg+'Enter No of Acerage<br>';
    }
    if(this.cropModels.intensity == undefined || this.cropModels.intensity == 'undefined'){
      msg =  msg+'Enter Intensity<br>';
    }
    if(this.cropModels.farmer_Id == 0 || this.cropModels.farmer_Id == undefined || this.cropModels.farmer_Id == 'undefined'){
      msg =  msg+'Select Farmer<br>';
    }
    if(this.cropModels.farm_Id == 0 || this.cropModels.farm_Id == undefined || this.cropModels.farm_Id == 'undefined'){
      msg =  msg+'Select Farm<br>';
    }
    if(this.cropModels.pest_Id == 0 || this.cropModels.pest_Id == undefined || this.cropModels.pest_Id == 'undefined'){
      msg =  msg+'Select Pest<br>';
    }
    if(msg == '')
    {
      this.cropServiceObj.SaveCrop(this.cropModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].crops_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getCrops();
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else{
      this.showNotification(msg, 3);
    }
  }

  getFarmerById(FarmerId){
    let findedData = this.farmerList.find(i => i.id === FarmerId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.firstName;
  }
  
  getFarmById(FarmId){
    let findedData = this.farmList.find(i => i.farm_Id === FarmId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.farm_Name;
  }
  
  getPestById(PestId){
    let findedData = this.pestList.find(i => i.pest_Id === PestId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    this.pestImage =  findedData.pest_Image;
    return findedData.pest_Name;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
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
