import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_STICKEYCARD_GET = 'GetStickeyCardDetail?stickeyCardId=';
const api_BASE_STICKEYCARD = 'StickeyCard/';
const api_SAVE_STICKEYCARD = 'SaveStickeyCard/';
const api_UPDATE_STICKEYCARD = 'UpdateStickeyCard/';
@Injectable({
  providedIn: 'root'
})

export class StickeyCardService {

  constructor(private http: HttpClient) {
  }

  GetStickeyCards(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_STICKEYCARD , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getStickeyCardDetail(StickeyCardId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_STICKEYCARD + api_BASE_STICKEYCARD_GET + StickeyCardId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveStickeyCard(stickeyCard: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(stickeyCard);
    return this.http.post(api_URL + api_BASE_STICKEYCARD + api_SAVE_STICKEYCARD, body, { 'headers': headers });
  }

  UpdateStickeyCard(stickeyCard: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(stickeyCard);
    return this.http.post(api_URL + api_BASE_STICKEYCARD + api_UPDATE_STICKEYCARD, body, { 'headers': headers });
  }

}