import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CropsService } from 'app/crops/crops.service';
import { StickeyCardService } from 'app/stickey-card/stickey-card.service';
import { environment } from 'environments/environment';
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
  stickeyCardServiceObj: StickeyCardService;
  showAddUpdate=false;
  deceaseModels: any;
  deceaseList: any;
  cropsList:any;
  stickeyCardList:any;
  userId: any;
  public progress: number;
  public message: string;
  public imageResponse: {dbPath: ''};

  constructor(stickeyCardServiceObj: StickeyCardService,deceaseServiceObj: DeceaseService,cropServiceObj: CropsService, private router: Router,private http: HttpClient) {
    this.deceaseModels = {};
    this.deceaseServiceObj = deceaseServiceObj;
    this.cropServiceObj = cropServiceObj;
    this.stickeyCardServiceObj = stickeyCardServiceObj;
  }

  initialize() {
    this.deceaseModels = {};
    this.deceaseModels.id = 0;
    this.deceaseModels.decease_Id = 0;
    this.deceaseModels.decease_Name = '';
    this.deceaseModels.crop_Id = 0;
    this.deceaseModels.stickey_Card_Id = 0;
    this.deceaseModels.decease_Image = '';
    this.getCrops();
    this.getStickeyCards();
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
        if (res.data[0].crop_Id > 0) {
          this.cropsList = res.data;
        }
      }
    });
  }

  getStickeyCards(){
    this.stickeyCardServiceObj.GetStickeyCards().subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        if (res.data[0].stickeyCard_Id > 0) {
          this.stickeyCardList = res.data;
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
    if(this.deceaseModels.stickey_Card_Id == 0 || this.deceaseModels.stickey_Card_Id == undefined || this.deceaseModels.stickey_Card_Id == 'undefined'){
      msg =  msg+'Invalid Stickey Card<br>';
    }
    if(this.deceaseModels.decease_Image == '' || this.deceaseModels.decease_Image == undefined || this.deceaseModels.decease_Image == 'undefined'){
      msg = msg+'Enter Decease Image<br>';
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
    if(this.deceaseModels.stickey_Card_Id == 0 || this.deceaseModels.stickey_Card_Id == undefined || this.deceaseModels.stickey_Card_Id == 'undefined'){
      msg =  msg+'Invalid Stickey Card<br>';
    }
    if(this.deceaseModels.decease_Image == '' || this.deceaseModels.decease_Image == undefined || this.deceaseModels.decease_Image == 'undefined'){
      msg = msg+'Enter Decease Image<br>';
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
    let findedData = this.cropsList.find(i => i.crop_Id === CropId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.crop_Name;
  }

  getStickeyCardById(stickeyCard_Id){
    let findedData = this.stickeyCardList.find(i => i.stickeyCard_Id === stickeyCard_Id);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.stickey_Card_color;
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
    this.http.post(environment.apiURL+'upload?_context=Decease', formData, {reportProgress: true, observe: 'events'})
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
    this.deceaseModels.decease_Image = this.imageResponse.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }

}
