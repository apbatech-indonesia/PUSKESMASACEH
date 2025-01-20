import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerServicIvaPositifPatientRreferral {
  dateNow = new Date().toISOString()

  getdata() {
    return {
      serviceRequests: [
        {
          name: "patient_referral",
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
          patientInstruction: "",
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: ""
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
              text: "Rujukan diduga Kanker Cervix menggunakan ambulance"
            }
          ],
          reason: [
            {},
            {
              text: " IVA Positif, perlu ada pemeriksaan tindaklanjut"
            }
          ]
        }
      ]
    }
  }
}
