import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataDeteksiDiniKankerPayudaraHasilUsgDiagnosticReport {
  display: any;
  dateNow = new Date().toISOString();

  getdata() {
    return {
      diagnosticReports: [
        {
          name: "us_breast_diagnosticReport",
          status: "final",

          category: {},
          data: [
            {
              code: {
                code: "24601-7",
                display: "US Breast",
                system: "http://loinc.org",
              },
              result: {
                reference: "Observation/{{Observation_USGMammae}}",
              },
            },
          ],
          effectiveDateTime: this.dateNow,
          specimen: [],
          basedOn: [
            {
              reference: "ServiceRequest/{{ServiceRequest_USGMammae}}",
            },
          ],
          imagingStudy: [
            {
              reference: "ImagingStudy/{{ImagingStudy_USG}}",
            },
          ],
          conclusionCode: {
            system: "http://snomed.info/sct",
            code: "290084006",
            display: this.display,
          },
        },
      ],
    };
  }
}
