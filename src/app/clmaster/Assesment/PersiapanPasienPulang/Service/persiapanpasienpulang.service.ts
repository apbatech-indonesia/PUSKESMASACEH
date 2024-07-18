import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/EMR/Globals/global.component';
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class PersiapanPasienPulangService {
  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = GlobalComponent.url;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer 4pb4tech',
      'HeaderUsername': localStorage.getItem('username')  || '{}',
      'HeaderID': localStorage.getItem('userID')  || '{}',
      'UserToken': localStorage.getItem('token')  || '{}'
    })
  };
  
  constructor(private http: HttpClient) { }
  simpan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/persiapan-pasien-pulang/create', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  update(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/persiapan-pasien-pulang/update', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  // update(Objek: Object): Observable<Object>  {
  //   return this.http.post<Object>(this.baseUrl + '/api/asesmen/update-status-reber', Objek,  { headers: this.httpOptions['headers'] } )
  //     .pipe(
  //       catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
  //     );
  // }

  getByNoTransaksiNoRM(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/persiapan-pasien-pulang/show/' + id, { headers: this.httpOptions['headers'] } );
  }
  
  getByNoRM(norm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/persiapan-pasien-pulang/list/' + norm , { headers: this.httpOptions['headers'] } );
  }
  
  // delete(id: any): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + '/api/asesmen/delete/' + id , { headers: this.httpOptions['headers'] } );
  // }
  
  getDataByID(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen-nyeri/id/' + id , { headers: this.httpOptions['headers'] } );
  }
  
  deleteDataByID(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen-nyeri/delete/' + id , { headers: this.httpOptions['headers'] } );
  }

  simpanTemplate(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/persiapan-pasien-pulang/create-template', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  updateTemplate(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/persiapan-pasien-pulang/update-template', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  getTemplateAnjuran(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/persiapan-pasien-pulang/template/anjuran-pasien', { headers: this.httpOptions['headers'] } );
  }
  
  getTemplateRespon(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/persiapan-pasien-pulang/template/respon-keluarga', { headers: this.httpOptions['headers'] } );
  }
  
  getTemplateHasil(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/persiapan-pasien-pulang/template/hasil-dibawa-pulang', { headers: this.httpOptions['headers'] } );
  }
  
  getDataPasien(no_rm:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/getPasienByNoRm/' + no_rm, { headers: this.httpOptions['headers'] } );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
