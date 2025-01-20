import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataDeteksiDiniKankerJantungQuestionnareResponse {
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
              text: "Kuesioner Kanker Paru",
              item: [
                {
                  linkId: "1.1",
                  text: "Apakah pernah didiagnosis/menderita kanker",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000032",
                        display: "Memiliki diagnosis kanker >5 tahun yang lalu"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.2",
                  text: "Apakah ada keluarga (ayah/ibu/saudara kandung) didiagnosis/menderita kanker sebelumnya",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://snomed.info/sct",
                        code: "429011007",
                        display: "Family history of malignant neoplasm of lung"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.3",
                  text: "Riwayat merokok/paparan asap rokok",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000022",
                        display: "Perokok aktif (dalam 1 tahun ini masih merokok)"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.4",
                  text: "Riwayat tempat kerja mengandung zat karsinogenik (Pertambangan/pabrik/bengkel/garmen/bangunan/laboratorium/sopir/galangan kapal, dll)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000017",
                        display: "Memiliki tempat kerja mengandung zat karsinogenik"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.5",
                  text: "Lingkungan tempat tinggal berpotensi tinggi (lingkungan dekat pabrik/pertambangan/buangan sampah, dll)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000024",
                        display: "Memiliki tempat tinggal berpotensi tinggi"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.6",
                  text: "Lingkungan dalam rumah yang tidak sehat (ventilasi buruk/atap dari asbes/lantai tanah, dapur tungku, dll)",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                        code: "QRI000027",
                        display: "Memiliki lingkungan dalam rumah yang tidak sehat"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.7",
                  text: "Pernah didiagnosis penyakit paru kronik",
                  answer: [
                    {
                      valueCoding: {
                        system: "http://snomed.info/sct",
                        code: "160258000",
                        display: "No history of respiratory system disease"
                      }
                    }
                  ]
                },
                {
                  linkId: "1.8",
                  text: "Hasil Kuesioner",
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
