import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniHipertensi {
  // questioner 
  sistole: any
  diastole: any

  getdata() {
    return {
      observations: [
        {
          sistolik_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "8480-6",
                  display: "Systolic blood pressure"
                },
                observation_result: {
                  value: this.sistole,
                  unit: "mmHg",
                  system: "http://unitsofmeasure.org",
                  code: "mm[Hg]"
                }
              }
            ]
          }
        },
        {
          diastolik_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "8462-4",
                  display: "Diastolic blood pressure"
                },
                observation_result: {
                  value: this.diastole,
                  unit: "mmHg",
                  system: "http://unitsofmeasure.org",
                  code: "mm[Hg]"
                }
              }
            ]
          }
        },
        {
          hipertensi_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://snomed.info/sct",
                  code: "268607006",
                  display: "Hypertension risk level"
                },
                observation_result: {
                  value: "IMT_calc",
                  unit: "kg/m^2",
                  system: "http://unitsofmeasure.org",
                  code: "kg/m2"
                },
                valueRatio: {
                  numerator: {
                    value: "TD_Systolic",
                    unit: "mmHg",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]"
                  },
                  denominator: {
                    value: "TD_Diastolic",
                    unit: "mmHg",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]"
                  }
                },
                interpretation: [
                  {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: "248342006",
                        display: "Underweight"
                      }
                    ]
                  }
                ],
                referenceRange: [
                  {
                    high: {
                      value: 16.9,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    text: "Sangat Kurus"
                  },
                  {
                    low: {
                      value: 17,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    high: {
                      value: 18.4,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    text: "Kurus"
                  },
                  {
                    low: {
                      value: 18.5,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    high: {
                      value: 25,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    text: "Normal"
                  },
                  {
                    low: {
                      value: 25.1,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    high: {
                      value: 27,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    text: "Gemuk (Overweight)"
                  },
                  {
                    low: {
                      value: 27.1,
                      unit: "kg/m^2",
                      system: "http://unitsofmeasure.org",
                      code: "kg/m2"
                    },
                    text: "Obese"
                  }
                ],
                derivedFrom: [
                  {
                    reference: "Observation/{{Observation_TB}}",
                    display: "Body Height"
                  },
                  {
                    reference: "Observation/{{Observation_BB}}",
                    display: "Body Weight"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

  }
}
