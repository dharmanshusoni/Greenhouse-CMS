import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { StickeyCardService } from './stickey-card.service';
declare var $: any;

@Component({
  selector: 'app-StickeyCard',
  templateUrl: './stickey-card.component.html',
  styleUrls: ['./stickey-card.component.css']
})
export class StickeyCardComponent implements OnInit {

  stickeyCardServiceObj: StickeyCardService;
  showAddUpdate=false;
  stickeyCardModels: any;
  stickeyCardList: any;
  userId: any;
  presetColors='red';
  public progress: number;
  public message: string;
  public imageResponse: {dbPath: ''};
  
  constructor(stickeyCardServiceObj: StickeyCardService, private router: Router,private http: HttpClient) {
    this.stickeyCardModels = {};
    this.stickeyCardServiceObj = stickeyCardServiceObj;
  }

  initialize() {
    this.stickeyCardModels = {};
    this.stickeyCardModels.id = 0;
    this.stickeyCardModels.stickeyCard_Id = 0;
    this.stickeyCardModels.stickey_Card_color = '';
    this.stickeyCardModels.stickey_Card_Image = '';
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
      this.getStickeyCards();
    }

  }

  getStickeyCards() {
    this.stickeyCardServiceObj.GetStickeyCards().subscribe((res) => {
      if (res.count == 0) {
        this.stickeyCardList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.stickeyCardList = res.data;
      }
    });
  }

  getStickeyCardDetails(StickeyCardId) {
    this.stickeyCardServiceObj.getStickeyCardDetail(StickeyCardId).subscribe((res) => {
      if (res.count == 0) {
        this.stickeyCardList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.stickeyCardModels = res.data[0];
          this.showAddUpdate = true;
      }
    });
  }

  Update(){
    var msg = '';
    if(this.stickeyCardModels.stickey_Card_color == '' || this.stickeyCardModels.stickey_Card_color == undefined || this.stickeyCardModels.stickey_Card_color == 'undefined'){
      msg = msg+'Enter Color<br>';
    }
    if(this.stickeyCardModels.stickey_Card_Image == '' || this.stickeyCardModels.stickey_Card_Image == undefined || this.stickeyCardModels.stickey_Card_Image == 'undefined'){
      //msg =  msg+'Select Image<br>';
      this.stickeyCardModels.stickey_Card_Image = "Resources/default.png";
    }
    if(this.stickeyCardModels.stickeyCard_Id == 0 || this.stickeyCardModels.stickeyCard_Id == undefined || this.stickeyCardModels.stickeyCard_Id == 'undefined'){
      msg =  msg+'Invalid Pest<br>';
    }
    if(msg == '')
    {
      this.stickeyCardServiceObj.UpdateStickeyCard(this.stickeyCardModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].stickeyCard_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getStickeyCards();
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
    if(this.stickeyCardModels.stickey_Card_color == '' || this.stickeyCardModels.stickey_Card_color == undefined || this.stickeyCardModels.stickey_Card_color == 'undefined'){
      msg = msg+'Enter Color<br>';
    }
    if(this.stickeyCardModels.stickey_Card_Image == '' || this.stickeyCardModels.stickey_Card_Image == undefined || this.stickeyCardModels.stickey_Card_Image == 'undefined'){
      //msg =  msg+'Select Image<br>';
      this.stickeyCardModels.stickey_Card_Image = "Resources/default.png";
    }
    if(msg == '')
    {
      this.stickeyCardServiceObj.SaveStickeyCard(this.stickeyCardModels).subscribe((res) => {
        console.log(res);
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].stickeyCard_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getStickeyCards();
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
    this.http.post(environment.apiURL+'upload?_context=StickeyCard', formData, {reportProgress: true, observe: 'events'})
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
    this.stickeyCardModels.stickey_Card_Image = this.imageResponse.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }
}
