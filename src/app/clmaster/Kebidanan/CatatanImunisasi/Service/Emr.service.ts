import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalComponent } from '../../../Globals/global.component';

import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})

export class EmrService {
  private baseUrl = GlobalComponent.url+'/api/';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl+'buku-pencatatan-imunisasi/create-data-imunisasi', data);
  }
  list(data): Observable<any> {
    return this.http.post(this.baseUrl+'buku-pencatatan-imunisasi/search-data-imunisasi', data);
  }
  show(id): Observable<any> {
    return this.http.get(this.baseUrl+'buku-pencatatan-imunisasi/show-data-imunisasi/'+id);
  }
  update(data): Observable<any> {
    return this.http.post(this.baseUrl+'buku-pencatatan-imunisasi/update-data-imunisasi',data);
  }
  delete(id): Observable<any> {
    return this.http.get(this.baseUrl+'buku-pencatatan-imunisasi/delete-data-imunisasi/'+id);
  }

  dokterList(): Observable<any> {
    return this.http.get(this.baseUrl+'getAllDokter')
    .pipe(
      catchError(this.handleError)
    );
  }
  obatList(): Observable<any> {
    return this.http.get(this.baseUrl+'getAllObat')
    .pipe(
      catchError(this.handleError)
    );
  }
  pasienList(a): Observable<any> {
    return this.http.get(this.baseUrl+'get-all-pasien/'+a);;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('Bad Request:', error.error);
      // Handle 400 errors as needed
    } else {
      console.error('An error occurred:', error.error);
      // Handle other errors here
    }
  
    return throwError('Something went wrong; please try again later.');
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // console.error(error);
  //     // return of(result as T);
  //     return throwError(error);
  //   };
  // }

}
