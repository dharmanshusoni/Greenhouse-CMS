import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmLayoutService } from './farm-layout.service';
declare var $: any;

@Component({
  selector: 'app-farm-layout',
  templateUrl: './farm-layout.component.html',
  styleUrls: ['./farm-layout.component.css']
})
export class FarmLayoutComponent implements OnInit {
  
  farmLayoutServiceObj: FarmLayoutService;
  showAddUpdate=false;
  layoutModels: any;
  pestList: any;
  userId: any;
  farmId: any;

  constructor(farmLayoutServiceObj: FarmLayoutService, private router: Router) {
    this.layoutModels = {};
    this.farmLayoutServiceObj = farmLayoutServiceObj;
  }

  initialize() {
    this.layoutModels = {};
    this.layoutModels.id = 0;
    this.layoutModels.Farm_Layout_Id = 0;
    this.layoutModels.House = '';
    this.layoutModels.Zone = '';
    this.layoutModels.Phases = '';
    this.layoutModels.Rows = '';
    this.layoutModels.Posts = '';
    this.layoutModels.Farm_Id = 0
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
