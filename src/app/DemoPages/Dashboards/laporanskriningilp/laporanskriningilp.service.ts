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

  getPatientStatus(data) {

    return this.http.post(satusehatUrl + 'screeningDashboard/getPatientStatus', data, { headers: this.headers }).toPromise()
  }
}