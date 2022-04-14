import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmService } from './Farm.service';
declare var $: any;

@Component({
  selector: 'app-farm-profile',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  farmServiceObj: FarmService;
  farmModels: any;
  farmList: any;
  userId: any;
  farmId: any;

  constructor(farmServiceObj: FarmService, private router: Router) {
    this.farmModels = {};
    this.farmServiceObj = farmServiceObj;
  }

  initialize() {
    this.farmModels = {};
    this.farmModels.id = 0;
    this.farmModels.Farmer_Id = 0;
    this.farmModels.Farm_Name = '';
    this.farmModels.Farm_Address = '';
    this.farmModels.Farm_Address_2 = '';
    this.farmModels.City = '';
    this.farmModels.State = '';
    this.farmModels.Country = '';
    this.farmModels.PostalCode = '';
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
      this.getFarmsForFarmer(this.userId);
    }

  }

  getFarmsForFarmer(userId) {
    this.farmServiceObj.GetFarmsForFarmer(userId).subscribe((res) => {
      //console.log(res);
      if (res.count == 0) {
        this.farmList = [];
        this.showNotification(res.message, 4);
        console.log(this.farmList);
      }
      else if (res.count > 0) {
          this.farmList = res.data;
          console.log(this.farmList);
      }
    });
  }

  Update(){
    console.log(this.farmModels);
    var msg = '';

    if(this.farmModels.Farm_Name == '' || this.farmModels.Farm_Name == undefined || this.farmModels.Farm_Name == 'undefined'){
      msg = msg+'Enter Farm Name<br>';
    }
    if(this.farmModels.Farm_Address == '' || this.farmModels.Farm_Address == undefined || this.farmModels.Farm_Address == 'undefined'){
      msg =  msg+'Enter Address Line 1<br>';
    }
    if(this.farmModels.Farm_Address_2 == '' || this.farmModels.Farm_Address_2 == undefined || this.farmModels.Farm_Address_2 == 'undefined'){
      msg =  msg+'Enter Address Line 2<br>';
    }
    if(this.farmModels.City == '' || this.farmModels.City == undefined || this.farmModels.City == 'undefined'){
      msg =  msg+'Enter City<br>';
    }
    if(this.farmModels.State == '' || this.farmModels.State == undefined || this.farmModels.State == 'undefined'){
      msg =  msg+'Enter State<br>';
    }
    if(this.farmModels.Country == '' || this.farmModels.Country == undefined || this.farmModels.Country == 'undefined'){
      msg =  msg+'Enter Country<br>';
    }
    if(this.farmModels.PostalCode == '' || this.farmModels.PostalCode == undefined || this.farmModels.PostalCode == 'undefined'){
      msg =  msg+'Enter Postal Code<br>';
    }
    if(this.farmModels.Farmer_Id == 0 || this.farmModels.Farmer_Id == undefined || this.farmModels.Farmer_Id == 'undefined'){
      msg =  msg+'Select Farmer<br>';
    }
    if(msg == '')
    {
      this.farmServiceObj.UpdateFarm(this.farmModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].id > 0) {
            this.initialize();
            this.getFarmsForFarmer(this.userId);
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
    console.log(this.farmModels);
    var msg = '';
    if(this.farmModels.Farm_Name == '' || this.farmModels.Farm_Name == undefined || this.farmModels.Farm_Name == 'undefined'){
      msg = msg+'Enter Farm Name<br>';
    }
    if(this.farmModels.Farm_Address == '' || this.farmModels.Farm_Address == undefined || this.farmModels.Farm_Address == 'undefined'){
      msg =  msg+'Enter Address Line 1<br>';
    }
    if(this.farmModels.Farm_Address_2 == '' || this.farmModels.Farm_Address_2 == undefined || this.farmModels.Farm_Address_2 == 'undefined'){
      msg =  msg+'Enter Address Line 2<br>';
    }
    if(this.farmModels.City == '' || this.farmModels.City == undefined || this.farmModels.City == 'undefined'){
      msg =  msg+'Enter City<br>';
    }
    if(this.farmModels.State == '' || this.farmModels.State == undefined || this.farmModels.State == 'undefined'){
      msg =  msg+'Enter State<br>';
    }
    if(this.farmModels.Country == '' || this.farmModels.Country == undefined || this.farmModels.Country == 'undefined'){
      msg =  msg+'Enter Country<br>';
    }
    if(this.farmModels.PostalCode == '' || this.farmModels.PostalCode == undefined || this.farmModels.PostalCode == 'undefined'){
      msg =  msg+'Enter Postal Code<br>';
    }
    if(this.farmModels.Farmer_Id == 0 || this.farmModels.Farmer_Id == undefined || this.farmModels.Farmer_Id == 'undefined'){
      msg =  msg+'Select Farmer<br>';
    }
    if(msg == '')
    {
      this.farmServiceObj.SaveFarm(this.farmModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].id > 0) {
            this.initialize();
            this.getFarmsForFarmer(this.userId);
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
      timer: 3000,
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
