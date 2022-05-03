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

export class LoginService {

  constructor(private http: HttpClient) {
  }

  Login(user: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(user);
    return this.http.post(api_URL + api_BASE_USER , body, { 'headers': headers });
  }

  // getAllPaymentLink(): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Access-Control-Allow-Credentials': 'true'
  //   }

  //   return this.http.get(apiURL + api_BASE_USER, { 'headers': headers }).pipe(map(data => {
  //     if (data === null) return throwError("null data");
  //     return data;
  //   }));
  // }

  // getReportTypes(): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Access-Control-Allow-Credentials': 'true'
  //   }

  //   return this.http.get(api_URL + api_BASE_USER + 'GetTodaysTotalReport', { 'headers': headers }).pipe(map(data => {
  //     if (data === null) return throwError("null data");
  //     return data;
  //   }));
  // }

  // getReportByType(type:any): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Access-Control-Allow-Credentials': 'true'
  //   }

  //   return this.http.get(apiURL + api_BASE_REPORT + type, { 'headers': headers }).pipe(map(data => {
  //     if (data === null) return throwError("null data");
  //     return data;
  //   }));
  // }

  // getPaymentLinkById(id: string): Observable<any> {
  //   const headers = {
  //     'content-type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Access-Control-Allow-Credentials': 'true'
  //   }
  //   return this.http.get(apiURL + api_BASE_LINK + id, { 'headers': headers });
  // }


}