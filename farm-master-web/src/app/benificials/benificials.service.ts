import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

const api_URL = environment.apiURL;
const api_BASE_BENIFICIAL_GET = 'GetBenificialDetail?BenificialsId=';
const api_BASE_BENIFICIALBYPEST_GET = 'GetBenificialDetailByPestId?PestId=';
const api_BASE_BENIFICIAL = 'Benificial/';
const api_SAVE_BENIFICIAL = 'SaveBenificial/';
const api_UPDATE_BENIFICIAL = 'UpdateBenificial/';
@Injectable({
  providedIn: 'root'
})

export class BenificialsService {

  constructor(private http: HttpClient) {
  }

  GetBenificials(): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }

    return this.http.get(api_URL + api_BASE_BENIFICIAL , { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getBenificialDetail(BenificialId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_BENIFICIAL + api_BASE_BENIFICIAL_GET + BenificialId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  getBenificialDetailByPestId(PestId): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    return this.http.get(api_URL + api_BASE_BENIFICIAL + api_BASE_BENIFICIALBYPEST_GET + PestId, { 'headers': headers }).pipe(map(data => {
      if (data === null) return throwError("null data");
      return data;
    }));
  }

  SaveBenificial(benificial: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(benificial);
    return this.http.post(api_URL + api_BASE_BENIFICIAL + api_SAVE_BENIFICIAL, body, { 'headers': headers });
  }

  UpdateBenificial(benificial: any): Observable<any> {
    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Credentials': 'true'
    }
    const body = JSON.stringify(benificial);
    return this.http.post(api_URL + api_BASE_BENIFICIAL + api_UPDATE_BENIFICIAL, body, { 'headers': headers });
  }

}