import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataUpdateKunjungan {
  // questioner 
  conditionCode: any
  conditionDisplay: any
  dateNow: any = new Date().toISOString()

  getdata() {
    return {
      encounters: [
        {
          name: "update",
          status: "finished",
          episodeOfCare: [
            {
              reference: "EpisodeOfCare/{{EpisodeOfCare_Jantung}}"
            },
            {
              reference: "EpisodeOfCare/{{EpisodeOfCare_UroNefro}}"
            }
          ],
          statusHistory: [
            {
              status: "arrived",
              period: {
                start: this.dateNow,
                end: this.dateNow
              }
            },
            {
              status: "in-progress",
              period: {
                start: this.dateNow,
                end: this.dateNow
              }
            },
            {
              status: "finished",
              period: {
                start: this.dateNow,
                end: this.dateNow
              }
            }
          ],
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"
          },
          period: {
            start: this.dateNow,
            end: this.dateNow
          }
        }
      ]
    }
  }
}
