import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class AncService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })
  
  constructor(public http: HttpClient) { }
  createAnc(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
  updateStatusObstetri(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/updateStatusObstetri', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateKunjunganKehamilan(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/updateKunjunganKehamilan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updatePelayananKehamilan(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/updatePelayananKehamilan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateTindakanKehamilan(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/updateTindakanKehamilan', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  updateKonseling(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/updateKonseling', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createLaboratorium(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/createLaboratorium', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationLaboratorium(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/observationLaboratorium', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagLaboratorium(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/diagLaboratorium', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  createRadiologi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/createRadiologi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  observationRadiologi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/observationRadiologi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosisReportRadiologi(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/diagnosisReportRadiologi', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  diagnosisFinal(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/diagnosisFinal', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  meninggalkanFaskes(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/meninggalkanFaskes', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakLanjutEncounter(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/tindakLanjutEncounter', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  tindakLanjutCreate(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/tindakLanjutCreate', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }

  getDataPatient(data: any) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'ANC/getDataPatient', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
}
