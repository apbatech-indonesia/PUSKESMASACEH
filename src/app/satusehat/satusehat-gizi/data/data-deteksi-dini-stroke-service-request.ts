import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class DataDeteksiStrokeServiceRequest {
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
                    patientInstruction: "",
                    encounter: {
                        reference: "Encounter/{{Encounter_id}}",
                        display: "Permintaan Pemeriksaan Panel Skrining Kolesterol Total 24 April 2024 pukul 09:30 WIB"
                    },
                    status: "active",
                    intent: "original-order",
                    priority: "routine",
                    occurrenceDateTime: "2024-04-24T04:04:10+00:00",
                    authoredOn: "2024-04-24T04:04:10+00:00",
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
