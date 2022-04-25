import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_PLANTATION_GET = 'GetPlantationDetail?PlantationId=';
const api_BASE_PLANTATION = 'Plantation/';
const api_SAVE_PLANTATION = 'SavePlantation/';
const api_UPDATE_PLANTATION = 'UpdatePlantation/';
@Injectable({
  providedIn: 'root'
})

export class PlantationService {

  constructor(private http: HttpClient) {
  }

  GetPlantations(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_PLANTATION , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getPlantationDetail(PlantationId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_PLANTATION + api_BASE_PLANTATION_GET + PlantationId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SavePlantation(plantation: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(plantation);
    return this.http.post(api_URL + api_BASE_PLANTATION + api_SAVE_PLANTATION, body, { 'headers': headers });
  }

  UpdatePlantation(plantation: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(plantation);
    return this.http.post(api_URL + api_BASE_PLANTATION + api_UPDATE_PLANTATION, body, { 'headers': headers });
  }

}