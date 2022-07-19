import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BenificialsService } from 'app/benificials/Benificials.service';
import { CropsService } from 'app/crops/crops.service';
import { DeceaseService } from 'app/Decease/decease.service';
import { FarmService } from 'app/farm/Farm.service';
import { PestService } from 'app/pest/Pest.service';
import { environment } from 'environments/environment';
import { FarmLayoutService } from './farm-layout.service';
import { Layout, Phase, House, Post } from './Phase';
declare var $: any;

@Component({
  selector: 'app-farm-layout',
  templateUrl: './farm-layout.component.html',
  styleUrls: ['./farm-layout.component.css']
})
export class FarmLayoutComponent implements OnInit {


  /* #region  Variables */
  farmLayoutServiceObj: FarmLayoutService;
  pestServiceObj: PestService;
  cropServiceObj: CropsService;
  farmServiceObj: FarmService;
  benificialsServiceObj: BenificialsService;
  deceaseServiceObj: DeceaseService;
  showAddUpdate = false;
  showHouseCrop = false;
  phaseModels: Phase;
  houseModels: House;
  layoutModels: Layout;
  phaseList: any;
  farmList: any;
  houseList: any;
  layoutList: any;
  userId: any;
  farmId = 0;
  phaseId = 0;
  popup = false
  name = 'Farm';
  cropList: any;
  pestList: any;
  benificialList: any;
  pest_Id: number;
  crop_Id: number;
  benificials_ID: number;
  decease_Id: number;
  deceaseList: any;
  CurrentDate: any;
  CurrentWeek: any;
  startDate:any;
  selectedRow = {
    phase: 0,
    house: 0,
    row: 0,
    posts: 0,
  }
  selectedRowIDs = {
    phase: 0,
    house: 0,
    row: 0,
    posts: 0,
  }

  IntensityColor='#f5f3c4';
  ivalue=0;
  comment='';
  public progress: number;
  public message: string;
  public imageResponse: {dbPath: ''};
  public post_Image:string;
  /* #endregion */

  /* #region  OnInit */
  constructor(private http: HttpClient,farmLayoutServiceObj: FarmLayoutService, farmServiceObj: FarmService,deceaseServiceObj: DeceaseService, cropServiceObj: CropsService, pestServiceObj: PestService, benificialsServiceObj: BenificialsService, private router: Router) {
    this.farmLayoutServiceObj = farmLayoutServiceObj;
    this.farmServiceObj = farmServiceObj;
    this.pestServiceObj = pestServiceObj;
    this.cropServiceObj = cropServiceObj;
    this.benificialsServiceObj = benificialsServiceObj;
    this.deceaseServiceObj = deceaseServiceObj;
    this.farmList = [];
    this.phaseList = [];
    this.layoutList = [];
  }

