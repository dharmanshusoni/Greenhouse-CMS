import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(pestServiceObj: PestService, private router: Router) {
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

}
