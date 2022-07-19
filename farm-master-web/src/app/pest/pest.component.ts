import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { PestService } from './Pest.service';
declare var $: any;

@Component({
  selector: 'app-Pest',
  templateUrl: './Pest.component.html',
  styleUrls: ['./Pest.component.css']
})
export class PestComponent implements OnInit {

  pestServiceObj: PestService;
  showAddUpdate=false;
  pestModels: any;
  pestList: any;
  userId: any;
  farmId: any;
  public progress: number;
  public message: string;
  public imageResponse: {dbPath: ''};
  
  constructor(pestServiceObj: PestService, private router: Router,private http: HttpClient) {
    this.pestModels = {};
    this.pestServiceObj = pestServiceObj;
  }

  initialize() {
    this.pestModels = {};
    this.pestModels.id = 0;
    this.pestModels.pest_Id = 0;
    this.pestModels.pest_Name = '';
    this.pestModels.pest_Details = '';
    this.pestModels.no_Acerage = 0;
    this.pestModels.pest_Image = '';
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
      this.getPests();
    }

  }

  getPests() {
    this.pestServiceObj.GetPests().subscribe((res) => {
      if (res.count == 0) {
        this.pestList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.pestList = res.data;
      }
    });
  }

  getPestDetails(PestId) {
    this.pestServiceObj.getPestDetail(PestId).subscribe((res) => {
      if (res.count == 0) {
        this.pestList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.pestModels = res.data[0];
          this.showAddUpdate = true;
      }
    });
  }

  Update(){
    var msg = '';
    if(this.pestModels.pest_Name == '' || this.pestModels.pest_Name == undefined || this.pestModels.pest_Name == 'undefined'){
      msg = msg+'Enter Pest Name<br>';
    }
    if(this.pestModels.pest_Details == '' || this.pestModels.pest_Details == undefined || this.pestModels.pest_Details == 'undefined'){
      msg =  msg+'Enter Details<br>';
    }
    if(this.pestModels.no_Acerage == undefined || this.pestModels.no_Acerage == 'undefined'){
      msg =  msg+'Refresh and try again<br>';
    }
    if(this.pestModels.pest_Image == '' || this.pestModels.pest_Image == undefined || this.pestModels.pest_Image == 'undefined'){
      //msg =  msg+'Select Image<br>';
      this.pestModels.pest_Image = "Resources/default.png";
    }
    if(this.pestModels.pest_Id == 0 || this.pestModels.pest_Id == undefined || this.pestModels.pest_Id == 'undefined'){
      msg =  msg+'Invalid Pest<br>';
    }
    if(msg == '')
    {
      this.pestServiceObj.UpdatePest(this.pestModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].pest_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getPests();
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
    if(this.pestModels.pest_Name == '' || this.pestModels.pest_Name == undefined || this.pestModels.pest_Name == 'undefined'){
      msg = msg+'Enter Pest Name<br>';
    }
    if(this.pestModels.pest_Details == '' || this.pestModels.pest_Details == undefined || this.pestModels.pest_Details == 'undefined'){
      msg =  msg+'Enter Details<br>';
    }
    if(this.pestModels.no_Acerage == undefined || this.pestModels.no_Acerage == 'undefined'){
      msg =  msg+'Refresh and try again<br>';
    }
    if(this.pestModels.pest_Image == '' || this.pestModels.pest_Image == undefined || this.pestModels.pest_Image == 'undefined'){
      //msg =  msg+'Select Image<br>';
      this.pestModels.pest_Image = "Resources/default.png";
    }
    if(msg == '')
    {
      this.pestServiceObj.SavePest(this.pestModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].pest_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getPests();
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

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(environment.apiURL+'upload?_context=Pest', formData, {reportProgress: true, observe: 'events'})
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
    this.pestModels.pest_Image = this.imageResponse.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }
}
