import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class DataDeteksiStrokeServiceRequest {
    patientInstruction: any
    dateNow: any = new Date().toISOString()

    getdata() {
        return {
            serviceRequests: [
                {
                    name: "cholesterol_service_request",
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
                        display: "Permintaan Pemeriksaan Panel Skrining Kolesterol Total 24 April 2024 pukul 09:30 WIB"
                    },
                    status: "active",
                    intent: "original-order",
                    priority: "routine",
                    occurrenceDateTime: this.dateNow,
                    authoredOn: this.dateNow,
                    data: [
                        {
                            system: "http://loinc.org",
                            code: "2093-3",
                            display: "Cholesterol [Mass/volume] in Serum or Plasma"
                        },
                        {
                            text: "Panel Skrining Kolesterol Total PTM"
                        }
                    ],
                    reason: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-10",
                            code: "Z13.6",
                            display: "Special screening examination for cardiovascular disorders"
                        },
                        {
                            text: "Deteksi Dini Stroke"
                        }
                    ]
                }
            ]
        }
    }
}
