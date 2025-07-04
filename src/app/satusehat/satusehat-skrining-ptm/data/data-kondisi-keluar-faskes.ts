import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataKondisiKeluarFaskes {
  // questioner
  conditionCode: any
  conditionDisplay: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      conditions: [
        {
          name: "end_condition",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "problem-list-item",
            display: "Problem List Item"
          },
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: this.conditionCode,
              display: this.conditionDisplay
            }
          ]
        }
      ]
    }
  }
}
