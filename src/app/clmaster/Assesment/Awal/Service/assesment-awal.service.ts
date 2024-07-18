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
export class AssesmentAwalService {
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
    return this.http.post<Object>(this.baseUrl + '/api/asesmen/create-asesmen-awal', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  update(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/asesmen/update-asesmen-awal', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  getByNoTransaksiNoRM(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/getDataByNoRmNoTransaksi/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }
  
  getByNoRM(norm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/getDataByNoRm/' + norm , { headers: this.httpOptions['headers'] } );
  }
  
  delete(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/delete/' + id , { headers: this.httpOptions['headers'] } );
  }
  
  getDataByID(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/getDataByID/' + id , { headers: this.httpOptions['headers'] } );
  }
  
  getDokter(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/getDokter', { headers: this.httpOptions['headers'] } );
  }
  
  getUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/getUser', { headers: this.httpOptions['headers'] } );
  }
  
  getDataPasien(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/getPasienByKdAsuransi/' + params , { headers: this.httpOptions['headers'] } );
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
  
  updateStatusRaber(id: any){
    return this.http.get<any>(this.baseUrl + '/api/asesmen/update-status-raber/' + id , { headers: this.httpOptions['headers'] } );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
