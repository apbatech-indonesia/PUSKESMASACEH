import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniObesitas {
  // questioner 
  beratBadan: any
  tinggiBadan: any
  indexMasaTubuh: any
  lingkarPinggang: any

  getdata() {
    return {
      observations: [
        {
          body_weight_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "29463-7",
                  display: "Body weight"
                },
                observation_result: {
                  value: this.beratBadan,
                  unit: "kg",
                  system: "http://unitsofmeasure.org",
                  code: "kg"
                }
              }
            ]
          }
        },
        {
          body_height_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "8302-2",
                  display: "Body height"
                },
                observation_result: {
                  value: this.tinggiBadan,
                  unit: "cm",
                  system: "http://unitsofmeasure.org",
                  code: "cm"
                }
              }
            ]
          }
        },
        {
          bmi_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://loinc.org",
                  code: "39156-5",
                  display: "Body mass index (BMI) [Ratio]"
                },
                observation_result: {
                  value: this.indexMasaTubuh,
                  unit: "kg/m^2",
                  system: "http://unitsofmeasure.org",
                  code: "kg/m2"
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
                    type: {
                      coding: [
                        {
                          system: "https://www.hl7.org/fhir/R4/codesystem-referencerange-meaning.html",
                          code: "normal",
                          display: "Normal Range"
                        }
                      ]
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
        },
        {
          waist_observation: {
            observation_category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam"
            },
            observation_items: [
              {
                observation_code: {
                  system: "http://snomed.info/sct",
                  code: "276361009",
                  display: "Waist circumference"
                },
                observation_result: {
                  value: this.lingkarPinggang,
                  unit: "cm",
                  system: "http://unitsofmeasure.org",
                  code: "cm"
                }
              }
            ],
            interpretation: [
              {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    code: "N",
                    display: "Normal"
                  }
                ]
              }
            ],
            referenceRange: [
              {
                high: {
                  value: 79.9,
                  unit: "cm",
                  system: "http://unitsofmeasure.org",
                  code: "cm"
                },
                type: {
                  coding: [
                    {
                      system: "http://terminology.hl7.org/CodeSystem/referencerange-meaning",
                      code: "normal",
                      display: "Normal Range"
                    }
                  ]
                },
                text: "Normal"
              },
              {
                low: {
                  value: 80,
                  unit: "cm",
                  system: "http://unitsofmeasure.org",
                  code: "cm"
                },
                text: "Central Obesity"
              }
            ]
          }
        }
      ]
    }
  }
}
