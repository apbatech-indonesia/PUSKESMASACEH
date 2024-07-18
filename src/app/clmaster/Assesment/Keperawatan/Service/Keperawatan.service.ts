import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/EMR/Globals/global.component';
@Injectable({
  providedIn: 'root'
})

export class KeperawatanService {
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

  simpanKeperawatan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/asesmen/assesmentKeperawatan/create', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  updateKeperawatan(Objek: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/asesmen/assesmentKeperawatan/update', Objek,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', Objek))
      );
  }

  getKeperawatanByNoTransaksiNoRM(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/assesmentKeperawatan/getAllDataByNoRmNoTransaksi/' + no_rm + '/' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }

  getKeperawatanByNoRM(norm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/asesmen/assesmentKeperawatan/getAllDataByNoRm/' + norm , { headers: this.httpOptions['headers'] } );
  }
  












  // 

  simpanUGDAssesment(UGDAssesment: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/createUGDAssesment', UGDAssesment,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', UGDAssesment))
      );
  }

  updateUGDAssesment(UGDAssesment: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/updateUGDAssesment', UGDAssesment,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', UGDAssesment))
      );
  }

  getUGDAssesmentByNoTransaksiNoRM(no_rm: any, no_transaksi: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/ugd/assesment/ugd/getUGDAssesmentByNoTransaksiNoRM?no_rm=' + no_rm + '&no_transaksi=' + no_transaksi, { headers: this.httpOptions['headers'] } );
  }

  getUGDByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/ugd/assesment/ugd/GetByParamsUGDAssesment?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getUGDAssesmentByNoRM(norm: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/ugd/assesment/ugd/getUGDAssesmentByNoRM?no_rm=' + norm , { headers: this.httpOptions['headers'] } );
  }
  
  simpanDaftarAlergiObat(jenis_alergi_obat_dan_makanan: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/simpanDaftarAlergiObat', jenis_alergi_obat_dan_makanan,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', jenis_alergi_obat_dan_makanan))
      );
  }

  simpanTerapi(terapi: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/simpanTerapi', terapi,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', terapi))
      );
  }

  simpanTindakan(tindakan: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/simpanTindakan', tindakan,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', tindakan))
      );
  }

  hapusTindakan(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/ugd/assesment/ugd/hapusTindakan?id=' + id , { headers: this.httpOptions['headers'] } );
  }
  
  hapusDokterKonsulenTambahan(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/ugd/assesment/ugd/hapusDokterKonsulenTambahan?id=' + id , { headers: this.httpOptions['headers'] } );
  }
  
  hapusDokterIGDTambahan(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/ugd/assesment/ugd/hapusDokterIGDTambahan?id=' + id , { headers: this.httpOptions['headers'] } );
  }
  
  tambahDokterKonsulen(dokter: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/tambahDokterKonsulen', dokter,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', dokter))
      );
  }

  tambahDokterIGD(dokter: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/ugd/assesment/ugd/tambahDokterIGD', dokter,  { headers: this.httpOptions['headers'] } )
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', dokter))
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
