import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from './application.service';
declare var $: any;
import { DatePipe } from '@angular/common';
import { DeceaseService } from 'app/Decease/decease.service';
import { UserService } from 'app/user-profile/User.service';
import { UsersService } from 'app/user/Users.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applicationServiceObj: ApplicationService;
  deceaseServiceObj: DeceaseService;
  profileServiceObj: UsersService;
  showAddUpdate=false;
  applicationModels: any;
  applicationList: any;
  applicationTypeList:any;
  userList: any;
  deceaseList: any;
  userId: any;
  datePipes : any;

  constructor(applicationServiceObj: ApplicationService,deceaseServiceObj: DeceaseService,profileServiceObj: UsersService,private datePipe: DatePipe, private router: Router) {
    this.applicationModels = {};
    this.applicationServiceObj = applicationServiceObj;
    this.deceaseServiceObj = deceaseServiceObj;
    this.profileServiceObj = profileServiceObj;
    this.datePipes = datePipe;
  }

  initialize() {
    this.applicationModels = {};
    this.applicationModels.application_Id = 0;
    this.applicationModels.application_type = 0;
    this.applicationModels.application_Name = '';
    this.applicationModels.application_Date = '';
    this.applicationModels.application_Time = '';
    this.applicationModels.application_who_Assigned = 0;
    this.applicationModels.application_Assigned_To = 0;
    this.applicationModels.decease_Id = 0; 
    this.getApplicationTypes();
    this.getDeceases();
    this.getUsers();
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
      this.getApplicationTypes();
      this.getApplications();
    }

  }

  getApplicationTypes(){
    this.applicationServiceObj.GetApplicationTypes(0).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.applicationTypeList = res.data;
          console.log("this.applicationTypeList");
          console.log(this.applicationTypeList);
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

  getUsers(){
    this.profileServiceObj.getUserDetail(this.userId,0).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.userList = res.data;
      }
    });
  }

  getApplications() {
    this.applicationServiceObj.GetApplications().subscribe((res) => {
      if (res.count == 0) {
        this.applicationList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.applicationList = res.data;
      }
    });
  }

  getApplicationDetails(ApplicationId) {
    this.applicationServiceObj.getApplicationDetail(ApplicationId).subscribe((res) => {
      if (res.count == 0) {
        this.applicationList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.applicationModels = res.data[0];
          console.log(this.applicationModels);
          this.showAddUpdate = true;
      }
    });
  }

  Update(){
    const now = new Date();
    this.applicationModels.application_who_Assigned = this.userId;
    var msg = '';
    if(this.applicationModels.application_Id == 0 || this.applicationModels.application_Id == undefined || this.applicationModels.application_Id == 'undefined'){
      msg = msg+'Invalid Application<br>';
    }
    if(this.applicationModels.application_Date == '' || this.applicationModels.application_Date == undefined || this.applicationModels.application_Date  == 'undefined'){
      msg =  msg+'Unable to Get Date<br>';
    }
    if(this.applicationModels.application_Time == '' || this.applicationModels.application_Time == undefined || this.applicationModels.application_Time == 'undefined'){
      msg =  msg+'Unable to Get Time<br>';
    }
    if(this.applicationModels.application_type == 0 || this.applicationModels.application_type == undefined || this.applicationModels.application_type == 'undefined'){
      msg =  msg+'Invalid Type<br>';
    }
    if(this.applicationModels.application_Name == '' || this.applicationModels.application_Name == undefined || this.applicationModels.application_Name == 'undefined'){
      msg =  msg+'Enter Name<br>';
    }
    if(this.applicationModels.decease_Id == 0 || this.applicationModels.decease_Id == undefined || this.applicationModels.decease_Id == 'undefined'){
      msg =  msg+'Select Decease<br>';
    }
    if(this.applicationModels.application_Assigned_To == 0 || this.applicationModels.application_Assigned_To == undefined || this.applicationModels.application_Assigned_To == 'undefined'){
      msg =  msg+'Select Assigned To<br>';
    }
    if(msg == '')
    {
      this.applicationServiceObj.UpdateApplication(this.applicationModels).subscribe((res) => {
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].application_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getApplications();
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
    const now = new Date();
    this.applicationModels.application_Date = now.toLocaleDateString();
    this.applicationModels.application_Time = this.CurrentTime();
    this.applicationModels.application_who_Assigned = this.userId;
    var msg = '';
    if(this.applicationModels.application_Date == '' || this.applicationModels.application_Date == undefined || this.applicationModels.application_Date  == 'undefined'){
      msg =  msg+'Unable to Get Date<br>';
    }
    if(this.applicationModels.application_Time == '' || this.applicationModels.application_Time == undefined || this.applicationModels.application_Time == 'undefined'){
      msg =  msg+'Unable to Get Time<br>';
    }
    if(this.applicationModels.application_type == 0 || this.applicationModels.application_type == undefined || this.applicationModels.application_type == 'undefined'){
      msg =  msg+'Invalid Type<br>';
    }
    if(this.applicationModels.application_Name == '' || this.applicationModels.application_Name == undefined || this.applicationModels.application_Name == 'undefined'){
      msg =  msg+'Enter Name<br>';
    }
    if(this.applicationModels.decease_Id == 0 || this.applicationModels.decease_Id == undefined || this.applicationModels.decease_Id == 'undefined'){
      msg =  msg+'Select Decease<br>';
    }
    if(this.applicationModels.application_Assigned_To == 0 || this.applicationModels.application_Assigned_To == undefined || this.applicationModels.application_Assigned_To == 'undefined'){
      msg =  msg+'Select Assigned To<br>';
    }
    if(msg == '')
    {
      this.applicationServiceObj.SaveApplication(this.applicationModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].application_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getApplications();
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else{
      this.showNotification(msg, 3);
    }
  }

  getDeceaseById(DeceaseId){
    let findedData = this.deceaseList.find(i => i.decease_Id === DeceaseId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.decease_Name;
  }

  getApplicationType(ApplicationTypeId){
    let findedData = this.applicationTypeList.find(i => i.applicationTypeId === ApplicationTypeId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.applicationTypes;
  }

  getUserByID(UserId){
    let findedData = this.userList.find(i => i.user_Id === UserId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.user_First_Name;
  }

  getDate(date){
    return this.datePipes.transform(date,'MM/dd/yyyy')
  }

  CurrentTime() {
    var today = new Date();
    var hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    var minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    var seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
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
