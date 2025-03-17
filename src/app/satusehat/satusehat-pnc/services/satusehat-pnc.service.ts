import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class PncService {
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
  getDataSatuanUnit(data: any) {
    return this.request('unitofmeasure/search', data);
  }
  createKunjunganPnc(data: any) {
    return this.request('PNC/createKunjungan', data);
  }
  craeteRelatedPersonPnc(data: any) {
    return this.request('PNC/createRelatedPerson', data);
  }
  craeteObservationPnc(data: any) {
    return this.request('PNC/observationsCreate', data);
  }
  craeteConditionPnc(data: any) {
    return this.request('PNC/conditionsCreate', data);
  }
  craeteProceduresPnc(data: any) {
    return this.request('PNC/proceduresCreate', data);
  }
  getRiwayatPasien(data: any) {
    return this.request('master/getDataPatient', data);
  }
  getDataTerminologi(data: any) {
    return this.request('terminologi/search', data);
  }
}
