import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicIvaObservation {
  result: any
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
                system: "http://terminology.kemkes.go.id/CodeSystem/examination",
                code: "X099241",
                display: "Tes IVA"
              },

              bodySite: {},
              resultBoolean: false,
              result: {},
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "300557001",
                display: this.result
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
