import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerKolorektalPemeriksaanDarahSpecimen {
  status: any
  dateNow = new Date().toISOString()
  getdata() {
    return {
      specimens: [
        {
          name: "cervical_swab__specimen",
          status: this.status,
          type: {
            system: "http://snomed.info/sct",
            code: "119339001",
            display: "Stool specimen"
          },
          collection: {
            method: {
              system: "http://snomed.info/sct",
              code: "225105004",
              display: "Collection of stool specimen"
            },
            collectedDateTime: this.dateNow
          },
          receivedTime: this.dateNow,
          request: [
            {
              reference: "ServiceRequest/{{ServiceRequest_DarSam}}"
            }
          ]
        }
      ]
    }
  }
}
