import { HttpHeaders } from '@angular/common/http'
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import Swal from 'sweetalert2'
import { ApiserviceService } from '../../../apiservice.service'
import { ActivatedRoute } from '@angular/router'
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { GiziService } from '../services/satusehat-gizi.service'
import { DataRiwayat } from '../data/data-riwayat'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { W } from '@angular/cdk/keycodes'

@Component({
  selector: 'app-tulis-satusehat-gizi',
  templateUrl: './tulis-satusehat-gizi.component.html',
  styleUrls: ['./tulis-satusehat-gizi.component.sass']
})

export class TulisSatuSehatGiziComponent implements OnInit {
  // NOTE: property dasar
  userData: any = JSON.parse(localStorage.getItem('userDatacl')).userData
  notransaksi: string = this.route.snapshot.paramMap.get('notrans')
  relatedPersonResponse: any
  encounter_id: string
  useCaseId: string
  cabangData: any
  idpasien: any
  dateNow = new Date().toISOString()
  formIbuAyah: FormGroup
  antropometriObservationForm: FormGroup
  antropometriBalitaObservationForm: FormGroup
  antropometriIbuHamilObservationForm: FormGroup
  antropometriIndexObservationForm: FormGroup
  formPemeriksaanFisik: FormGroup
  formRencanaTindakLanjut: FormGroup
  formRujukLaborat: FormGroup
  formMalnitrisi: FormGroup
  formKeluhanUtama: FormGroup
  // NOTE: Init form
  formSkriningMalnutrisiQuestionaire: FormGroup
  formAlergiMakanan: FormGroup
  formAlergiObat: FormGroup
  faArrowLeft = faArrowLeft
  faSave = faSave

  isDisabledFormGizi: boolean = true
  headers = new HttpHeaders({
    'kd-cabang': this.userData.kdcabang
  })

  data: any

  patientData: any = {
    noantrian: '-',
    norm: '-',
    pasien: '-',
    umur: '-',
    tgllahir: '-',
    jeniskelamin: '-',
    nampoli: '-',
    costumer: '-',
    namdokter: '-',
    alamat: '-'
  }

  umurPasien = parseInt(this.patientData.umur.split(' ')[0], 10);

  bayiOrNot = this.patientData.umur < 2 ? true : false;

