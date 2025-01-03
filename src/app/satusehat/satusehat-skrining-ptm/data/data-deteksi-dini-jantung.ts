import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniJantung {
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
                display: "Electrocardiogram normal"
              }
            }
          ],
          effectiveDateTime: "2024-04-24T00:23:30+00:00",
          issued: "2024-04-24T00:23:30+00:00"
        }
      ]
    }
  }
}
