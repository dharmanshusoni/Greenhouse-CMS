import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmComponent } from 'app/farm/farm.component';
import { FarmService } from 'app/farm/Farm.service';
import { environment } from 'environments/environment';
import { UsersService } from './Users.service';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profileServiceObj: UsersService;
  farmServiceObj: FarmService;
  userModels: any;
  userList: any;
  userTypeList: any;
  userId: any;
  ProfileName = '';
  farmList: any;
  farmModels: any;
  AddNewFarm = false;
  AddNewProfile = false;
  public progress: number;
  public message: string;
  public imageResponse: {dbPath: ''};

  constructor(profileServiceObj: UsersService, private router: Router, farmServiceObj: FarmService,private http: HttpClient) {
    this.userModels = {};
    this.profileServiceObj = profileServiceObj;
    this.farmServiceObj = farmServiceObj;
  }

  initialize() {
    this.userModels = {};
    this.userModels.user_Id = 0;
    this.userModels.user_First_Name = '';
    this.userModels.user_Last_Name = '';
    this.userModels.user_Email_Id = '';
    this.userModels.password = '';
    this.userModels.user_Image = '';
    this.userModels.user_Phone = '';
    this.userModels.userType_Id = 0;
    this.userModels.farmer_Id = 0;
    this.AddNewProfile = true;
    this.getUserType(0);
    //this.initializeFarm();
    //this.getUsers(this.userId,0);
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
      //this.initializeFarm();
      //this.getProfileDetail(this.userId);
      //this.getFarmsDetails(this.userId);
      this.getAllUsers();
    }

  }

  getUserType(userTypeId){
    this.profileServiceObj.getUserType(userTypeId).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.userTypeList = res.data;
        }
    });
  }

  getUserDetail(farmerId,userId) {
    this.profileServiceObj.getUserDetail(farmerId,userId).subscribe((res) => {
      console.log(res);
      //this.AddNewFarm = false;
      this.AddNewProfile = true;
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        if (res.data[0].user_Id > 0) {
          this.userModels = res.data[0];
          if (sessionStorage.getItem('userId') == this.userModels.user_Id) {
            this.ProfileName = 'Your';
          }
          else {
            this.ProfileName = this.userModels.user_First_Name;
          }
        }
      }
    });
  }

  getAllUsers() {
    this.AddNewProfile = false;
    this.profileServiceObj.getUserDetail(this.userId,0).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.userList = res.data;
      }
    });
  }

  Update() {
    var msg = '';
    this.userModels.farmer_Id = this.userId;
    if (this.userModels.user_Email_Id == '' || this.userModels.user_Email_Id == undefined || this.userModels.user_Email_Id == 'undefined') {
      msg = msg + 'Enter Email<br>';
    }
    if (this.userModels.password == '' || this.userModels.password == undefined || this.userModels.password == 'undefined') {
      msg = msg + 'Enter Password<br>';
    }
    if (this.userModels.user_First_Name == '' || this.userModels.user_First_Name == undefined || this.userModels.user_First_Name == 'undefined') {
      msg = msg + 'Enter First Name<br>';
    }
    if (this.userModels.user_Last_Name == '' || this.userModels.user_Last_Name == undefined || this.userModels.user_Last_Name == 'undefined') {
      msg = msg + 'Enter Last Name<br>';
    }
    if (this.userModels.user_Phone == '' || this.userModels.user_Phone == undefined || this.userModels.user_Phone == 'undefined') {
      msg = msg + 'Enter Phone No<br>';
    }
    if (this.userModels.user_Image == '' || this.userModels.user_Image == undefined || this.userModels.user_Image == 'undefined') {
      //msg =  msg+'Select Image<br>';
      this.userModels.user_Image = "Resources/default.png";
    }
    if (msg == '') {
      this.profileServiceObj.UpdateUser(this.userModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].user_Id > 0) {
            this.initialize();
            this.getAllUsers();
            this.AddNewProfile = false;
            this.showNotification('Data Updated Successfull', 2);
          }
        }
      });
    }
    else {
      this.showNotification(msg, 3);
    }
  }

  Save() {
    var msg = '';
    this.userModels.farmer_Id = this.userId;
    if (this.userModels.user_Email_Id == '' || this.userModels.user_Email_Id == undefined || this.userModels.user_Email_Id == 'undefined') {
      msg = msg + 'Enter Email<br>';
    }
    if (this.userModels.password == '' || this.userModels.password == undefined || this.userModels.password == 'undefined') {
      msg = msg + 'Enter Password<br>';
    }
    if (this.userModels.user_First_Name == '' || this.userModels.user_First_Name == undefined || this.userModels.user_First_Name == 'undefined') {
      msg = msg + 'Enter First Name<br>';
    }
    if (this.userModels.user_Last_Name == '' || this.userModels.user_Last_Name == undefined || this.userModels.user_Last_Name == 'undefined') {
      msg = msg + 'Enter Last Name<br>';
    }
    if (this.userModels.user_Phone == '' || this.userModels.user_Phone == undefined || this.userModels.user_Phone == 'undefined') {
      msg = msg + 'Enter Phone No<br>';
    }
    if (this.userModels.user_Image == '' || this.userModels.user_Image == undefined || this.userModels.user_Image == 'undefined') {
      //msg =  msg+'Select Image<br>';
      this.userModels.user_Image = "Resources/default.png";
    }
    if (msg == '') {
      this.profileServiceObj.SaveUser(this.userModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].user_Id > 0) {
            this.initialize();
            this.getAllUsers();
            this.AddNewProfile = false;
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else {
      this.showNotification(msg, 3);
    }
  }

  // UpdateFarms(){
  //   var msg = '';
  //   this.farmModels.farmer_Id = this.userId;
  //   if (this.farmModels.farmer_Id == '' || this.farmModels.farmer_Id == undefined || this.farmModels.farmer_Id == 'undefined' || this.farmModels.farmer_Id == '0' || this.farmModels.farmer_Id == 0) {
  //     msg = msg + 'Select a Farmer<br>';
  //   }
  //   if (this.farmModels.farm_Name == '' || this.farmModels.farm_Name == undefined || this.farmModels.farm_Name == 'undefined') {
  //     msg = msg + 'Enter Farm Name<br>';
  //   }
  //   if (this.farmModels.farm_Address == '' || this.farmModels.farm_Address == undefined || this.farmModels.farm_Address == 'undefined') {
  //     msg = msg + 'Enter Farm Address<br>';
  //   }
  //   if (this.farmModels.farm_Address_2 == '' || this.farmModels.farm_Address_2 == undefined || this.farmModels.farm_Address_2 == 'undefined') {
  //     msg = msg + 'Enter Farm Address 2<br>';
  //   }
  //   if (this.farmModels.city == '' || this.farmModels.city == undefined || this.farmModels.city == 'undefined') {
  //     msg = msg + 'Enter City<br>';
  //   }
  //   if (this.farmModels.state == '' || this.farmModels.state == undefined || this.farmModels.state == 'undefined') {
  //     msg = msg + 'Enter State<br>';
  //   }
  //   if (this.farmModels.country == '' || this.farmModels.country == undefined || this.farmModels.country == 'undefined') {
  //     msg = msg + 'Enter Country<br>';
  //   }
  //   if (this.farmModels.postalCode == '' || this.farmModels.postalCode == undefined || this.farmModels.postalCode == 'undefined') {
  //     msg = msg + 'Enter PostalCode<br>';
  //   }
  //   if (msg == '') {
  //     this.farmServiceObj.UpdateFarm(this.farmModels).subscribe((res) => {
  //       if (res.count == 0) {
  //         this.showNotification(res.message, 4);
  //       }
  //       else if (res.count > 0) {
  //         if (res.data[0].farm_Id > 0) {
  //           this.initializeFarm();
  //           this.AddNewFarm = false;
  //           this.getFarmsDetails(this.userId);
  //           this.showNotification('Data Saved Successfull', 2);
  //         }
  //       }
  //     });
  //   }
  //   else {
  //     this.showNotification(msg, 3);
  //   }
  // }

  // SaveFarms(){
  //   console.log(this.farmModels);
  //   var msg = '';
  //   this.farmModels.farm_Id = 0;
  //   this.farmModels.farmer_Id = this.userId;
  //   if (this.farmModels.farmer_Id == '' || this.farmModels.farmer_Id == undefined || this.farmModels.farmer_Id == 'undefined' || this.farmModels.farmer_Id == '0' || this.farmModels.farmer_Id == 0) {
  //     msg = msg + 'Select Farmer<br>';
  //   }
  //   if (this.farmModels.farm_Name == '' || this.farmModels.farm_Name == undefined || this.farmModels.farm_Name == 'undefined') {
  //     msg = msg + 'Enter Farm Name<br>';
  //   }
  //   if (this.farmModels.farm_Address == '' || this.farmModels.farm_Address == undefined || this.farmModels.farm_Address == 'undefined') {
  //     msg = msg + 'Enter Farm Address<br>';
  //   }
  //   if (this.farmModels.farm_Address_2 == '' || this.farmModels.farm_Address_2 == undefined || this.farmModels.farm_Address_2 == 'undefined') {
  //     msg = msg + 'Enter Farm Address 2<br>';
  //   }
  //   if (this.farmModels.city == '' || this.farmModels.city == undefined || this.farmModels.city == 'undefined') {
  //     msg = msg + 'Enter City<br>';
  //   }
  //   if (this.farmModels.state == '' || this.farmModels.state == undefined || this.farmModels.state == 'undefined') {
  //     msg = msg + 'Enter State<br>';
  //   }
  //   if (this.farmModels.country == '' || this.farmModels.country == undefined || this.farmModels.country == 'undefined') {
  //     msg = msg + 'Enter Country<br>';
  //   }
  //   if (this.farmModels.postalCode == '' || this.farmModels.postalCode == undefined || this.farmModels.postalCode == 'undefined') {
  //     msg = msg + 'Enter PostalCode<br>';
  //   }
  //   if (msg == '') {
  //     this.farmServiceObj.SaveFarm(this.farmModels).subscribe((res) => {
  //       if (res.count == 0) {
  //         this.showNotification(res.message, 4);
  //       }
  //       else if (res.count > 0) {
  //         if (res.data[0].farm_Id > 0) {
  //           this.initializeFarm();
  //           this.AddNewFarm = false;
  //           this.getFarmsDetails(this.userId);
  //           this.showNotification('Data Saved Successfull', 2);
  //         }
  //       }
  //     });
  //   }
  //   else {
  //     this.showNotification(msg, 3);
  //   }
  // }

  Cancel(){
    this.initialize();
    this.AddNewProfile = false; 
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

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(environment.apiURL+'upload?_context=UserProfile', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.uploadFinished(event.body);
        }
      });
  }

  public uploadFinished = (event) => {
    this.imageResponse = event;
    this.userModels.user_Image = this.imageResponse.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }
  
}