  @Output() selectedItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();
  @Input() searchKeluhanUtamaText: string;
  searchKeluhanUtama: any = 'terminology_name';
  listKeluhanUtama: any = [];
  // Makanan
  listItemMakananAlergi: any;
  listQuestionaireMalNutrisi: any;
  showOptionsAlergiMakanan: boolean = false;
  pilihMakanan: string;
  pilihObat: string;
  selectedItemMakanans: any[] = [];
  selectedItemObat: any[] = [];
  listItemObats: any;
  itemTerminologiTingkatKesadaran: any;
  itemTerminologiTandaVitalSistolik: any;
  itemTerminologiTandaVitalDiastolik: any;
  itemTerminologiTandaVitalBodyTemprature: any;
  itemTerminologiTandaVitalHeartRate: any;
  itemTerminologiTandaVitalRespiratory: any;
  itemTerminologiKategoriMalnutrisi: any;
  itemTerminologiEyeNarrative: any;
  itemTerminologiFindingOfLip: any;
  itemsTerminologiAntropometriOservarion: any;
  itemsTerminologiCholesterolObservationServiceRequest: any;
  itemsTerminologiAntropometriBalitaOservarion: any;
  itemsTerminologiAntropometriIbuHamilOservarion: any;
  itemsTerminologiAntropometriIndexOservarion: any;
  itemsTerminologiRencanaTindakLanjutServiceRequest: any;
  showOptionsObats: boolean = false;
  pilihMObat: string;
  selectedItemobats: any[] = [];
  listMedicationMethods: any;
  listTingkatKesadaran: any;
  listTingkatInterprestasi: any;
  listSatuanUnit: any;
  constructor(
    private api: ApiserviceService,
    private GiziService: GiziService,
    private route: ActivatedRoute,
    public riwayat: DataRiwayat,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    this.formIbuAyah = this.fb.group({
      nama_ibu: [''],
      nik_ibu: [''],
      tl_ibu: [''],
      hp_ibu: [''],
      kota_ibu: [''],
      alamat_jalan_ibu: [''],
      postal_code_ibu: [''],
      province_id_ibu: [''],
      city_id_ibu: [''],
      district_id_ibu: [''],
      village_id_ibu: [''],
      rt_ibu: [''],
      rw_ibu: [''],
      nama_ayah: [''],
      nik_ayah: [''],
      tl_ayah: [''],
      hp_ayah: [''],
      kota_ayah: [''],
      alamat_jalan_ayah: [''],
      postal_code_ayah: [''],
      province_id_ayah: [''],
      city_id_ayah: [''],
      district_id_ayah: [''],
      village_id_ayah: [''],
      rt_ayah: [''],
      rw_ayah: ['']
    })
    this.formPemeriksaanFisik = this.fb.group({
      tingkatResponseKesadaran: [''],
      tdSistolik: this.fb.group({
        nilaiSistolik: [''],
        objectSistolik: [''],
        objectSatuanSistolik: ['']
      }),
      tdDiastolik: this.fb.group({
        nilaiDiastolik: [''],
        objectDiastolik: [''],
        objectSatuanDiastolik: ['']
      }),
      suhuTubuh: this.fb.group({
        nilaiSuhu: [''],
        objectSuhu: [''],
        objectSatuanSuhu: ['']
      }),
      denyutJantung: this.fb.group({
        nilaiDenyut: [''],
        objectDenyut: [''],
        objectSatuanDenyut: ['']
      }),
      pernapasan: this.fb.group({
        nilaiPernapasan: [''],
        objectPernapasan: [''],
        objectSatuanPernapasan: ['']
      }),
      kondisiMata: [''],
      kondisiBibir: [''],
    });
    this.formMalnitrisi = this.fb.group({
      nilaiSkorMalnutrisi: [''],
      items: this.fb.group({
        selectedItemValue: [''],
        tingkatInterprestasiMalNutrisi: ['']
      })
    });
    this.formRencanaTindakLanjut = this.fb.group({
      items: ['']
    });
    this.formRujukLaborat = this.fb.group({
      items: ['']
    });
    this.antropometriObservationForm = this.fb.group({
      pengukuran: this.fb.group({})
    });
    this.antropometriBalitaObservationForm = this.fb.group({
      pengukuran: this.fb.group({})
    });
    this.antropometriIndexObservationForm = this.fb.group({
      pengukuran: this.fb.group({})
    });
    this.antropometriIbuHamilObservationForm = this.fb.group({
      pengukuran: this.fb.group({})
    });

    this.formKeluhanUtama = this.fb.group({
      nama_keluhan: [''],
      tuberculosis: [''],
      diagnosa_awal: [''],
      diagnosa_akhir: ['']
    });
    this.formAlergiMakanan = this.fb.group({
      namaMakanan: [''],
      statusClinical: this.fb.group({
        status: ['']
      })
    });
    this.formAlergiObat = this.fb.group({
      metodePengobatan: [''],
      statusClinical: this.fb.group({
        status: ['']
      })
    });
    // NOTE: Setup form
    this.formSkriningMalnutrisiQuestionaire = this.fb.group({
      questions: this.fb.array([])
    });
  }

  loadQuestions() {
    // Membuat kontrol dinamis berdasarkan pertanyaan
    this.listQuestionaireMalNutrisi.forEach(question => {
      const questionForm = this.fb.group({
        objectId: [question.id],
        objectPertanyaan: [''],
        answer: ['']
      });
      this.formSkriningMalnutrisiQuestionaire.get('questions')?.setValue(questionForm);
    });
  }


  // NOTE: mengisi form ketika di select

  onCheckboxChange(event: Event, index: number, value: any) {
    //  const answersControl = this.questions.at(index).get('answer');
    //     let currentValue = answersControl?.value || [];

    //     if (event.target instanceof HTMLInputElement && event.target.checked)
    //     {
    //       currentValue.push(value);
    //     } else
    //     {
    //       currentValue = currentValue.filter((v: any) => v !== value);
    //     }

    //     answersControl?.setValue(currentValue);
  }

  // TODO: mengisi form ketika di select
  onSelectMedicationMethod(value: any) {
    if (!this.selectedItemObat.includes(value))
    {
      this.selectedItemObat.push(value);
      this.formAlergiObat.get('metodePengobatan')?.setValue(this.selectedItemObat);
    }
  }
  onSelectItemObat(item: any) {
    this.formAlergiMakanan.get('metodePengobatan')?.setValue(this.selectedItemObat);
  }
  // malnutrisi item
  onSelectItemInterprestasi(item: any) {
    this.formMalnitrisi.get('items.tingkatInterprestasiMalNutrisi')?.setValue(item);
  }
  // Fungsi untuk menentukan apakah item sedang "ter-select"
  isSelected(item: any): boolean {
    const selectedItem = this.formMalnitrisi.get('items.tingkatInterprestasiMalNutrisi')?.value;
    return selectedItem && selectedItem.terminology_code === item.terminology_code;
  }

  // Makanan
  onFocusAlergiMakanan() {
    this.showOptionsAlergiMakanan = true;
  }

  onBlurAlergiMakanan() {
    setTimeout(() => {
      this.showOptionsAlergiMakanan = false;
    }, 200); // Delay untuk memungkinkan klik pada opsi
  }


