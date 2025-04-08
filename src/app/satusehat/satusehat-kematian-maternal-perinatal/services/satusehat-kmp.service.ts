import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class KmpService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl'))?.userData;
  headers = new HttpHeaders({ 'kd-cabang': this.userData?.kdcabang });

  constructor(private http: HttpClient) { }

  private request(endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${satusehatUrl}${endpoint}`, data, { headers: this.headers }).subscribe(
        response => resolve(response),
        error => reject(error)
      );
    });
  }
  getDataTerminologi(data: any) {
    return this.request('terminologi/search', data);
  }
  getDataSatuanUnit(data: any) {
    return this.request('unitofmeasure/search', data);
  }
  createKunjunganKmp(data: any) {
    return this.request('KMP/createKunjungan', data);
  }
  createRelatedPersonKmp(data: any) {
    return this.request('KMP/createRelatedPerson', data);
  }
  getUseCaseResponse(data: any) {
    return this.request('master/getUseCase', data);
  }
}
