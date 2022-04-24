import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_CROP_GET = 'GetCropDetail?CropId=';
const api_BASE_CROP = 'crop/';
const api_SAVE_CROP = 'SaveCrop/';
const api_UPDATE_CROP = 'UpdateCrop/';
@Injectable({
  providedIn: 'root'
})

export class CropsService {

  constructor(private http: HttpClient) {
  }

  GetCrops(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_CROP , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getCropDetail(CropId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_CROP + api_BASE_CROP_GET + CropId, { 'headers': headers }).pipe(map(data => {
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
    return this.http.post(api_URL + api_BASE_CROP + api_SAVE_CROP, body, { 'headers': headers });
  }

  UpdatCrop(crop: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(crop);
    return this.http.post(api_URL + api_BASE_CROP + api_UPDATE_CROP, body, { 'headers': headers });
  }

}