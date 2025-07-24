import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiPpokCondition {
  condition: Condition
  dateNow: any = new Date().toISOString()

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
          recordedDate: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: this.condition.code,
              display: this.condition.display
            }
          ]
        }
      ]
    }
  }
}

export class Condition {
  code: any
  display: any
}