  onSelectItem(item: any) {
    if (!this.selectedItemMakanans.includes(item))
    {
      this.selectedItemMakanans.push(item);
      this.formAlergiMakanan.get('namaMakanan')?.setValue(this.selectedItemMakanans);
      this.pilihMakanan = '';
    }
  }

  onRemoveItem(item: any) {
    const index = this.selectedItemMakanans.indexOf(item);
    if (index !== -1)
    {
      this.selectedItemMakanans.splice(index, 1);
      this.formAlergiMakanan.get('namaMakanan')?.setValue(this.selectedItemMakanans);
    }
  }
  convertToSlug(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_');
  }
  async doSubmitAlergiObat() {
    let formObat = this.formAlergiObat.value;
    let StagementKagegori = this.listItemObats[0];
    let metodePengobatanName = this.formAlergiObat.value.metodePengobatan?.terminology_name || "gizi_milk_allergy";
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        medicationStatements: [
          {
            name: metodePengobatanName || "gizi_milk_allergy",
            category: {
              system: "http://terminology.hl7.org/CodeSystem/medication-statement-category",
              code: StagementKagegori.terminology_code,
              display: StagementKagegori.terminology_name
            },
            status: this.formAlergiObat.value.statusClinical?.status || "completed",
            medicationCodeableConcept: {
              system: "http://sys-ids.kemkes.go.id/kfa",
              code: formObat.metodePengobatan.terminology_code,
              display: formObat.metodePengobatan.terminology_name
            },
            dateAsserted: this.dateNow,
            effectiveDateTime: "2023-01-23T18:00:00+00:00"
          }
        ]
      }
    };
    try
    {
      let response: any = await this.GiziService.createAlergyObat(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }

  isOptionSelected(answer: any[], optionValue: any): boolean {
    if (!answer) return false;
    const parsedOption = JSON.parse(optionValue);
    return answer.some((ans: any) => JSON.stringify(ans) === JSON.stringify(parsedOption));
  }


  async doSubmitSkriningMalnutrisiQuestionaire() {
    const ItemTerjawab = this.listQuestionaireMalNutrisi;
    // TODO: bangun payload
    const questionaireResponse = [
      {
        name: "questions_resiko_malnutrisi_<=18",
        status: "completed",
        authored: this.dateNow,
        item: ItemTerjawab.map((question) => {
          let parsedAnswer = [];

          if (question.type === "Reference")
          {
            parsedAnswer = question.options.map((option) => JSON.parse(option.option_value));
          } else if (question.answer)
          {
            parsedAnswer = [JSON.parse(question.answer)];
          }

          return {
            linkId: question.link_id,
            text: question.text,
            answer: parsedAnswer,
          };
        }),
      },
    ];

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        questionnaireResponses: questionaireResponse
      }
    };

    try
    {
      let response: any = await this.GiziService.createSkriningMalnutrisiQuestionaire(payload);
    } catch (err)
    {
    }

  }
  async doSubmitSkriningMalnutrisi() {
    let formMalnutrisi = this.formMalnitrisi.value;
    const obeserveName = this.umurPasien > 18 ? "resiko_malnutrisi_>=18" : "resiko_malnutrisi_<18";
    const terminologiCode = this.itemTerminologiKategoriMalnutrisi[0];
    const paylaod = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observations: [
          {
            name: obeserveName,
            category: {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam"
            },
            data: [
              {
                code: {
                  system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                  code: terminologiCode.terminology_code,
                  displa: terminologiCode.terminology_name
                },
                valueString: "",
                result: {
                  value: formMalnutrisi.nilaiSkorMalnutrisi,
                  unit: "{score}",
                  system: "http://unitsofmeasure.org",
                  code: "{score}"
                },
                resultBoolean: {},
                valueCodeableConcept: {}
              }
            ],
            interpretation: {
              system: formMalnutrisi.items.tingkatInterprestasiMalNutrisi.source.source_url,
              code: formMalnutrisi.items.tingkatInterprestasiMalNutrisi.terminology_code,
              display: formMalnutrisi.items.tingkatInterprestasiMalNutrisi.terminology_name
            },
            effectiveDateTime: "2024-04-24T00:23:30+00:00",
            issued: this.dateNow
          }
        ]
      }
    }

    try
    {
      let response: any = await this.GiziService.createObservations(paylaod);
    } catch (err)
    {
    }
  }

  async doSubmitHasilPemeriksaanFisik() {
    // itemPayload
    const itemPayloadTingkatKesadaran = this.itemTerminologiTingkatKesadaran[0];
    const itemPayloadSistolikTandaVital = this.itemTerminologiTandaVitalSistolik[0];
    const itemPayloadDiastolikTandaVital = this.itemTerminologiTandaVitalDiastolik[0];
    const itemBodyTemprature = this.itemTerminologiTandaVitalBodyTemprature[0];
    const itemHeartRate = this.itemTerminologiTandaVitalHeartRate[0];
    const itemRespiratoryRate = this.itemTerminologiTandaVitalRespiratory[0];
    const itemEyeNarrative = this.itemTerminologiEyeNarrative[0];
    const itemFindingOfLip = this.itemTerminologiFindingOfLip[0];

    const formPemeriksaan = this.formPemeriksaanFisik.value;
    // Dinamic input
    const tingkatKesadaranInput = formPemeriksaan.tingkatResponseKesadaran;
    const tdSistolikInput = formPemeriksaan.tdSistolik;
    const tdDiastolikInput = formPemeriksaan.tdDiastolik;
    const BodyTempratureInput = formPemeriksaan.suhuTubuh;
    const heartRateInput = formPemeriksaan.denyutJantung;
    const respiratoryRateInput = formPemeriksaan.pernapasan;
    const kondisiMataInput = formPemeriksaan.kondisiMata;
    const kondisiBibirInput = formPemeriksaan.kondisiBibir;

    const tingkatKesadaranPayload = [
      {
        "name": "responsiveness",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "exam",
          "display": "Exam"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemPayloadTingkatKesadaran.terminology_code,
              "display": itemPayloadTingkatKesadaran.terminology_name
            },
            "result": {},
            "resultBoolean": {},
            "valueCodeableConcept": {
              "system": "http://snomed.info/sct",
              "code": tingkatKesadaranInput.terminology_code,
              "display": tingkatKesadaranInput.terminology_name
            }
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      }
    ];
    const tandaVitalPayload = [
      {
        "name": "systolic",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemPayloadSistolikTandaVital.terminology_code,
              "display": itemPayloadSistolikTandaVital.terminology_name
            },
            "result": {
              "value": tdSistolikInput.nilaiSistolik,
              "unit": tdSistolikInput.objectSatuanSistolik.unit_code,
              "system": tdSistolikInput.objectSatuanSistolik.unit_system,
              "code": tdSistolikInput.objectSatuanSistolik.unit_code
            },
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      },
      {
        "name": "diastolic",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemPayloadDiastolikTandaVital.terminology_code,
              "display": itemPayloadDiastolikTandaVital.terminology_name
            },
            "result": {
              "value": tdDiastolikInput.nilaiDiastolik,
              "unit": tdDiastolikInput.objectSatuanDiastolik.unit_code,
              "system": tdDiastolikInput.objectSatuanDiastolik.unit_system,
              "code": tdDiastolikInput.objectSatuanDiastolik.unit_code
            },
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      },
      {
        "name": "body_temperature",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemBodyTemprature.terminology_code,
              "display": itemBodyTemprature.terminology_name
            },
            "result": {
              "value": BodyTempratureInput.nilaiSuhu,
              "unit": BodyTempratureInput.objectSatuanSuhu.unit_code,
              "system": BodyTempratureInput.objectSatuanSuhu.unit_system,
              "code": BodyTempratureInput.objectSatuanSuhu.unit_code
            },
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      },
      {
        "name": "heart_rate",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemHeartRate.terminology_code,
              "display": itemHeartRate.terminology_name
            },
            "result": {
              "value": heartRateInput.nilaiDenyut,
              "unit": heartRateInput.objectSatuanDenyut.unit_code,
              "system": heartRateInput.objectSatuanDenyut.unit_system,
              "code": heartRateInput.objectSatuanDenyut.unit_code
            },
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      },
      {
        "name": "respiratory_rate",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemRespiratoryRate.terminology_code,
              "display": itemRespiratoryRate.terminology_name
            },
            "result": {
              "value": respiratoryRateInput.nilaiPernapasan,
              "unit": respiratoryRateInput.objectSatuanPernapasan.unit_code,
              "system": respiratoryRateInput.objectSatuanPernapasan.unit_system,
              "code": respiratoryRateInput.objectSatuanPernapasan.unit_code
            },
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      },
    ];
    const headToToePayload = [
      {
        "name": "eye_narrative",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "exam",
          "display": "Exam"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemEyeNarrative.terminology_code,
              "display": itemEyeNarrative.terminology_name
            },
            "valueString": kondisiMataInput,
            "result": {},
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": this.dateNow
      },
      {
        "name": "lip",
        "category": {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        },
        "data": [
          {
            "code": {
              "system": "http://loinc.org",
              "code": itemFindingOfLip.terminology_code,
              "display": itemFindingOfLip.terminology_name
            },
            "valueString": kondisiBibirInput,
            "result": {},
            "resultBoolean": {},
            "valueCodeableConcept": {}
          }
        ],
        "effectiveDateTime": "2024-04-24T00:23:30+00:00",
        "issued": "2024-04-24T00:23:30+00:00"
      }
    ];
    const margingItems = [
      ...tingkatKesadaranPayload,
      ...tandaVitalPayload,
      ...headToToePayload
    ];
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observations: margingItems
      }
    };
    try
    {
      let response: any = await this.GiziService.createObservations(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }

  async doSubmitAntropometriObservation() {
    const observations = this.itemsTerminologiAntropometriOservarion.map(item => ({
      name: item.terminology_name + "_observation",
      status: "final",
      category: {
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: item.category,
        display: item.category
      },
      data: [
        {
          code: {
            system: item.source.source_url,
            code: item.terminology_code,
            display: item.terminology_name
          },
          valueString: "",
          result: {
            value: item.value,
            unit: item.unit,
            system: "http://unitsofmeasure.org",
            code: item.unit
          },
          resultBoolean: {},
          valueCodeableConcept: {}
        }
      ],
      interpretation: {},
      effectiveDateTime: this.dateNow,
      issued: this.dateNow
    }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observations: observations
      }
    };

    try
    {
      let response: any = await this.GiziService.createObservations(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }
  async doSubmitAntropometriBalitaObservation() {
    const observations = this.itemsTerminologiAntropometriBalitaOservarion.map(item => ({
      name: item.terminology_name + "_observation",
      status: "final",
      category: {
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: item.category,
        display: item.category
      },
      data: [
        {
          code: {
            system: item.source.source_url,
            code: item.terminology_code,
            display: item.terminology_name
          },
          valueString: "",
          result: {
            value: item.value,
            unit: item.unit,
            system: "http://unitsofmeasure.org",
            code: item.unit
          },
          resultBoolean: {},
          valueCodeableConcept: {}
        }
      ],
      interpretation: {},
      effectiveDateTime: this.dateNow,
      issued: this.dateNow
    }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observations: observations
      }
    };


    try
    {
      let response: any = await this.GiziService.createObservations(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }
  async doSubmitRencanaTindakLanjutServiceRequest() {

    console.log("TEST");
    // TODO: buat payload

    // try
    // {
    //   let response: any = await this.GiziService.createObservations(payload);
    // } catch (err)
    // {
    //   Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    // }
  }
  async doSubmitRujukLaborat() {

    console.log("Form Rujuk Laborat");
    // TODO: buat payload

    // try
    // {
    //   let response: any = await this.GiziService.createObservations(payload);
    // } catch (err)
    // {
    //   Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    // }
  }
  async doSubmitAntropometriIbuHamilObservation() {
    const observations = this.itemsTerminologiAntropometriIbuHamilOservarion.map(item => ({
      name: item.terminology_name + "_observation",
      status: "final",
      category: {
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: item.category,
        display: item.category
      },
      data: [
        {
          code: {
            system: item.source.source_url,
            code: item.terminology_code,
            display: item.terminology_name
          },
          valueString: "",
          result: {
            value: item.value,
            unit: item.unit,
            system: "http://unitsofmeasure.org",
            code: item.unit
          },
          resultBoolean: {},
          valueCodeableConcept: {}
        }
      ],
      interpretation: {},
      effectiveDateTime: this.dateNow,
      issued: this.dateNow
    }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observations: observations
      }
    };

    try
    {
      let response: any = await this.GiziService.createObservations(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }
  async doSubmitAntropometriIndexhObservation() {
    const observations = this.itemsTerminologiAntropometriIndexOservarion.map(item => ({
      name: item.terminology_name + "_observation",
      status: "final",
      category: {
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: item.category,
        display: item.category
      },
      data: [
        {
          code: {
            system: item.source.source_url,
            code: item.terminology_code,
            display: item.terminology_name
          },
          valueString: "",
          result: {
            value: item.value,
            unit: item.unit,
            system: "http://unitsofmeasure.org",
            code: item.unit
          },
          resultBoolean: {},
          valueCodeableConcept: {}
        }
      ],
      interpretation: {},
      effectiveDateTime: this.dateNow,
      issued: this.dateNow
    }));

    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        observations: observations
      }
    };

    try
    {
      let response: any = await this.GiziService.createObservations(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }




  async doSubmitAlergiMakanan() {
    // Ambil data dari form
    const formData = this.formAlergiMakanan.value;
    const selectedItemMakanans = formData.namaMakanan;
    const clinicalStatus = formData.statusClinical.status;

    // Pastikan `selectedItemMakanans` tidak kosong
    if (!selectedItemMakanans || selectedItemMakanans.length === 0)
    {
      console.error("Tidak ada item makanan yang dipilih.");
      return;
    }

    // Konversi status klinis ke format yang sesuai
    const clinicalStatusMapping = {
      Active: { system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical", code: "active", display: "Active" },
      Inactive: { system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical", code: "inactive", display: "Inactive" },
      Resolved: { system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical", code: "resolved", display: "Resolved" }
    };

    const mappedClinicalStatus = clinicalStatusMapping[clinicalStatus];

    // Siapkan data untuk `dataAlergi`
    const dataAlergi = selectedItemMakanans.map((item: any) => ({
      name: `gizi_${item.terminology_name.toLowerCase().replace(/ /g, "_")}_allergy`,
      category: ["food"],
      clinicalStatus: mappedClinicalStatus,
      recordedDate: this.dateNow,
      data: [
        {
          system: "http://snomed.info/sct",
          code: item.terminology_code,
          display: item.terminology_name
        }
      ]
    }));

    // Buat payload akhir
    const payload = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        allergyIntolerances: dataAlergi
      }
    };

    try
    {
      let response: any = await this.GiziService.createAlergyInteolerance(payload);
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    }
  }
  async cariListItemMakanan() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "like|=",
      key_value: `Substance|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc"
    };

    try
    {
      let dataListManakan: any = await this.GiziService.getDataTerminologi(payload);
      this.listItemMakananAlergi = [...dataListManakan.data];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariItemsQuestionerMalnutrisi() {
    let payload = {
      "key_name": "category",
      "key_operator": "=",
      "key_value": "nutrition-status",
      "max_row": 50,
      "order_by": "id",
      "order_type": "Asc"
    };

    try
    {
      let itemListResponse: any = await this.GiziService.getDataQuestionaire(payload);
      this.listQuestionaireMalNutrisi = [...itemListResponse.data];

    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariListItemObat() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "like|=",
      key_value: `medication-statement|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc"
    };

    try
    {
      let dataListManakan: any = await this.GiziService.getDataTerminologi(payload);
      this.listItemObats = [...dataListManakan.data];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiTingkatKesadaran() {
    let payload = {
      terminology_id: 199,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiTingkatKesadaran = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiTandaVitalSistolik() {
    let payload = {
      terminology_id: 172,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiTandaVitalSistolik = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiTandaVitalDistolik() {
    let payload = {
      terminology_id: 209,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiTandaVitalDiastolik = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiTandaVitalbodytemprature() {
    let payload = {
      terminology_id: 170,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiTandaVitalBodyTemprature = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiTandaVitalHeartRate() {
    let payload = {
      terminology_id: 170,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiTandaVitalHeartRate = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiTandaVitalRespiratoryRate() {
    let payload = {
      terminology_id: 173,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiTandaVitalRespiratory = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiKategoriMalnutrisi() {
    let payload = {
      terminology_id: 252,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiKategoriMalnutrisi = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariitemsTerminologiAntropometriOservarion() {
    let payload = {
      terminology_id: "",
      key_operator: "=",
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
      key_name: "satusehat_category",
      key_value: "data-antropometri",
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemsTerminologiAntropometriOservarion = itemResponse.data;
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariitemsTerminologiCholesterolObservationServiceRequest() {
    let payload = {
      terminology_id: "",
      key_operator: "=",
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
      key_name: "category",
      key_value: "cholesterol-observation",
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemsTerminologiCholesterolObservationServiceRequest = itemResponse.data;
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariitemsTerminologiAntropometriBayiOservarion() {
    let payload = {
      terminology_id: "",
      key_operator: "=",
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
      key_name: "satusehat_category",
      key_value: "data-antropometri-bayi",
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemsTerminologiAntropometriBalitaOservarion = itemResponse.data;
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariitemsTerminologiAntropometriIbuHamilOservarion() {
    let payload = {
      terminology_id: "",
      key_operator: "=",
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
      key_name: "satusehat_category",
      key_value: "data-antropometri-hamil",
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemsTerminologiAntropometriIbuHamilOservarion = itemResponse.data;
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariitemsTerminologiAntropometriIndexOservarion() {
    // TODO: change key value
    let payload = {
      terminology_id: "",
      key_operator: "=",
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
      key_name: "satusehat_category",
      key_value: "data-antropometri-index",
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemsTerminologiAntropometriIndexOservarion = itemResponse.data;
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariitemsTerminologiRencanaTindakLanjutServiceRequest() {
    // TODO: change key value
    let payload = {
      terminology_id: "",
      key_operator: "=",
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc",
      key_name: "category",
      key_value: "service-request",
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemsTerminologiRencanaTindakLanjutServiceRequest = itemResponse.data;

    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiEyeNarative() {
    let payload = {
      terminology_id: 250,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiEyeNarrative = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariTerminologiFindingOfLip() {
    let payload = {
      terminology_id: 251,
    };
    try
    {
      let itemResponse: any = await this.GiziService.getDataTerminologi(payload);
      this.itemTerminologiFindingOfLip = [itemResponse.data[0]];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  async cariMetodePengobatan() {
    let payload = {
      terminology_id: "",
      key_name: `category|is_active`,
      key_operator: "like|=",
      key_value: `medication|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc"
    };

    try
    {
      let ListItemDariPencarian: any = await this.GiziService.getDataTerminologi(payload);
      this.listMedicationMethods = [...ListItemDariPencarian.data];
    } catch (error)
    {
    }
  }
  async getSatuanUnit() {
    let payload = {
      "unit_code": "",
      "key_name": "unit_name",
      "key_operator": "like",
      "key_value": "",
      "max_row": 50,
      "order_by": "unit_code",
      "order_type": "Asc"
    };

    try
    {
      let listSatuanUnitGet: any = await this.GiziService.getDataSatuanUnit(payload);
      this.listSatuanUnit = [...listSatuanUnitGet.data];
    } catch (error)
    {
    }
  }

  async getTingkatResponseKesadaran() {


    let payload = {
      terminology_id: "",
      key_name: `satusehat_category`,
      key_operator: "=",
      key_value: `tingkat-kesadaran`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc"
    };

    try
    {
      let listTingkatKesadaranGet: any = await this.GiziService.getDataTerminologi(payload);
      this.listTingkatKesadaran = [...listTingkatKesadaranGet.data];
    } catch (error)
    {
    }
  }

  async getTingkatInterprestasi() {
    let payload = {
      terminology_id: "",
      key_name: `satusehat_category`,
      key_operator: "like",
      key_value: `interpretasi`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 100,
      order_by: "terminology_name",
      order_type: "Asc"
    };

    try
    {
      let responseData: any = await this.GiziService.getDataTerminologi(payload);
      this.listTingkatInterprestasi = [...responseData.data];
    } catch (error)
    {
    }
  }



  async docreateKunjunganGizi() {
    this.showLoading()
    this.patientData = await this.getPasien()
    this.cabangData = await this.getCabang()
    await this.setIdPasien()

    let response: any = await this.GiziService.createKunjunganGizi({
      data: {
        rmno: this.notransaksi,
        orgId: this.cabangData.kodeorg,
        patientId: this.idpasien,
        patientName: this.patientData.pasien,
        practitionerId: this.patientData.idhis,
        practitionerName: this.patientData.namdokter,
        locationId: this.patientData.locationid,
        satusehatId: this.patientData.idsatusehat,
        locationName: this.cabangData.nama
      }
    })
    this.useCaseId = response.data.use_case_id
    this.encounter_id = response.data.encounter_id
  }
  async doSubmitRelatedPerson() {
    var data = {
      data: {
        rmno: this.notransaksi,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        related_person: {
          ...this.formIbuAyah.value
        }
      }
    };
    let response: any = await this.GiziService.createRelatedPersonGIZI(data);
    let msg = response.statusMsg.split(': ');

    this.relatedPersonResponse = response;
  }
  async doSubmitkeluhanUtama() {
    const conditions = [
      {
        name: this.formKeluhanUtama.value.nama_keluhan || "gizi-nausea_vomiting",
        category: {
          system: "http://terminology.hl7.org/CodeSystem/condition-category",
          code: "problem-list-item",
          display: "Problem List Item"
        },
        clinicalStatus: {
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          code: this.formKeluhanUtama.value.status_klinis || "active",
          display: this.formKeluhanUtama.value.status_klinis_display || "Active"
        },
        recordedDate: this.formKeluhanUtama.value.tanggal_pencatatan || this.dateNow,
        data: [
          {
            system: "http://snomed.info/sct",
            code: this.formKeluhanUtama.value.kode_keluhan || "16932000",
            display: this.formKeluhanUtama.value.nama_keluhan || "Nausea and vomiting"
          }
        ]
      }
    ];

    // Periksa apakah tuberculosis diisi, jika ya, tambahkan ke conditions
    if (this.formKeluhanUtama.value.tuberculosis)
    {
      conditions.push({
        name: "gizi-tuberculosis",
        category: {
          system: "http://terminology.hl7.org/CodeSystem/condition-category",
          code: "problem-list-item",
          display: "Problem List Item"
        },
        clinicalStatus: {
          system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
          code: "active",
          display: "Active"
        },
        recordedDate: this.dateNow,
        onsetPeriod: {
          start: this.formKeluhanUtama.value.diagnosa_awal,
          end: this.formKeluhanUtama.value.diagnosa_akhir
        },
        data: [
          {
            system: "http://snomed.info/sct",
            code: "161414005",
            display: "H/O: tuberculosis"
          }
        ],
        note: `Riwayat tuberkulosis pada pasien ${this.patientData.patientName || 'Unknown'}`
      } as any);
    }

    // Buat payload data
    const data = {
      data: {
        encounterId: this.encounter_id,
        useCaseId: this.useCaseId,
        satusehatId: this.patientData.idsatusehat,
        conditions: conditions
      }
    };
    try
    {
      this.showLoading();
      let response: any = await this.GiziService.createKeluhanUtama(data);
      let msg = response.statusMsg.split(': ');
    } catch (err)
    {
      Swal.fire('Error', 'Terjadi kesalahan saat mengirim data', 'error');
    } finally
    {
      this.stopLoading();
    }
  }

  // NOTE: on page reload
  ngOnInit() {
    this.docreateKunjunganGizi(),
      this.cariKeluhanUtama(),
      this.cariListItemMakanan(),
      this.cariListItemObat(),
      this.cariMetodePengobatan(),
      this.getTingkatResponseKesadaran(),
      this.getSatuanUnit(),
      this.cariTerminologiTingkatKesadaran(),
      this.cariTerminologiTandaVitalSistolik(),
      this.cariTerminologiTandaVitalDistolik(),
      this.cariTerminologiTandaVitalbodytemprature(),
      this.cariTerminologiTandaVitalHeartRate(),
      this.cariTerminologiTandaVitalRespiratoryRate(),
      this.cariTerminologiEyeNarative(),
      this.cariTerminologiFindingOfLip(),
      this.cariTerminologiKategoriMalnutrisi(),
      this.getTingkatInterprestasi(),
      this.cariItemsQuestionerMalnutrisi(),
      this.cariitemsTerminologiAntropometriOservarion(),
      this.cariitemsTerminologiAntropometriBayiOservarion(),
      this.cariitemsTerminologiAntropometriIbuHamilOservarion(),
      this.cariitemsTerminologiAntropometriIndexOservarion(),
      this.cariitemsTerminologiRencanaTindakLanjutServiceRequest(),
      this.cariitemsTerminologiCholesterolObservationServiceRequest()
  }

  async cariKeluhanUtama() {
    let payload = {
      terminology_id: "",
      key_name: `${this.searchKeluhanUtama}|is_active`,
      key_operator: "like|=",
      key_value: `Problem List Item|1`,
      show_parent: "yes",
      show_child: "yes",
      max_row: 5,
      order_by: "terminology_name",
      order_type: "Asc"
    };

    try
    {
      let keluhanData: any = await this.GiziService.getDataTerminologi(payload);
      this.listKeluhanUtama = [...keluhanData.data];
    } catch (error)
    {
      console.error('Error fetching data:', error);
    }
  }
  showLoading() {
    Swal.fire('Mohon tunggu!')
    Swal.showLoading()
    this.stopLoading(3000)
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => { Swal.close() }, timing)
  }

  // NOTE: Trigger simpan semua form
  simpan() {
    this.showLoading(),
      this.doSubmitRelatedPerson(),
      this.doSubmitkeluhanUtama(),
      this.doSubmitAlergiMakanan(),
      this.doSubmitAlergiObat(),
      this.doSubmitHasilPemeriksaanFisik(),
      this.doSubmitSkriningMalnutrisi(),
      this.doSubmitSkriningMalnutrisiQuestionaire(),
      this.doSubmitAntropometriObservation(),
      this.doSubmitAntropometriBalitaObservation(),
      this.doSubmitRencanaTindakLanjutServiceRequest(),
      this.doSubmitRujukLaborat()
  }




  async setIdPasien() {
    if (!this.patientData.idpasien)
    {
      let idpasien = await this.getPasienSatuSehat()
      if (!idpasien)
      {
        Swal.fire('Data Pasien Tidak ditemukan di SatuSehat')
      } else
      {
        this.idpasien = idpasien
        this.isDisabledFormGizi = false
      }
    } else
    {
      this.idpasien = this.patientData.idpasien
      this.isDisabledFormGizi = false
    }

    return this.idpasien
  }
  getPasien() {
    return new Promise((resolve) => {
      this.api.datapasien(this.userData.kdcabang, this.notransaksi)
        .subscribe((data) => {
          data.forEach(e => {
            resolve(e)
          })
        })
    })
  }

  getPasienSatuSehat() {
    return new Promise((resolve) => {
      this.api.getpasien(
        this.patientData.nopengenal,
        this.headers
      ).subscribe((data) => {
        if (data.entry.length !== 0)
        {
          resolve(data.entry[0].resource.id)
        }
      })
    })
  }

  getCabang() {
    return new Promise((resolve) => {
      this.api.cabangper(this.userData.kdklinik)
        .subscribe((data) => {
          data.forEach(e => {
            resolve(e)
          })
        })
    })
  }

  removeNullValues(obj: Object) {
    if (typeof obj !== 'object' || obj === null) return obj; // Jika bukan object, kembalikan nilai asli

    // Iterasi pada setiap properti
    for (const key in obj)
    {
      if (obj[key] === null)
      {
        delete obj[key]; // Hapus properti jika nilainya null
      } else if (typeof obj[key] === 'object')
      {
        obj[key] = this.removeNullValues(obj[key]); // Rekursif untuk objek bersarang
      }
    }

    return obj;
  }
}
