import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiPpokCondition {
  getdata() {
    return {
      conditions: [
        {
          name: "stable_condition",
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
          recordedDate: "2024-04-24T04:02:45+00:00",
          data: [
            {
              system: "http://snomed.info/sct",
              code: "28743005",
              display: "Productive cough"
            }
          ]
        }
      ]
    }
  }
}
