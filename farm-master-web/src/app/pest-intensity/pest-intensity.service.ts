import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_PESTINTENSITY_GET = 'GetPestIntensityDetail?PestIntensityId=';
const api_BASE_PESTINTENSITY = 'PestIntensity/';
const api_SAVE_PESTINTENSITY = 'SavePestIntensity/';
const api_UPDATE_PESTINTENSITY = 'UpdatePestIntensity/';
@Injectable({
  providedIn: 'root'
})

export class PestIntensityService {

  constructor(private http: HttpClient) {
  }

  GetCrops(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_PESTINTENSITY , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getCropDetail(PestIntensityId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_PESTINTENSITY + api_BASE_PESTINTENSITY_GET + PestIntensityId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveCrop(crop: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(crop);
    return this.http.post(api_URL + api_BASE_PESTINTENSITY + api_SAVE_PESTINTENSITY, body, { 'headers': headers });
  }

  UpdatCrop(crop: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(crop);
    return this.http.post(api_URL + api_BASE_PESTINTENSITY + api_UPDATE_PESTINTENSITY, body, { 'headers': headers });
  }

}