import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class skrininglaporanService {
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
  
  getCluster(Objek: Object) {
    return this.http.post<Object>(satusehatUrl + 'cluster/search', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  } 
  
  getSkrining(Objek: Object) {
    return this.http.post<Object>(satusehatUrl + 'screening/search', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  } 

  getScreeningPatientReport(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningReport/screeningPatientReport', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  getVillage(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningReport/getPatientByVillage', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  getPatientByVillage(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningReport/getPatientByVillage', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  getPatientByScreening(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(satusehatUrl + 'screeningReport/getPatientByScreening', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }
  
}