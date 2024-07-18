import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/EMR/Globals/global.component';
@Injectable({
  providedIn: 'root'
})

export class BayiService {
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
    return this.http.post<Object>(this.baseUrl + '/api/asesmen/asesmenBayi/create', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  update(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/asesmen/asesmenBayi/update', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  getByNoTransaksiNoRM(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/asesmenBayi/getAllDataByNoRmNoTransaksi/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }
  
  getByNoRM(norm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/asesmenBayi/getDataByNoRm/' + norm , { headers: this.httpOptions['headers'] } );
  }
  


  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
