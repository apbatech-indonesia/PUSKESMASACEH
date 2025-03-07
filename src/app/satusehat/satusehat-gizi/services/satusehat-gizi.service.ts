import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class GiziService {
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

  createKunjunganGizi(data: any) {
    return this.request('gizi/createKunjungan', data);
  }

  getRiwayat(data: any) {
    return this.request('master/getUseCase', data);
  }

  createRelatedPersonGIZI(data: any) {
    return this.request('gizi/createRelatedPerson', data);
  }

  getDataTerminologi(data: any) {
    return this.request('terminologi/search', data);
  }

  getDataQuestionaire(data: any) {
    return this.request('question/searchV2', data);
  }

  getDataSatuanUnit(data: any) {
    return this.request('unitofmeasure/search', data);
  }

  createKeluhanUtama(data: any) {
    return this.request('gizi/conditionsCreate', data);
  }

  createAlergyIntolerance(data: any) {
    return this.request('gizi/allergyIntolerancesCreate', data);
  }

  createAlergyObat(data: any) {
    return this.request('gizi/medicationStatementsCreate', data);
  }

  createObservations(data: any) {
    return this.request('gizi/observationsCreate', data);
  }

  createServiceRequests(data: any) {
    return this.request('gizi/serviceRequestsCreate', data);
  }

  createSpecimen(data: any) {
    return this.request('gizi/specimensCreate', data);
  }

  createSkriningMalnutrisiQuestionaire(data: any) {
    return this.request('gizi/questionnaireResponsesCreate', data);
  }
}
