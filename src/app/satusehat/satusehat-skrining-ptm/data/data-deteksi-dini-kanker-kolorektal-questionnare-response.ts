import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerKolorektalQuestionnareResponse {
  dateNow = new Date().toISOString()
  getdata() {
    return {
      questionnaireResponses: [
        {
          name: "Kuesioner_Kanker_Paru",
          status: "completed",
          authored: this.dateNow,
          item: [
            {
              linkId: "1",
              text: "Kuesioner Kanker Kolorektal",
              item: [
                {
                  linkId: "1.1",
                  text: "Riwayat keluarga kanker kolorektal generasi pertama (Ayah atau Ibu kandung), kakak atau adik kandung)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000020",
                        display: "Memiliki riwayat keluarga kanker kolorektal generasi pertama"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.2",
                  text: "Apakah peserta pernah merokok?",
                  answer: [
                    {
                      valueBoolean: true
                    }
                  ]
                },
                {
                  linkId: "1.3",
                  text: "Hasil Skoring",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://snomed.info/sct",
                        code: "723505004",
                        display: "Low risk"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
