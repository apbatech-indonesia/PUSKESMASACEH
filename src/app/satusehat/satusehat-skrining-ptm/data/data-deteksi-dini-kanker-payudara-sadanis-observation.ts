import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerPayudaraSadanisObservation {
  dateNow = new Date().toISOString()
  
  getdata() {
    return {
      observations: [

        {
          name: "IVA_observation",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "exam",
            display: "Exam"
          },
          data: [
            {
              code: {
                system: "http://snomed.info/sct",
                code: "13607009",
                display: "Manual examination of breast"
              },

              bodySite: {},
              resultBoolean: false,
              result: {},
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "290084006",
                display: "Breast normal"
              }
            }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}
