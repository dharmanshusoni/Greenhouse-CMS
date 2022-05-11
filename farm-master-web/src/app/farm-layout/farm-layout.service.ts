import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_FARMLAYOUT = 'FarmLayout/';

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