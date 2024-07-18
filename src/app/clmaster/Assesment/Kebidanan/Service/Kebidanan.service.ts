import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalComponent } from '../../../Globals/global.component';

@Injectable({
  providedIn: 'root'
})

export class KebidananService {
  // private baseUrl = 'https://emrefamedika.clenicapp.com/backend/public';
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

  simpanKebidanan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/assesmentKebidanan/create', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  updateKebidanan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/assesmentKebidanan/update', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  getKebidananAssesmentByNoTransaksiNoRM(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/assesmentKebidanan/getAllDataByNoRmNoTransaksi/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }
  
  getKebidananByNoRM(norm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/assesmentKebidanan/getAllDataByNoRm/' + norm , { headers: this.httpOptions['headers'] } );
  }
  


  
  simpanRiwayatPengobatan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/assesmentKebidanan/create/riwayat-pengobatan', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  hapusRiwayatPengobatan(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/assesmentKebidanan/hapus-riwayat-pengobatan-dirumah/' + id , { headers: this.httpOptions['headers'] } );
  }
  
  simpanRiwayatKehamilan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/assesmentKebidanan/create/riwayat-kehamilan', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  hapusRiwayatKehamilan(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/assesmentKebidanan/hapus-riwayat-kehamilan/' + id , { headers: this.httpOptions['headers'] } );
  }
  









  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