  initialize() {
    this.layoutModels = new Layout();
    this.layoutModels.farm_Layout_Id = 0;

    this.phaseModels = new Phase();
    this.phaseModels.phase_Id = 0;

    this.houseModels = new House();

    this.getFarmsByFarmerId(this.userId);
    this.getPest();
    this.getCrops();
    //this.getBenificials();
    this.DateSettings();
    this.getDeceases();
   
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
    }

  }
  /* #endregion */

  /* #region  Layout */
  getLayout(LayoutId, farmId) {
    this.farmLayoutServiceObj.GetFarmLayout(LayoutId, farmId).subscribe((res) => {
      if (res.count == 0) {
        this.layoutList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.layoutList = res.data;        
        this.getLayoutData(farmId);
      }
    });
  }

  getLayoutData(LayoutId) {
    this.farmLayoutServiceObj.GetFarmLayoutData(LayoutId).subscribe((res) => {
      if (res.count == 0) {
        this.phaseList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.phaseList = res.data;
        console.log(res.data)
      }
    });
  }

  getLayoutById(LayoutId, farmId) {
    this.farmLayoutServiceObj.GetFarmLayout(LayoutId, farmId).subscribe((res) => {
      if (res.count == 0) {
        this.layoutList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.layoutList = res.data;
        this.layoutModels = this.layoutList[0];
        this.showAddUpdate = true;
      }
    });
  }

  SaveLayout() {
    this.layoutModels.farm_Id = this.farmId;
    this.layoutModels.zone = this.layoutModels.phases;
    var msg = '';
    if (this.layoutModels.farm_Id == 0 || this.layoutModels.farm_Id == undefined) {
      msg = msg + 'Select Farm<br>';
    }
    if (this.layoutModels.zone == 0 || this.layoutModels.zone == undefined) {
      msg = msg + 'Select Zone<br>';
    }
    if (this.layoutModels.phases == 0 || this.layoutModels.phases == undefined) {
      msg = msg + 'Select Phase<br>';
    }
    if (this.layoutModels.rows == 0 || this.layoutModels.rows == undefined) {
      msg = msg + 'Select Rows<br>';
    }
    if (this.layoutModels.house == 0 || this.layoutModels.house == undefined) {
      msg = msg + 'Select House<br>';
    }
    if (this.layoutModels.posts == 0 || this.layoutModels.posts == undefined) {
      msg = msg + 'Select Posts<br>';
    }
    if (msg == '') {
      this.farmLayoutServiceObj.SaveFarmLayout(this.layoutModels).subscribe((res) => {
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].farm_Layout_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getLayout(0, this.farmId);
            this.showNotification('Data Saved Successfull', 2);
          }
        }
      });
    }
    else {
      this.showNotification(msg, 3);
    }
  }

  UpdateLayout() {
    this.layoutModels.farm_Id = this.farmId;
    this.layoutModels.zone = this.layoutModels.phases;
    var msg = '';
    if (this.layoutModels.farm_Layout_Id == 0 || this.layoutModels.farm_Layout_Id == undefined) {
      msg = msg + 'Select Layout<br>';
    }
    if (this.layoutModels.farm_Id == 0 || this.layoutModels.farm_Id == undefined) {
      msg = msg + 'Select Farm<br>';
    }
    if (this.layoutModels.zone == 0 || this.layoutModels.zone == undefined) {
      msg = msg + 'Select Zone<br>';
    }
    if (this.layoutModels.phases == 0 || this.layoutModels.phases == undefined) {
      msg = msg + 'Select Phase<br>';
    }
    if (this.layoutModels.rows == 0 || this.layoutModels.rows == undefined) {
      msg = msg + 'Select Rows<br>';
    }
    if (this.layoutModels.house == 0 || this.layoutModels.house == undefined) {
      msg = msg + 'Select House<br>';
    }
    if (this.layoutModels.posts == 0 || this.layoutModels.posts == undefined) {
      msg = msg + 'Select Posts<br>';
    }
    if (msg == '') {
      this.farmLayoutServiceObj.UpdateFarmLayout(this.layoutModels).subscribe((res) => {
        if (res.count == 0) {
          this.showNotification(res.message, 4);
        }
        else if (res.count > 0) {
          if (res.data[0].farm_Layout_Id > 0) {
            this.showAddUpdate = false;
            this.initialize();
            this.getLayout(0, this.farmId);
            this.showNotification('Data Updated Successfull', 2);
          }
        }
      });
    }
    else {
      this.showNotification(msg, 3);
    }
  }
  /* #endregion */

  /* #region  Phase and House */
  getPhase(farmId) {
    // this.farmLayoutServiceObj.GetPhase(farmId).subscribe((res) => {
    //   if (res.count == 0) {
    //     this.phaseList = [];
    //     this.showNotification(res.message, 4);
    //   }
    //   else if (res.count > 0) {
    //     this.phaseList = res.data;
    //   }
    // });
  }

  getHouse(phaseId) {
    // this.farmLayoutServiceObj.GetHouse(phaseId).subscribe((res) => {
    //   if (res.count == 0) {
    //     this.houseList = [];
    //     this.showNotification(res.message, 4);
    //   }
    //   else if (res.count > 0) {
    //     this.houseList = res.data;
    //   }
    // });
  }

  /* #endregion */

  /* #region  Drop Down */
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

  getBenificials(pest_Id) {
    console.log("getting data for pest "+pest_Id);
    this.benificialsServiceObj.getBenificialDetailByPestId(pest_Id).subscribe((res) => {
      if (res.count == 0) {
        this.benificialList = [];
      }
      else if (res.count > 0) {
        this.benificialList = res.data;
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
  /* #endregion */

  /* #region  Detail */
  getFarmsByFarmerId(userId) {
    this.farmServiceObj.GetFarmsForFarmer(userId).subscribe((res) => {
      if (res.count == 0) {
        this.farmList = [];
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        this.farmList = res.data;
      }
    });
  }
  /* #endregion */

  /* #region  General */
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

  counter(i: number) {
    return new Array(i);
  }

  openPost(postsId,postsNo,rowId,rowNo, houseId,houseNo, phaseId,phaseNo) {
    this.selectedRow = {
      phase: phaseNo,
      house: houseNo,
      row: rowNo,
      posts: postsNo
    }

    this.selectedRowIDs = {
      phase: phaseId,
      house: houseId,
      row: rowId,
      posts: postsId
    }
    console.log(this.selectedRowIDs);
    
    this.DateSettings();
    let pData = this.phaseList.find(i => i.phaseId === phaseId);
    if(pData!=null){
      let hData = pData.houseData.find(i => i.houseId === houseId);
      if(hData!=null){
        let rData = hData.rowData.find(i => i.rowId === rowId);
        if(rData!=null){
          let poData = rData.postData.find(i => i.postId === postsId);
          if(this.CurrentWeek == poData.week){
            this.CurrentWeek = poData.week;
            this.comment = poData.comment;
            this.decease_Id = Number(poData.benificialsId);
            this.ivalue = poData.intensity;
            this.pest_Id = poData.pestId;
            this.post_Image =  poData.pic;
          }
          else{
            this.comment = "";
            this.decease_Id = 0;
            this.ivalue = 0;
            this.pest_Id = 0;
            this.post_Image =  "";
          }
          this.getBenificials(this.pest_Id);
          this.popup = true;
        }
      }
    }
  }

  getPreviousWeekData(){
    this.CurrentWeek = this.CurrentWeek -1;
    let pData = this.phaseList.find(i => i.phaseId === this.selectedRowIDs.phase);
    if(pData!=null){
      let hData = pData.houseData.find(i => i.houseId === this.selectedRowIDs.house);
      if(hData!=null){
        let rData = hData.rowData.find(i => i.rowId === this.selectedRowIDs.row);
        if(rData!=null){
          try {
            console.log(rData.postData);
            let poData = rData.postData.find(i => i.week === this.CurrentWeek && i.postId === this.selectedRowIDs.posts);
            console.log(rData.postData);
            if(this.CurrentWeek == poData.week){
              this.CurrentWeek = poData.week;
              this.comment = poData.comment;
              this.decease_Id = Number(poData.benificialsId);
              this.ivalue = poData.intensity;
              this.pest_Id = poData.pestId;
              this.post_Image =  poData.pic;
            }
            else{
              //this.DateSettings();
              this.comment = "";
              this.decease_Id = 0;
              this.ivalue = 0;
              this.pest_Id = 0;
              this.post_Image = "";
            }
          }
          catch(err) {
            this.comment = "";
            this.decease_Id = 0;
            this.ivalue = 0;
            this.pest_Id = 0;
            this.post_Image = "";
          }
          
          this.getBenificials(this.pest_Id);
          this.popup = true;
        }

      }
    }
  }

  getNextWeekData(){
    this.CurrentWeek = this.CurrentWeek +1;
    let pData = this.phaseList.find(i => i.phaseId === this.selectedRowIDs.phase);
    if(pData!=null){
      let hData = pData.houseData.find(i => i.houseId === this.selectedRowIDs.house);
      if(hData!=null){
        let rData = hData.rowData.find(i => i.rowId === this.selectedRowIDs.row);
        if(rData!=null){
          try {
            console.log(rData.postData);
            let poData = rData.postData.find(i => i.week === this.CurrentWeek && i.postId === this.selectedRowIDs.posts);
            console.log(rData.postData);
            if(this.CurrentWeek == poData.week){
              this.CurrentWeek = poData.week;
              this.comment = poData.comment;
              this.decease_Id = Number(poData.benificialsId);
              this.ivalue = poData.intensity;
              this.pest_Id = poData.pestId;
              this.post_Image =  poData.pic;
            }
            else{
              //this.DateSettings();
              this.comment = "";
              this.decease_Id = 0;
              this.ivalue = 0;
              this.pest_Id = 0;
              this.post_Image = "";
            }
          }
          catch(err) {
            this.comment = "";
            this.decease_Id = 0;
            this.ivalue = 0;
            this.pest_Id = 0;
            this.post_Image = "";
          }
          
          this.getBenificials(this.pest_Id);
          this.popup = true;
        }

      }
    }
  }

  savePost() {
    let postData = new Post();
    postData.PostId = this.selectedRowIDs.posts;
    postData.Week = this.CurrentWeek;
    postData.PestId = this.pest_Id;
    postData.Intensity = this.ivalue; 
    postData.Comment = this.comment;
    postData.BenificialsId = this.decease_Id.toString();
    postData.RowId = this.selectedRowIDs.row;
    postData.DeceaseId = this.decease_Id;
    postData.Pic = this.post_Image;
    console.log(postData);
    this.farmLayoutServiceObj.UpdatePostData(postData).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.showAddUpdate = false;
          this.initialize();
          this.getLayout(0, this.farmId);
          this.showNotification('Data Updated Successfull', 2);
      }
    });
  }
  
  DateSettings(){
    this.CurrentDate = new Date();
    this.startDate = new Date(this.CurrentDate.getFullYear(), 0, 1);
    var days = Math.floor((this.CurrentDate - this.startDate) / (24 * 60 * 60 * 1000));
    this.CurrentWeek = Math.ceil( (this.CurrentDate.getDay() + 1 + days) / 7);
  }

  public saveHouseCrop = (CropId,houseID) => {
    this.houseModels.HouseId = houseID;
    this.houseModels.CropId = CropId;
    this.farmLayoutServiceObj.UpdateFarmLayoutCrop(this.houseModels).subscribe((res) => {
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
          this.showAddUpdate = false;
          this.initialize();
          this.getLayout(0, this.farmId);
          this.showNotification('Data Updated Successfull', 2);
      }
    });
  }

  OnIntensityChange(value){
    if(value >= 0 && value <= 33)
    {
      this.IntensityColor = "#f5f3c4";
    }
    if(value >= 34 && value <= 66)
    {
      this.IntensityColor = "#f5ddc4";
    }
    if(value >= 67)
    {
      this.IntensityColor = "#f5c4c4";
    }
  }

  CreateFarmLayout(){
    this.layoutList
  }

  public getCropImage(CropId){
    let findedData = this.cropList.find(i => i.crop_Id === CropId);
    if (typeof findedData === 'undefined') {
       return environment.apiBASE+`Resources/default.png`;
    }
    if(findedData.crop_Image == "" || findedData.crop_Image == 'undefined' || findedData.crop_Image == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${findedData.crop_Image}`;
  }

  public getCropName(CropId){
    let findedData = this.cropList.find(i => i.crop_Id === CropId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.crop_Name;
  }

  public getPestImage(PestId){
    let findedData = this.pestList.find(i => i.pest_Id === PestId);
    if (typeof findedData === 'undefined') {
       return environment.apiBASE+`Resources/default.png`;
    }
    if(findedData.pest_Image == "" || findedData.pest_Image == 'undefined' || findedData.pest_Image == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${findedData.pest_Image}`;
  }

  public getPestName(PestId){
    let findedData = this.pestList.find(i => i.pest_Id === PestId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.pest_Name;
  }

  public getDeceaseImage(DeceaseId){
    let findedData = this.deceaseList.find(i => i.decease_Id === DeceaseId);
    if (typeof findedData === 'undefined') {
       return environment.apiBASE+`Resources/default.png`;
    }
    if(findedData.decease_Image == "" || findedData.decease_Image == 'undefined' || findedData.decease_Image == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${findedData.decease_Image}`;
  }

  public getDeceaseName(DeceaseId){
    let findedData = this.deceaseList.find(i => i.decease_Id === DeceaseId);
    if (typeof findedData === 'undefined') {
       return null;
    }
    return findedData.decease_Name;
  }

  public createSimpleImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(environment.apiURL+'upload?_context=Post', formData, {reportProgress: true, observe: 'events'})
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
    this.post_Image = this.imageResponse.dbPath;
  }

  public createImgPath = (serverPath: string) => {
    if(serverPath == "" || serverPath == 'undefined' || serverPath == undefined){
      return environment.apiBASE+`Resources/default.png`;
    }
    return environment.apiBASE+`${serverPath}`;
  }
  /* #endregion */
}
