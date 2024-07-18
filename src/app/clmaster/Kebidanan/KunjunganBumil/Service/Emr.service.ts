import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalComponent } from '../../../Globals/global.component';

@Injectable({
  providedIn: 'root'
})

export class EmrService {
  // private baseUrl = 'http://127.0.0.1:8000/api/';
  private baseUrl = GlobalComponent.url+'/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer 4pb4tech',
      'HeaderUsername': localStorage.getItem('username') || '{}',
      'HeaderID': localStorage.getItem('userID') || '{}',
      'UserToken': localStorage.getItem('token') || '{}'
    })
  };

  constructor(private http: HttpClient) { }

  bumilCreate(data: any): Observable<any> {
    return this.http.post(this.baseUrl+'laporan-kunjungan-bumil/create-data', data);
  }
  bumilList(data): Observable<any> {
    return this.http.post(this.baseUrl+'laporan-kunjungan-bumil/search-data-kunjungan-bumil', data);
  }
  bumilShow(id): Observable<any> {
    return this.http.get(this.baseUrl+'laporan-kunjungan-bumil/show-data-bumil/'+id);
  }
  bumilUpdate(data): Observable<any> {
    return this.http.post(this.baseUrl+'laporan-kunjungan-bumil/update-data',data);
  }
  delete(id): Observable<any> {
    return this.http.get(this.baseUrl+'laporan-kunjungan-bumil/delete-data-bumil/'+id);
  }

  dokterList(): Observable<any> {
    return this.http.get(this.baseUrl+'getAllDokter')
    .pipe(
      catchError(this.handleError('Error Ketika Mendapatkan Data', 'Objeka11'))
    );
  }
  pasienList(a): Observable<any> {
    return this.http.get(this.baseUrl+'get-all-pasien/'+a);;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
