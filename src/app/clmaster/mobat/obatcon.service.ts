import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
let apiurl = localStorage.getItem('baseUrl');
let apiurx = localStorage.getItem('baseUrx');


@Injectable({
  providedIn: 'root'
})
export class ObatconService {

  constructor(public http: HttpClient) { }


  getobatbpjs(a):Observable<any>{
    return this.http.get(apiurx+'pcare/getobatbpjs.php?nama='+a)
  }
  
  
}
