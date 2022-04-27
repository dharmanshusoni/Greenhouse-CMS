import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_DECEASE_GET = 'GetDeceaseDetail?DeceaseId=';
const api_BASE_DECEASE = 'Decease/';
const api_SAVE_DECEASE = 'SaveDecease/';
const api_UPDATE_DECEASE = 'UpdateDecease/';
@Injectable({
  providedIn: 'root'
})

export class DeceaseService {

  constructor(private http: HttpClient) {
  }

  GetDeceases(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_DECEASE , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getDeceaseDetail(DeceaseId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_DECEASE + api_BASE_DECEASE_GET + DeceaseId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveDecease(decease: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(decease);
    return this.http.post(api_URL + api_BASE_DECEASE + api_SAVE_DECEASE, body, { 'headers': headers });
  }

  UpdateDecease(decease: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(decease);
    return this.http.post(api_URL + api_BASE_DECEASE + api_UPDATE_DECEASE, body, { 'headers': headers });
  }

}