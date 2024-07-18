import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalComponent } from '../../../Globals/global.component';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class PartografService {
  // private baseUrl = 'http://127.0.0.1:8000';
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
  simpan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/create-partograf', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  updatePartograf(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/update-partograf', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  simpanCatatanPersalinan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/create-catatan-persalinan', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  simpanJamPartograf(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/create-jam-partograf', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  simpanMakanMinum(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/create-makan-minum-terakhir', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  updateMakanMinum(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/update-makan-minum-terakhir', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  updateGrafikPartograf(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/partograf/create-grafik-partograf', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }
  
  deleteTabelKala4(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/partograf/tabel-kala-4/delete/' + id , { headers: this.httpOptions['headers'] } );
  }

  getByNoRmNoTr(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/partograf/show/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }
  
  getTimeNoRmNoTr(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/partograf/show-time/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }
  
  getPasienNoRm(no_rm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/getPasienByNoRm/' + no_rm, { headers: this.httpOptions['headers'] } );
  }
  
//   showSkalaJatuhId(id: any): Observable<any> {
//     return this.http.get<any>(this.baseUrl + '/api/skala-jatuh-lansia/show-skala-jatuh/' + id, { headers: this.httpOptions['headers'] } );
//   }

//   deleteIntervensi(id: any): Observable<any> {
//     return this.http.get<any>(this.baseUrl + '/api/skala-jatuh-lansia/delete-intervensi/' + id , { headers: this.httpOptions['headers'] } );
//   }

// Batas-------------------------------------------------------------

//   update(Objek: Object): Observable<Object>  {
//     return this.http.post<Object>(this.baseUrl + '/api/update-asesmen-nyeri', Objek,  { headers: this.httpOptions['headers'] } )
//       .pipe(
//         catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
//       );
//   }

  // update(Objek: Object): Observable<Object>  {
  //   return this.http.post<Object>(this.baseUrl + '/api/asesmen/update-status-reber', Objek,  { headers: this.httpOptions['headers'] } )
  //     .pipe(
  //       catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
  //     );
  // }
  
//   getAsesmenNyeriByNoRMNoTr(no_rm: any, no_transaksi: any): Observable<any> {
//     return this.http.get<any>(this.baseUrl + '/api/asesmen-nyeri/getByNoRmNoTransaksi/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
//   }
  
//   getByNoRM(norm: any): Observable<any> {
//     return this.http.get<any>(this.baseUrl + '/api/asesmen-nyeri/getByNoRm/' + norm , { headers: this.httpOptions['headers'] } );
//   }
  
//   getDataByID(id: any): Observable<any> {
//     return this.http.get<any>(this.baseUrl + '/api/asesmen-nyeri/id/' + id , { headers: this.httpOptions['headers'] } );
//   }
  
//   deleteDataByID(id: any): Observable<any> {
//     return this.http.get<any>(this.baseUrl + '/api/asesmen-nyeri/delete/' + id , { headers: this.httpOptions['headers'] } );
//   }
  
  // getDokter(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + '/api/asesmen/getDokter', { headers: this.httpOptions['headers'] } );
  // }
  
  // getUser(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + '/api/asesmen/getUser', { headers: this.httpOptions['headers'] } );
  // }
  
  // getDataPasien(params: any): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + '/api/getPasienByKdAsuransi/' + params , { headers: this.httpOptions['headers'] } );
  // }
  
  // uploadSignaturePad(Objek: Object): Observable<Object>  {
  //   return this.http.post<Object>(this.baseUrl + '/api/image-tubuh/createImage', Objek,  { headers: this.httpOptions['headers'] } )
  //     .pipe(
  //       catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
  //     );
  // }

  // getAllDokter(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + '/api/getAllDokter', { headers: this.httpOptions['headers'] } );
  // }

  // getDokterByParams(params: any){
  //   return this.http.get<any>(this.baseUrl + '/api/getDokter/' + params , { headers: this.httpOptions['headers'] } );
  // }
  
  // updateStatusRaber(id: any){
  //   return this.http.get<any>(this.baseUrl + '/api/asesmen/update-status-raber/' + id , { headers: this.httpOptions['headers'] } );
  // }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
