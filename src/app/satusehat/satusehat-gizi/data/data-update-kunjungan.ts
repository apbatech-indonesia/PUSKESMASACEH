import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataUpdateKunjungan {
  // questioner 
  conditionCode: any
  conditionDisplay: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      update_data: {
        status: "finished",
        period: {
          start: this.dateNow,
          end: this.dateNow
        },
        diagnosis: {
          id: null,
          display: "test",
          role: {
            system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
            code: "DD",
            display: "Discharge diagnosis"
          }
        },
        statusHistory: [
          {
            status: "arrived",
            period: {
              start: this.dateNow,
              end: this.dateNow
            }
          },
          {
            status: "in-progress",
            period: {
              start: this.dateNow,
              end: this.dateNow
            }
          },
          {
            status: "finished",
            period: {
              start: this.dateNow,
              end: this.dateNow
            }]
      }
    }
  }
}

