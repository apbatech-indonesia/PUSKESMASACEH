import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class GiziService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  createKunjunganGizi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/createKunjungan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createRelatedPersonGIZI(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/createRelatedPerson', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getDataSelectKeluhanUtama(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'terminologi/search', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  getDataTerminologi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'terminologi/search', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  getDataQuestionaire(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'question/searchV2', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  getDataSatuanUnit(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'unitofmeasure/search', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  createKeluhanUtama(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/conditionsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createAlergyInteolerance(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/allergyIntolerancesCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  createPemeriksaanFisik(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/observationsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  createAlergyObat(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/medicationStatementsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  createSkriningMalnutrisiObserve(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/observationsCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  createSkriningMalnutrisiQuestionaire(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'gizi/questionnaireResponsesCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
}
