import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniJantung {
  result: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      observations: [
        {
          name: "EKG",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "procedure",
            display: "Procedure"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "34534-8",
                display: "12 lead EKG panel"
              },
              result: {
                value: 71,
                unit: "kg",
                system: "http://unitsofmeasure.org",
                code: "kg"
              },
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "164854000",
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






