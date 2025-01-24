import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let satusehatUrl = 'https://besatusehat.clenicapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class skriningService {
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  constructor(public http: HttpClient) { }

  register(data) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'screeningPatient/register', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  } 
  
  getCluster(data) {
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'cluster/getGroup', data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  } 
  
  getSkrinigById(data:any) {
    let urlMock = 'https://9e089e6b77014ff0896a007c23de1b2e.api.mockbin.io/'
    return new Promise((resolve) => {
      this.http.post(satusehatUrl + 'screening/search', data, { headers: this.headers }).subscribe((data) => {
      // this.http.post(urlMock, data, { headers: this.headers }).subscribe((data) => {
        resolve(data)
      })
    })
  }
  
}