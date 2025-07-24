import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataDeteksiDiniKankerKolorektalPemeriksaanDarahObservations {
  display: any;
  dateNow = new Date().toISOString();

  getdata() {
    return {
      observations: [
        {
          name: "Hemoglobin_gastrointestinal_observation",
          category: {
            system:
              "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory",
          },
          data: [
            {
              code: {
                system: "http://loinc.org",
                code: "14563-1",
                display:
                  "Hemoglobin.gastrointestinal [Presence] in Stool --1st specimen",
              },
              bodySite: {},
              resultBoolean: false,
              result: {},
              valueCodeableConcept: {
                system: "http://snomed.info/sct",
                code: "167667006",
                display: this.display,
              },
            },
          ],
          effectiveDateTime: this.dateNow,
          issued: this.dateNow,
          specimen: {
            reference: "Specimen/{{Specimen_DarSam}}",
          },
        },
      ],
    };
  }
}
