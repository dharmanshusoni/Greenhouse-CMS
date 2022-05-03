import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_USER_GET = 'User?farmerId=&userId=';
const api_BASE_USERTYPE_GET = 'GetUserType?userTypeId=';
const api_BASE_USER = 'User/';
const api_SAVE_USER = 'SaveUser/';
const api_UPDATE_USER = 'UpdateUser/';
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUserDetail(farmerId,userId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    console.log('get link');
    console.log(api_URL + 'User?farmerId='+ farmerId + '&userId=' + userId);
    return this.http.get(api_URL + 'User?farmerId='+ farmerId + '&userId=' + userId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getUserType(userTypeId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_USER + api_BASE_USERTYPE_GET + userTypeId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveUser(user: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(user);
    return this.http.post(api_URL + api_BASE_USER + api_SAVE_USER , body, { 'headers': headers });
  }

  UpdateUser(user: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(user);
    return this.http.post(api_URL + api_BASE_USER + api_UPDATE_USER , body, { 'headers': headers });
  }
  
}