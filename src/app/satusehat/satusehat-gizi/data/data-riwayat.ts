import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataRiwayat {
  // questioner
  ptmCode: any;
  ptmDisplay: any;
  ptmDuluCode: any;
  ptmDuluDisplay: any;
  ptmKeluargaCode: any;
  ptmKeluargaDisplay: any;
  dateNow: any = new Date().toISOString();

  getdata() {
    return {
      conditions: [
        {
          ptm_sekarang: {
            clinical_status: {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
            category: {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "problem-list-item",
              display: "Problem List Item",
            },
            condition_item: {
              system: "http://snomed.info/sct",
              code: this.ptmCode,
              display: this.ptmDisplay,
            },
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow,
          },
        },
        {
          ptm_dulu: {
            clinical_status: {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "inactive",
              display: "Inactive",
            },
            category: {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "problem-list-item",
              display: "Problem List Item",
            },
            condition_item: {
              system: "http://snomed.info/sct",
              code: this.ptmDuluCode,
              display: this.ptmDuluDisplay,
            },
            onset_date_time: this.dateNow,
            recorded_date: this.dateNow,
          },
        },
        {
          ptm_keluarga: {
            clinical_status: {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
            category: {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "problem-list-item",
              display: "Problem List Item",
            },
            condition_item: {
              system: "http://snomed.info/sct",
              code: this.ptmKeluargaCode,
              display: this.ptmKeluargaDisplay,
            },
            onset_date_time: this.dateNow,
            recordedDate: this.dateNow,
          },
        },
      ],
    };
  }
}
