import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BenificialsService } from './Benificials.service';
declare var $: any;

@Component({
  selector: 'app-benificials',
  templateUrl: './benificials.component.html',
  styleUrls: ['./benificials.component.css']
})
export class BenificialsComponent implements OnInit {

  benificialsServiceObj: BenificialsService;
  showAddUpdate=false;
  benificialModels: any;
  benificialList: any;
  userId: any;
  farmId: any;
  public progress: number;
  public message: string;
  public imageResponse: {dbPath: ''};

  constructor(benificialsServiceObj: BenificialsService, private router: Router,private http: HttpClient) {
    this.benificialModels = {};
    this.benificialsServiceObj = benificialsServiceObj;
  }

  initialize() {
    this.benificialModels = {};
    this.benificialModels.benificials_ID = 0;
    this.benificialModels.benificial_Name = '';
    this.benificialModels.benificial_Description = '';
    this.benificialModels.benificial_Image = '';
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
      this.getBenificials();
    }

  }

  getBenificials() {
    this.benificialsServiceObj.GetBenificials().subscribe((res) => {
      if (res.count == 0) {
        this.benificialList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.benificialList = res.data;
      }
    });
  }

  getBenificialDetails(BenificialId) {
    this.benificialsServiceObj.getBenificialDetail(BenificialId).subscribe((res) => {
      if (res.count == 0) {
        this.benificialList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.benificialModels = res.data[0];
          this.showAddUpdate = true;
      }
    });
  }

  Update(){
    var msg = '';
    if(this.benificialModels.benificial_Name == '' || this.benificialModels.benificial_Name == undefined || this.benificialModels.benificial_Name == 'undefined'){
      msg = msg+'Enter Benificial Name<br>';
    }
    if(this.benificialModels.benificial_Description == '' || this.benificialModels.benificial_Description == undefined || this.benificialModels.benificial_Description == 'undefined'){
      msg =  msg+'Enter Details<br>';
    }
    if(this.benificialModels.benificial_Image == '' || this.benificialModels.benificial_Image == undefined || this.benificialModels.benificial_Image == 'undefined'){
      msg =  msg+'Select Image<br>';
    }
    if(this.benificialModels.benificials_ID == 0 || this.benificialModels.benificials_ID == undefined || this.benificialModels.benificials_ID == 'undefined'){
      msg =  msg+'Invalid Benificial<br>';
    }
    if(msg == '')
    {
      this.benificialsServiceObj.UpdateBenificial(this.benificialModels).subscribe((res) => {
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].benificials_ID > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getBenificials();
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
    if(this.benificialModels.benificial_Name == '' || this.benificialModels.benificial_Name == undefined || this.benificialModels.benificial_Name == 'undefined'){
      msg = msg+'Enter Benificial Name<br>';
    }
    if(this.benificialModels.benificial_Description == '' || this.benificialModels.benificial_Description == undefined || this.benificialModels.benificial_Description == 'undefined'){
      msg =  msg+'Enter Details<br>';
    }
    if(this.benificialModels.benificial_Image == '' || this.benificialModels.benificial_Image == undefined || this.benificialModels.benificial_Image == 'undefined'){
      msg =  msg+'Select Image<br>';
    }
    if(msg == '')
    {
      this.benificialsServiceObj.SaveBenificial(this.benificialModels).subscribe((res) => {
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].benificials_ID > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getBenificials();
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
    this.http.post(environment.apiURL+'upload?_context=Benificial', formData, {reportProgress: true, observe: 'events'})
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
    this.benificialModels.benificial_Image = this.imageResponse.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }
}
