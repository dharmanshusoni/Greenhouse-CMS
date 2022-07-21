import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_USER = 'Farmer/';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) {
  }

}