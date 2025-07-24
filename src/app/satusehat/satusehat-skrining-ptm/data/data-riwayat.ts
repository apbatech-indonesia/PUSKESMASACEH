import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataRiwayat {
  ptmSekarang: Riwayat
  ptmDulu: Riwayat
  ptmKeluarga: Riwayat
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      conditions: [
        {
          name: "ptm_sekarang",
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "problem-list-item",
            display: "Problem List Item"
          },
          data: [{
            system: "http://snomed.info/sct",
            code: this.ptmSekarang.code,
            display: this.ptmSekarang.display,
          }],
          onset_date_time: this.dateNow,
          recordedDate: this.dateNow
        },
        {
          name: "ptm_dulu",
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "inactive",
            display: "Inactive"
          },
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "problem-list-item",
            display: "Problem List Item"
          },
          data: [
            {
              system: "http://snomed.info/sct",
              code: this.ptmDulu.code,
              display: this.ptmDulu.display
            }
          ],
          onset_date_time: this.dateNow,
          recordedDate: this.dateNow
        },
        {
          name: "ptm_keluarga",
          clinicalStatus: {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active"
          },
          category: {
            system: "http://terminology.hl7.org/CodeSystem/condition-category",
            code: "problem-list-item",
            display: "Problem List Item"
          },
          data: [
            {
              system: "http://snomed.info/sct",
              code: this.ptmKeluarga.code,
              display: this.ptmKeluarga.display
            }
          ],
          onset_date_time: this.dateNow,
          recordedDate: this.dateNow
        }
      ]
    }
  }
}

class Riwayat {
  code: any = ''
  display: any = ''
}

