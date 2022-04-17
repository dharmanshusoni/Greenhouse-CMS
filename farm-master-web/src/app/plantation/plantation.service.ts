import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_FARM_GET = 'farm?FarmerId=';
const api_BASE_FARM_GET_BY_ID = 'GetFarmsForFarm?FarmId=';
const api_BASE_FARM = 'farm/';
const api_SAVE_FARM = 'SaveFarm/';
const api_UPDATE_FARM = 'UpdateFarm/';
@Injectable({
  providedIn: 'root'
})

export class PlantationService {

  constructor(private http: HttpClient) {
  }

  GetFarmsForFarmer(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_FARM_GET , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getFarmDetail(FarmId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_FARM + api_BASE_FARM_GET_BY_ID + FarmId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveFarm(farm: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(farm);
    return this.http.post(api_URL + api_BASE_FARM + api_SAVE_FARM, body, { 'headers': headers });
  }

  UpdateFarm(farm: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(farm);
    return this.http.post(api_URL + api_BASE_FARM + api_UPDATE_FARM, body, { 'headers': headers });
  }

}