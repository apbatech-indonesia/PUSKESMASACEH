import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiStrokeObservation {
  dateNow = new Date().toISOString()

  getdata() {
    return {
      observations: [
        {
          name: "ptm_cholesterol",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "2093-3",
                display: "Cholesterol [Mass/volume] in Serum or Plasma"
              },
              bodySite: {},
              resultBoolean: false,
              result: {
                value: 177.771,
                unit: "mg/dL",
                system: "http://unitsofmeasure.org",
                code: "mg/dL"
              },
              valueCodeableConcept: {}
            }
          ],
          interpretation:
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
            code: "N",
            display: "Normal"
          },
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}
