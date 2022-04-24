import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_PEST_GET = 'GetPestDetail?PestId=';
const api_BASE_PEST = 'pest/';
const api_SAVE_PEST = 'SavePest/';
const api_UPDATE_PEST = 'UpdatePest/';
@Injectable({
  providedIn: 'root'
})

export class PestService {

  constructor(private http: HttpClient) {
  }

  GetPests(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_PEST , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getPestDetail(PestId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_PEST + api_BASE_PEST_GET + PestId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SavePest(pest: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(pest);
    return this.http.post(api_URL + api_BASE_PEST + api_SAVE_PEST, body, { 'headers': headers });
  }

  UpdatePest(pest: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(pest);
    return this.http.post(api_URL + api_BASE_PEST + api_UPDATE_PEST, body, { 'headers': headers });
  }

}