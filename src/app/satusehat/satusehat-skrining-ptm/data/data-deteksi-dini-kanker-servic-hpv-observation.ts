import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicHpvObservation {
  result: any
  dateNow = new Date().toISOString()
  
  getdata() {
    return {
      observations: [
        {
          name: "virus_DNA[Presence]_observation",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "44550-2",
                display: "Human papilloma virus DNA [Presence] in Cervix by Probe"

              },
              bodySite: {},
              resultBoolean: false,
              result: {},
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "787724008",
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
