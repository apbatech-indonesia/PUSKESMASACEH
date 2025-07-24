import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicIvaPositifPatientRreferral {
  patientInstruction: any
  dateNow = new Date().toISOString()

  getdata() {
    return {
      serviceRequests: [
        {
          name: "iva_positif_patient_referral",
          category: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "3457005",
                  display: "Patient referral"
                }
              ]
            },
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "11429006",
                  display: "Consultation"
                }
              ]
            }
          ],
          patientInstruction: this.patientInstruction,
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: this.patientInstruction
          },
          status: "active",
          intent: "original-order",
          priority: "routine",
          occurrenceDateTime: this.dateNow,
          authoredOn: this.dateNow,
          data: [
            {
              system: "http://snomed.info/sct",
              code: "3457005",
              display: "Patient referral"
            },
            {
              text: this.patientInstruction
            }
          ],
          reason: [
            {},
            {
              text: "IVA Positif, perlu ada pemeriksaan tindaklanjut"
            }
          ]
        }
      ]
    }
  }
}

