import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class DataDeteksiDiniDiabetesServiceRequest {
    patientInstruction: any
    dateNow: any = new Date().toISOString()

    getdata() {
        return {
            serviceRequests: [
                {
                    name: "glucose_service_request",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "108252007",
                                    display: "Laboratory procedure"
                                }
                            ]
                        }
                    ],
                    patientInstruction: this.patientInstruction,
                    encounter: {
                        reference: "Encounter/{{Encounter_id}}",
                        display: `Permintaan Pemeriksaan Panel Skrining Gula Darah ${this.dateNow}`
                    },
                    status: "active",
                    intent: "original-order",
                    priority: "routine",
                    occurrenceDateTime: this.dateNow,
                    authoredOn: this.dateNow,
                    data: [
                        {
                            system: "http://loinc.org",
                            code: "2345-7",
                            display: "Glucose [Mass/volume] in Serum or Plasma"

                        },
                        {
                            text: "Panel Skrining Gula Darah PTM"
                        }
                    ],
                    reason: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-10",
                            code: "Z13.1",
                            display: "Special screening examination for diabetes mellitus"
                        },
                        {
                            text: "Deteksi Dini Diabetes Mellitus"
                        }
                    ]
                }
            ]
        }
    }
}

