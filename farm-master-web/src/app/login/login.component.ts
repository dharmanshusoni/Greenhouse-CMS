import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'app/components/sidebar/module.service';
import { SidebarComponent } from 'app/components/sidebar/sidebar.component';
import { LoginService } from './login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginServiceObj: LoginService;
  moduleServiceObj: ModuleService;
  userModel: any;
  userId:any;

  constructor(loginServiceObj: LoginService,moduleServiceObj: ModuleService,private router: Router) {
    this.userModel = {};
    this.loginServiceObj = loginServiceObj;
    this.moduleServiceObj = moduleServiceObj;
  }

  initialize() {
    this.userModel = {};
    this.userModel.id = 0;
    this.userModel.Username = '';
    this.userModel.Password = '';
  }

  ngOnInit() {
    this.initialize();
  }

  signin() {
    this.loginServiceObj.Login(this.userModel).subscribe((res) => {
      console.log(res);
      if (res.count == 0) {
        this.showNotification(res.message, 4);
      }
      else if (res.count > 0) {
        if (res.data[0].id > 0) {
          this.showNotification('Logged In Successfull', 2);
          this.userId = res.data[0].id;
          sessionStorage.setItem('userId', this.userId); 
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }

  showNotification(Message, type) {
    const types = ['', 'info', 'success', 'warning', 'danger'];
    $.notify({
      icon: "notifications",
      message: Message

    }, {
      type: types[type],
      timer: 4000,
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
