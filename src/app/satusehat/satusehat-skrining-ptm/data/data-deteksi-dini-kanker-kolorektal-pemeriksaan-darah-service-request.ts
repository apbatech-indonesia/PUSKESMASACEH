import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerKolorektalPemeriksaanDarahServiceRequest {
  code: any = "Z13.9"
  display: any = "Special screening examination, unspecified"
  dateNow = new Date().toISOString()

  getdata() {
    return {
      serviceRequests: [
        {
          name: "US_Breast_serviceRequest",
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
            display: "Permintaan Pemeriksaan Darah Samar pada feses, 24 April 2024 pukul 09: 30 WIB"
          },
          status: "active",
          intent: "original-order",
          priority: "routine",
          occurrenceDateTime: this.dateNow,
          authoredOn: this.dateNow,
          data: [
            {
              system: "http://loinc.org",
              code: "14563-1",
              display: "Hemoglobin.gastrointestinal [Presence] in Stool --1st specimen"
            },
            {
              text: ""
            }
          ],
          reason: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: this.code,
              display: this.display
            },
            {
              text: "Deteksi Dini Kanker Kolorektal"
            }
          ]
        }
      ]
    }
  }
}

