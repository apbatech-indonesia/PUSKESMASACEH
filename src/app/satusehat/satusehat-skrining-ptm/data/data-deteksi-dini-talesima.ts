import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiTalesima {
  value: any
  display: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      observations: [
        {
          name: "deteksi_talasemia",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "718-7",
                display: "Hemoglobin [Mass/volume] in Blood"
              },
              bodySite: {},
              resultBoolean: false,
              result: {
                value: this.value,
                display: this.display,
                unit: "g/dL",
                system: "http://unitsofmeasure.org",
                code: "g/dL"
              }
            }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow,
          interpretation: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                  code: "N",
                  display: this.display
                }
              ]
            }
          ],
          referenceRange: [
            {
              high: {
                value: 10.9,
                unit: "g/dL",
                system: "http://unitsofmeasure.org",
                code: "g/dL"
              },
              text: "Dibawah Normal"
            },
            {
              low: {
                value: 11.0,
                unit: "g/dL",
                system: "http://unitsofmeasure.org",
                code: "g/dL"
              },
              text: "Normal"
            }
          ]
        }
      ]
    }
  }
}



