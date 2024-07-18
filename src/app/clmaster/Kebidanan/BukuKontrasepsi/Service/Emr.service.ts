import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiserviceService } from 'src/app/apiservice.service';

import { GlobalComponent } from '../../../Globals/global.component';
@Injectable({
  providedIn: 'root'
})

export class EmrService {
  private baseUrl = GlobalComponent.url+'/api/';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl+'buku-pencatatan-kontrasepsi/create-data-kontrasepsi', data);
  }
  list(data): Observable<any> {
    // return this.http.post(this.baseUrl+'buku-pencatatan-kontrasepsi/get-laporan-tanggal-kontrasepsi', data);
    return this.http.post(this.baseUrl+'buku-pencatatan-kontrasepsi/search-data-kontrasepsi', data);
  }
  show(id): Observable<any> {
    return this.http.get(this.baseUrl+'buku-pencatatan-kontrasepsi/show-data-kontrasepsi/'+id);
  }
  update(data): Observable<any> {
    return this.http.post(this.baseUrl+'buku-pencatatan-kontrasepsi/update-data-kontrasepsi',data);
  }
  delete(id): Observable<any> {
    return this.http.get(this.baseUrl+'buku-pencatatan-kontrasepsi/delete-data-kontrasepsi/'+id);
  }

  dokterList(): Observable<any> {
    return this.http.get(this.baseUrl+'getAllDokter')
    .pipe(
      catchError(this.handleError('Error Ketika Mendapatkan Data', 'Objeka11'))
    );
  }
  pasienList(id): Observable<any> {
    return this.http.get(this.baseUrl+'get-all-pasien/'+id);;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
