import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class skriningService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })
  private httpOptions = {
    headers: new HttpHeaders({
      'kd-cabang': this.userData.kdcabang
    })
  };

  constructor(public http: HttpClient) { }
  
  getGroup(data) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'cluster/getGroup', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  } 
  
  register(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningPatient/register', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  saveScreening(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningPatient/submitData', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  getScreeningDataByNoTr(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningPatient/getData', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  getDataHistory(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningPatient/getDataHistory', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  getSkrinigById(data:any) {
    let urlMock = 'https://9e089e6b77014ff0896a007c23de1b2e.api.mockbin.io/'
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'screening/getDetail', data, { headers: this.headers }).subscribe((data) => {
      // this.http.post(urlMock, data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }
  
}