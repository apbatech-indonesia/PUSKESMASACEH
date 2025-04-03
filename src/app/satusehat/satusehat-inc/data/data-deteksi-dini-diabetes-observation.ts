import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class DataDeteksiDiniDiabetesObservation {
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
                    name: "glucose",
                    category: {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "laboratory",
                        display: "Laboratory"
                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "2345-7",
                                display: "Glucose [Mass/volume] in Serum or Plasma"
                            },
                            bodySite: {},
                            resultBoolean: false,
                            result: {
                                value: 123.456,
                                unit: "mg/dL",
                                system: "http://unitsofmeasure.org",
                                code: "mg/dL"
                            },
                            valueCodeableConcept: {
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T00:23:30+00:00",
                    issued: "2024-04-24T00:23:30+00:00"
                },
                {
                    name: "fasting_glucose",
                    category: {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "laboratory",
                        display: "Laboratory"
                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "1558-6",
                                display: "Fasting glucose [Mass/volume] in Serum or Plasma"
                            },
                            bodySite: {},
                            resultBoolean: false,
                            result: {
                                value: 77.777,
                                unit: "mg/dL",
                                system: "http://unitsofmeasure.org",
                                code: "mg/dL"
                            },
                            valueCodeableConcept: {
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T00:23:30+00:00",
                    issued: "2024-04-24T00:23:30+00:00"
                },

                {
                    name: "2hours_post_meal_glucose",
                    category: {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "laboratory",
                        display: "Laboratory"
                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "1521-4",
                                display: "Glucose [Mass/volume] in Serum or Plasma --2 hours post meal"
                            },

                            bodySite: {},
                            resultBoolean: false,
                            result: {
                                value: 133.3,
                                unit: "mg/dL",
                                system: "http://unitsofmeasure.org",
                                code: "mg/dL"
                            },
                            valueCodeableConcept: {
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T00:23:30+00:00",
                    issued: "2024-04-24T00:23:30+00:00"
                },

                {
                    name: "hemoglobin",
                    category: {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "laboratory",
                        display: "Laboratory"
                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "4548-4",
                                display: "Hemoglobin A1c/Hemoglobin.total in Blood"
                            },

                            bodySite: {},
                            resultBoolean: false,
                            result: {
                                value: 5.55,
                                unit: "%",
                                system: "http://unitsofmeasure.org",
                                code: "%"
                            },
                            valueCodeableConcept: {
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
