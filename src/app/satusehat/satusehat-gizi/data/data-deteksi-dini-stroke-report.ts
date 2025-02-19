import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class DataDeteksiStrokeReport {
    getdata() {
        return {
            diagnosticReports: [
                {
                    name: "ptm_cholesterol_report",
                    status: "final",
                    category: {
                        system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                        code: "CH",
                        display: "Chemistry"
                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "2093-3",
                                display: "Cholesterol [Mass/volume] in Serum or Plasma"
                            },
                            result: {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                code: "N",
                                display: "Normal"
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T04:02:45+00:00"
                },
                {
                    name: "gdp_report",
                    status: "final",
                    category: {

                        system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                        code: "CH",
                        display: "Chemistry"
                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "1558-6",
                                display: "Fasting glucose [Mass/volume] in Serum or Plasma"
                            },
                            result: {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                code: "N",
                                display: "Normal"
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T04:02:45+00:00"
                },
                {
                    name: "g2pp_report",
                    status: "final",
                    category: {
                        system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                        code: "CH",
                        display: "Chemistry"

                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "1521-4",
                                display: "Glucose [Mass/volume] in Serum or Plasma --2 hours post meal"
                            },
                            result: {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                code: "N",
                                display: "Normal"
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T04:02:45+00:00"
                },
                {
                    name: "hemoglobin_report",
                    status: "final",
                    category: {

                        system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                        code: "CH",
                        display: "Chemistry"

                    },
                    data: [
                        {
                            code: {
                                system: "http://loinc.org",
                                code: "4548-4",
                                display: "Hemoglobin A1c/Hemoglobin.total in Blood"
                            },
                            result: {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                code: "N",
                                display: "Normal"
                            }
                        }
                    ],
                    effectiveDateTime: "2024-04-24T04:02:45+00:00"
                }
            ]
        }

    }
}
