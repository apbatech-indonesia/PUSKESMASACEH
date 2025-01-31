import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class laporanskriningilpService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(
    public http: HttpClient
  ) { }

  getPatientByClusterGroup(data) {
    return this.http.post(satusehatUrl + 'screeningDashboard/getPatientByClusterGroup', data, { headers: this.headers }).toPromise()
  }

  getPatientStatus(data) {
    return this.http.post(satusehatUrl + 'screeningDashboard/getPatientStatus', data, { headers: this.headers }).toPromise()
  }

  getPatientByCluster(data) {
    return this.http.post(satusehatUrl + 'screeningDashboard/getPatientByCluster', data, { headers: this.headers }).toPromise()
  }

  getPatientByScreening(data) {
    return this.http.post(satusehatUrl + 'screeningDashboard/getPatientByScreening', data, { headers: this.headers }).toPromise()
  }
}