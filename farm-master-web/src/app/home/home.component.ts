import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'app/components/sidebar/module.service';
import { SidebarComponent } from 'app/components/sidebar/sidebar.component';
import { HomeService } from './home.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() {
    
  }

  initialize() {
    
  }

  ngOnInit() {
    this.initialize();
  }

}
