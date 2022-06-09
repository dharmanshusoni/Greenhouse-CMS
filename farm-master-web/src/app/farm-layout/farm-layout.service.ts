import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_FARMLAYOUT = 'FarmLayout/';

const api_BASE_LAYOUT_GET = 'GetLayout?FarmLayoutId=';
const api_BASE_LAYOUT_DATA_GET = 'GetLayoutData?FarmLayoutId=';
const api_SAVE_LAYOUT = 'SaveLayout/';
const api_UPDATE_LAYOUT = 'UpdateLayout/';
const api_UPDATE_LAYOUTCROP = 'UpdateCrop/';
const api_UPDATE_POST_DATA = 'UpdatePost/';

const api_BASE_PHASE_GET = 'GetPhase?FarmId=';
const api_SAVE_PHASE = 'SavePhase/';

const api_BASE_HOUSE_GET = 'GetHouse?PhaseId=';
const api_SAVE_HOUSE = 'SaveHouse/';

@Injectable({
  providedIn: 'root'
})

export class FarmLayoutService {

  constructor(private http: HttpClient) {
  }
  
  GetFarmLayout(farmLayoutId,farmId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_FARMLAYOUT + api_BASE_LAYOUT_GET + farmLayoutId+'&FarmId=' +farmId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  GetFarmLayoutData(farmLayoutId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_FARMLAYOUT + api_BASE_LAYOUT_DATA_GET + farmLayoutId , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveFarmLayout(layout: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(layout);
    return this.http.post(api_URL + api_BASE_FARMLAYOUT + api_SAVE_LAYOUT, body, { 'headers': headers });
  }

  UpdateFarmLayout(layout: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(layout);
    return this.http.post(api_URL + api_BASE_FARMLAYOUT + api_UPDATE_LAYOUT, body, { 'headers': headers });
  }

  UpdateFarmLayoutCrop(house: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(house);
    return this.http.post(api_URL + api_BASE_FARMLAYOUT + api_UPDATE_LAYOUTCROP, body, { 'headers': headers });
  }

  UpdatePostData(post: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(post);
    return this.http.post(api_URL + api_BASE_FARMLAYOUT + api_UPDATE_POST_DATA, body, { 'headers': headers });
  }

  GetPhase(farmId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_FARMLAYOUT + api_BASE_PHASE_GET + farmId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SavePhase(phase: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(phase);
    return this.http.post(api_URL + api_BASE_FARMLAYOUT + api_SAVE_PHASE, body, { 'headers': headers });
  }

  GetHouse(phaseId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_FARMLAYOUT + api_BASE_HOUSE_GET + phaseId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveHouse(house: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(house);
    return this.http.post(api_URL + api_BASE_FARMLAYOUT + api_SAVE_HOUSE, body, { 'headers': headers });
  }
}