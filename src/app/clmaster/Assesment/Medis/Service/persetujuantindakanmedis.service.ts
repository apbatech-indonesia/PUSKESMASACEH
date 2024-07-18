import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalComponent } from '../../../Globals/global.component';
@Injectable({
  providedIn: 'root'
})

export class PersetujuanTindakanMedisService {
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

  simpan(params: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/form-persetujuan-tindakan-medis/create', params,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', params))
      );
  }

  update(params: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/form-persetujuan-tindakan-medis/update', params,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', params))
      );
  }

  getByNoTransaksiNoRM(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/form-persetujuan-tindakan-medis/show/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }

  getByNoRM(no_rm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/form-persetujuan-tindakan-medis/show/' + 'norm' + '/' + no_rm, { headers: this.httpOptions['headers'] } );
  }

  uploadSignaturePad(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/image-tubuh/createImage', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  getAllDokter(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/getAllDokter', { headers: this.httpOptions['headers'] } );
  }

  getDokterByParams(params: any){
    return this.http.get<any>(this.baseUrl + '/api/getDokter/' + params , { headers: this.httpOptions['headers'] } );
  }
  
  dokterList(): Observable<any> {
    return this.http.get(this.baseUrl+'/api/getAllDokter')
    .pipe(
      catchError(this.handleError('Error Ketika Mendapatkan Data', 'Objeka11'))
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
