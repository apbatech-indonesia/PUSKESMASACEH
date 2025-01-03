import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniMata {
  // questioner 
  visusKiri: any
  visusKanan: any
  numeratorMataKanan: any
  denominatorMataKanan: any
  numeratorMataKiri: any
  denominatorMataKiri: any

  getdata() {
    return {
      observations: [
        {
          visus_mata_kanan_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "79882-7",
                  display: "Visual acuity uncorrected Right eye by Snellen eye chart"
                },
                observation_result: {
                  value: this.visusKanan,
                  unit: "mmHg",
                  system: "http://unitsofmeasure.org",
                  code: "mm[Hg]"
                },
                valueRatio: {
                  numerator: {
                    value: this.numeratorMataKanan,
                    unit: "m",
                    system: "http://unitsofmeasure.org",
                    code: "m"
                  },
                  denominator: {
                    value: this.denominatorMataKanan,
                    unit: "m",
                    system: "http://unitsofmeasure.org",
                    code: "m"
                  }
                }
              }
            ]
          }
        },
        {
          visus_mata_kiri_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "79883-5",
                  display: "Visual acuity uncorrected Left eye by Snellen eye chart"
                },
                observation_result: {
                  value: this.visusKiri,
                  unit: "mmHg",
                  system: "http://unitsofmeasure.org",
                  code: "mm[Hg]"
                },
                valueRatio: {
                  numerator: {
                    value: this.numeratorMataKiri,
                    unit: "m",
                    system: "http://unitsofmeasure.org",
                    code: "m"
                  },
                  denominator: {
                    value: this.denominatorMataKiri,
                    unit: "m",
                    system: "http://unitsofmeasure.org",
                    code: "m"
                  }
                }
              }
            ]
          }
        }
      ]
    }

  }
}
