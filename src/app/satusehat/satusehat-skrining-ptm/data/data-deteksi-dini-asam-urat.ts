import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniAsamUrat {
  quantity: any
  result: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      observations: [
        {
          name: "deteksi_asam_urat",
          category: {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory"
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "3084-1",
                display: "Urate [Mass/volume] in Serum or Plasma"
              },
              result: {
                value: this.quantity,
                unit: "mg/dL",
                system: "http://unitsofmeasure.org",
                code: "mg/dL",
                display: this.result
              }
            }
          ],
          interpretation: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                  code: "H",
                  display: this.result
                }
              ]
            }
          ],
          referenceRange: [
            {
              low: {
                value: 2.6,
                unit: "mg/dL",
                system: "http://unitsofmeasure.org",
                code: "mg/dL"
              },
              high: {
                value: 6,
                unit: "mg/dL",
                system: "http://unitsofmeasure.org",
                code: "mg/dL"
              },
              text: "Normal"
            },
            {
              low: {
                value: 6.1,
                unit: "mg/dL",
                system: "http://unitsofmeasure.org",
                code: "mg/dL"
              },
              text: "Tinggi"
            }
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow
        }
      ]
    }
  }
}






