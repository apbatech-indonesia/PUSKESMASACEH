import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class GigiService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  createKunjungan(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/createKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createRelatedPerson(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/createRelatedPerson', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createAllergyIntolerance(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/allergyIntolerancesCreate', data, { headers: this.headers })
        .subscribe((response) => resolve(response));
    });
  }

  createSpecimen(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/specimensCreate', data, { headers: this.headers })
        .subscribe((response) => resolve(response));
    });
  }

  createObservation(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/observationsCreate', data, { headers: this.headers })
        .subscribe((response) => resolve(response));
    });
  }

  createProcedure(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/proceduresCreate', data, { headers: this.headers })
        .subscribe((response) => resolve(response));
    });
  }

  createCondition(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/conditionsCreate', data, { headers: this.headers })
        .subscribe((response) => resolve(response));
    });
  }

  createServiceRequest(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gigi/serviceRequestsCreate', data, { headers: this.headers })
        .subscribe((response) => resolve(response));
    });
  }
}
