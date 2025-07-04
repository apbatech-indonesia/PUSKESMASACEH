import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ApiserviceService } from "../../../apiservice.service";
import { ActivatedRoute } from "@angular/router";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { GigiService } from "../services/satusehat-gigi.service";
import {
  RelatedPerson,
  RelatedPersonRequest,
} from "../data/models/related-person.model";
import { AncService } from "../../satusehat-anc/services/anc.service";
import {
  Condition,
  Category,
  ConditionRequestData,
} from "../data/models/condition-create.model";
import {
  Observation,
  Codeable,
  ObservationRequestData,
  Result,
  Interpretation,
  BodySite,
} from "../data/models/observation-create.model";
import {
  AllergyIntolerance,
  AllergyIntoleranceRequestData,
} from "../data/models/riwayat-alergi.model";
import {
  Procedure,
  ProcedureRequestData,
} from "../data/models/procedure.model";
import {
  Coding,
  Encounter,
  ServiceRequest,
  ServiceRequestDataItem,
  ServiceRequestDataPayload,
} from "../data/models/service-request.model";
import {
  Specimen,
  SpecimenRequestData,
} from "../data/models/specimen-request.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tulis-satusehat-gigi",
  templateUrl: "./tulis-satusehat-gigi.component.html",
  styleUrls: ["./tulis-satusehat-gigi.component.sass"],
})
export class TulisSatuSehatGigiComponent implements OnInit {
  // NOTE: property dasar
  userData: any = JSON.parse(localStorage.getItem("userDatacl")).userData;
  notransaksi: string = this.route.snapshot.paramMap.get("notrans");
  encounter_id: string;
  useCaseId: number;
  cabangData: any;
  idpasien: any;
  dateNow = new Date().toISOString();
  faArrowLeft = faArrowLeft;
  faSave = faSave;

  isDisabledFormGizi: boolean = true;
  headers = new HttpHeaders({
    "kd-cabang": this.userData.kdcabang,
  });
  data: any;
  DELAY = 10;

  patientData: any = {};
  isDisabledForm: boolean;
  isLoading: boolean = false;
  relatedPerson: RelatedPerson = {} as RelatedPerson;
  relatedPersonRequest: RelatedPersonRequest = {} as RelatedPersonRequest;

  keluhanUtama: any;
  riwayatPenyakit: any;
  golonganDarah: any;
  riwayatAlergi: string;
  rhesus: string;
  statusKehamilan: any;

  sistole: number;
  diastole: number;
  bodyTemperature: number;
  respiratoryRate: number;
  heartRate: any;
  skorTotalOHIS: number;
  debrisIndeks: any;
  kalkulusIndeks: any;
  skorTotalKalkulusIndeks: any;
  kondisiGigi: string;
  pemeriksaanOdontogram: string = "";

  daftarBagianGigi = [
    { code: "422653006", display: "Permanent maxillary right central incisor" },
    { code: "422654007", display: "Permanent maxillary left central incisor" },
    {
      code: "422655008",
      display: "Permanent mandibular right central incisor",
    },
    { code: "422656009", display: "Permanent mandibular left central incisor" },
  ];
  statusPuasa: string = "";
  procedureFastingCode: string;
  procedureFastingDisplay: string;
  procedureFastingNote: string;
  serviceRequestName: any;
  specimenName: any;
  mcvValue: number;
  hemoglobinValue: number;
  diagnosaCode: any;
  diagnosaDisplay: any;
  encounterProcedureDisplay: any;
  encounterProcedureCode: any;
  encounterDiagnosisCode: any;
  encounterDiagnosisDisplay: any;
  encounterProcedureNote: any;
  tindakLanjutText: string;
  tindakLanjutPatientInstrruction: string;
  conditionStable: any;
  patientInstruction: string;

  constructor(
    private api: ApiserviceService,
    private GigiService: GigiService,
    private ancService: AncService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  // NOTE: on page reload
  ngOnInit() {
    this.docreateKunjungan();
    // this.initData();
  }

  initData() {
    this.relatedPerson = {
      nama_ibu: "1",
      nik_ibu: "1",
      tl_ibu: "1996-06-02",
      hp_ibu: "082111117625",
      kota_ibu: "Jakarta",
      alamat_jalan_ibu: "1",
      postal_code_ibu: "1",
      province_id_ibu: "32",
      city_id_ibu: "3271",
      district_id_ibu: "327104",
      village_id_ibu: "3271041009",
      rt_ibu: "1",
      rw_ibu: "1",
      nama_ayah: "1",
      nik_ayah: "1",
      tl_ayah: "1995-06-12",
      hp_ayah: "082111111123",
      kota_ayah: "Jakarta",
      alamat_jalan_ayah: "1",
      postal_code_ayah: "1",
      province_id_ayah: "32",
      city_id_ayah: "3271",
      district_id_ayah: "327104",
      village_id_ayah: "3271041009",
      rt_ayah: "1",
      rw_ayah: "1",
    };
  }

  doSubmitRelatedPerson() {
    this.showLoading();
    this.relatedPersonRequest = {
      data: {
        encounterId: this.encounter_id,
        satusehatId: this.patientData.idsatusehat,
        useCaseId: this.useCaseId,
        rmno: this.notransaksi,
        related_person: this.relatedPerson,
      },
    };

    let tasksList = [];
    tasksList.push(() =>
      this.GigiService.createRelatedPerson(this.relatedPersonRequest)
    );
    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        this.toast.error("Terjadi kesalahan: " + error.message);
      });
  }

  async doSubmitAnamnesis() {
    let tasksList = [];
    this.showLoading();

    if (this.keluhanUtama) {
      tasksList.push(() =>
        this.doSubmitCondition(
          "bleeding_gums",
          "86276007",
          this.keluhanUtama,
          "problem-list-item",
          "Problem List Item"
        )
      );
    }
    if (this.golonganDarah) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "golongan_darah",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "laboratory",
            "Laboratory"
          ),
          code: new Codeable(
            "http://loinc.org",
            "883-9",
            "ABO group [Type] in Blood"
          ),
          valueCodeableConcept: new Codeable(
            "http://loinc.org",
            "LA19710-5",
            this.golonganDarah
          ),
        })
      );
    }

    if (this.rhesus) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "rhesus",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "laboratory",
            "Laboratory"
          ),
          code: new Codeable(
            "http://loinc.org",
            "10331-7",
            "Rh [Type] in Blood"
          ),
          valueCodeableConcept: new Codeable(
            "http://loinc.org",
            "LA6576-8",
            this.rhesus
          ),
        })
      );
    }

    if (this.riwayatAlergi) {
      tasksList.push(() =>
        this.doSubmitRiwayatAlergi("riwayat_alergi", this.riwayatAlergi)
      );
    }

    if (this.riwayatPenyakit) {
      tasksList.push(() =>
        this.doSubmitCondition(
          "riwayat_penyakit",
          "472969004",
          this.riwayatPenyakit,
          "problem-list-item",
          "Problem List Item"
        )
      );
    }

    if (this.statusKehamilan) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pregnancy_status",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "survey",
            "Survey"
          ),
          code: new Codeable("http://loinc.org", "82810-3", "Pregnancy status"),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "60001007",
            this.statusKehamilan
          ),
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        this.toast.error("Terjadi kesalahan: " + error.message);
      });
  }

  async doSubmitPemeriksaanFisik() {
    let tasksList = [];
    this.showLoading();

    if (this.sistole) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "systolic",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable(
            "http://loinc.org",
            "8480-6",
            "Systolic blood pressure"
          ),
          result: new Result(
            this.sistole,
            "mm[Hg]",
            "http://unitsofmeasure.org",
            "mm[Hg]"
          ),
        })
      );
    }

    if (this.diastole) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "diastolic",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "survey",
            "Survey"
          ),
          code: new Codeable(
            "http://loinc.org",
            "8462-4",
            "Diastolic blood pressure"
          ),
          result: new Result(
            this.diastole,
            "mm[Hg]",
            "http://unitsofmeasure.org",
            "mm[Hg]"
          ),
        })
      );
    }

    if (this.heartRate) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "heart_rate",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "survey",
            "Survey"
          ),
          code: new Codeable("http://loinc.org", "8867-4", "Heart rate"),
          result: new Result(
            this.heartRate,
            "beats/minute",
            "http://unitsofmeasure.org",
            "/min"
          ),
        })
      );
    }

    if (this.bodyTemperature) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "body_temperature",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "survey",
            "Survey"
          ),
          code: new Codeable("http://loinc.org", "8310-5", "Body temperature"),
          result: new Result(
            this.bodyTemperature,
            "C",
            "http://unitsofmeasure.org",
            "Cel"
          ),
        })
      );
    }

    if (this.respiratoryRate) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "respiratory_rate",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "survey",
            "Survey"
          ),
          code: new Codeable("http://loinc.org", "9279-1", "Respiratory rate"),
          result: new Result(
            this.respiratoryRate,
            "breaths/minute",
            "http://unitsofmeasure.org",
            "/min"
          ),
        })
      );
    }

    if (this.debrisIndeks) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "debris_indeks",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OC000062",
            "Debris Indeks"
          ),
          valueCodeableConcept: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OV000097",
            "Terdapat debris pada 1/3 permukaan servikal gigi atau dijumpai stain ekstrinsik"
          ),
          valueInteger: this.debrisIndeks,
        })
      );
    }

    if (this.kalkulusIndeks) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "kalkulus_indeks",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OC000063",
            "Kalkulus Indeks"
          ),
          valueCodeableConcept: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OV000100",
            "Terdapat kalkulus supragingiva pada 1/3 permukaan servikal gigi tanpa kalkulus subgingiva"
          ),
          valueInteger: this.kalkulusIndeks,
        })
      );
    }

    if (this.skorTotalKalkulusIndeks) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "skor_total_kalkulus_indeks",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OC000057",
            "Skor Total Kalkulus Indeks"
          ),
          result: new Result(
            this.skorTotalKalkulusIndeks,
            "{score}",
            "http://unitsofmeasure.org",
            "{score}"
          ),
        })
      );
    }

    if (this.skorTotalKalkulusIndeks) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "skor_total_kalkulus_indeks",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OC000057",
            "Skor Total Kalkulus Indeks"
          ),
          result: new Result(
            this.skorTotalKalkulusIndeks,
            "{score}",
            "http://unitsofmeasure.org",
            "{score}"
          ),
        })
      );
    }

    if (this.skorTotalOHIS) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "skor_total_OHIS",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OC000058",
            "Skor Total Oral Hygiene Index Simplified (OHIS)"
          ),
          result: new Result(
            this.skorTotalOHIS,
            "{score}",
            "http://unitsofmeasure.org",
            "{score}"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                "OI000031",
                this.kondisiGigi
              ),
            ],
            this.kondisiGigi
          ),
        })
      );
    }

    if (this.pemeriksaanOdontogram) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaan_odontogram",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            "OC000061",
            "Pemeriksaan Odontogram"
          ),
          resultBoolean: this.pemeriksaanOdontogram !== "",
          bodySite: new BodySite([
            new Codeable(
              "http://snomed.info/sct",
              "422653006",
              this.pemeriksaanOdontogram
            ),
          ]),
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengembalikan response dengan error
          const statusCode = error.statusCode;
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan";

          if (statusCode !== "01") {
            this.toast.error("Error " + statusCode + ": " + errorMessage);
          }
        } else {
          // Jika tidak ada response dari server
          this.toast.error("Terjadi kesalahan: " + error.message);
        }

        console.error("Error dalam Promise.all:", error);
      });
  }

  async doSubmitLaborat() {
    let tasksList = [];
    this.showLoading();

    if (
      this.statusPuasa &&
      this.procedureFastingCode &&
      this.procedureFastingDisplay
    ) {
      tasksList.push(() =>
        this.doSubmitProcedure({
          name: "other_endoscopy",
          category: new Codeable(
            "http://snomed.info/sct",
            "103693007",
            "Diagnostic procedure"
          ),
          code: [
            new Codeable("http://snomed.info/sct", "792805006", "Fasting"),
          ],
          reasonCode: new Codeable(
            "http://hl7.org/fhir/sid/icd-10",
            this.procedureFastingCode,
            this.procedureFastingDisplay
          ),
          note: this.statusPuasa,
        })
      );
    }

    if (this.serviceRequestName) {
      tasksList.push(() =>
        this.doSubmitServiceRequest({
          name: "follow_up_visit",
          category: [
            new Coding(
              "http://snomed.info/sct",
              "108252007",
              "Laboratory procedure"
            ),
          ],
          patientInstruction: "",
          status: "active",
          intent: "original-order",
          priority: "routine",
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: "Kunjungan {{Patient_Name}} pada {{recordedDate}}",
          },
          data: [
            new ServiceRequestDataItem({
              system: "http://loinc.org",
              code: "58410-2",
              display: "CBC panel - Blood by Automated count",
            }),
            new ServiceRequestDataItem({
              text: this.serviceRequestName,
            }),
          ],
          reasonCode: [
            {
              text: this.serviceRequestName,
            },
          ],
          note: this.serviceRequestName,
        })
      );
    }

    if (this.specimenName) {
      tasksList.push(() =>
        this.doSubmitSpecimen({
          name: "blood_specimen",
          status: "available",
          type: new Codeable(
            "http://snomed.info/sct",
            "119297000",
            "Blood specimen"
          ),
          collection: {
            method: new Codeable(
              "http://snomed.info/sct",
              "82078001",
              "Collection of blood specimen for laboratory"
            ),
            collectedDateTime: "2025-03-03T08:43:12.464Z",
          },
          receivedTime: "2025-03-03T08:43:12.464Z",
          request: [
            {
              reference: "ServiceRequest/1688a7c0-1026-464e-80a8-8663cf3a9e74",
            },
          ],
        })
      );
    }

    if (this.hemoglobinValue) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "hemoglobin_inblood",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "laboratory",
            "Laboratory"
          ),
          code: new Codeable(
            "http://loinc.org",
            "718-7",
            "Hemoglobin [Mass/volume] in Blood"
          ),
          result: new Result(
            this.hemoglobinValue,
            "g/dL",
            "http://unitsofmeasure.org",
            "g/dL"
          ),
        })
      );
    }

    if (this.mcvValue) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "mcv_count",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "laboratory",
            "Laboratory"
          ),
          code: new Codeable(
            "http://loinc.org",
            "787-2",
            "MCV [Entitic volume] by Automated count"
          ),
          result: new Result(
            this.mcvValue,
            "fL",
            "http://unitsofmeasure.org",
            "fL"
          ),
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengembalikan response dengan error
          const statusCode = error.statusCode;
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan";

          if (statusCode !== "01") {
            this.toast.error("Error " + statusCode + ": " + errorMessage);
          }
        } else {
          // Jika tidak ada response dari server
          this.toast.error("Terjadi kesalahan: " + error.message);
        }

        console.error("Error dalam Promise.all:", error);
      });
  }

  private async doSubmitServiceRequest(data: {
    name: string;
    category: Coding[];
    patientInstruction: string;
    status: string;
    intent: string;
    priority: string;
    encounter: Encounter;
    data: ServiceRequestDataItem[];
    reasonCode: { text: string }[];
    note?: string;
  }) {
    let isoDate = new Date().toISOString();
    let request = new ServiceRequestDataPayload({
      encounterId: this.encounter_id,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat,
      serviceRequests: [
        new ServiceRequest({
          name: data.name,
          category: data.category,
          patientInstruction: data.patientInstruction,
          status: data.status,
          intent: data.intent,
          priority: data.priority,
          occurrenceDateTime: isoDate,
          authoredOn: isoDate,
          encounter: data.encounter,
          data: data.data,
          reasonCode: data.reasonCode,
          note: data.note,
        }),
      ],
    });

    return this.GigiService.createServiceRequest(request);
  }

  async doSubmitEncounterDiagnosa() {
    let tasksList = [];
    this.showLoading();

    if (this.encounterDiagnosisCode && this.encounterDiagnosisDisplay) {
      tasksList.push(() =>
        this.doSubmitCondition(
          "encounter_diagnosis",
          "86276007",
          this.encounterDiagnosisDisplay,
          "encounter-diagnosis",
          "Encounter Diagnosis"
        )
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengembalikan response dengan error
          const statusCode = error.statusCode;
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan";

          if (statusCode !== "01") {
            this.toast.error("Error " + statusCode + ": " + errorMessage);
          }
        } else {
          // Jika tidak ada response dari server
          this.toast.error("Terjadi kesalahan: " + error.message);
        }

        console.error("Error dalam Promise.all:", error);
      });
  }

  async doSubmitTindakLanjut() {
    let tasksList = [];
    this.showLoading();

    if (this.tindakLanjutPatientInstrruction && this.tindakLanjutText) {
      tasksList.push(() =>
        this.doSubmitServiceRequest({
          name: "follow_up_visit",
          category: [
            new Coding(
              "http://snomed.info/sct",
              "108252007",
              "Laboratory procedure"
            ),
          ],
          patientInstruction: "A",
          status: "active",
          intent: "original-order",
          priority: "routine",
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: "Kunjungan {{Patient_Name}} pada {{recordedDate}}",
          },
          data: [
            new ServiceRequestDataItem({
              system: "http://loinc.org",
              code: "58410-2",
              display: "CBC panel - Blood by Automated count",
            }),
            new ServiceRequestDataItem({
              text: this.tindakLanjutText,
            }),
          ],
          reasonCode: [
            {
              text: this.tindakLanjutText,
            },
          ],
          note: this.tindakLanjutText,
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengembalikan response dengan error
          const statusCode = error.statusCode;
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan";

          if (statusCode !== "01") {
            this.toast.error("Error " + statusCode + ": " + errorMessage);
          }
        } else {
          // Jika tidak ada response dari server
          this.toast.error("Terjadi kesalahan: " + error.message);
        }

        console.error("Error dalam Promise.all:", error);
      });
  }

  async doKeluarFaskes() {
    let tasksList = [];
    this.showLoading();

    if (this.conditionStable) {
      tasksList.push(() =>
        this.doSubmitCondition(
          "condition_stable",
          "359746009",
          this.conditionStable,
          "problem-list-item",
          "Problem List Item"
        )
      );
    }

    if (this.serviceRequestName) {
      tasksList.push(() =>
        this.doSubmitServiceRequest({
          name: "patient_referral",
          category: [
            new Coding("http://snomed.info/sct", "3457005", "Patient referral"),
          ],
          patientInstruction: this.conditionStable,
          status: "active",
          intent: "original-order",
          priority: "routine",
          encounter: {
            reference: "Encounter/{{Encounter_id}}",
            display: "Kunjungan {{Patient_Name}} pada {{recordedDate}}",
          },
          data: [
            new ServiceRequestDataItem({
              system: "http://snomed.info/sct",
              code: "3457005",
              display: "Patient referral",
            }),
            new ServiceRequestDataItem({
              text: "Pemeriksaan Sputum BTA",
            }),
          ],
          reasonCode: [{ text: "Periksa jika ada kemungkinan Tuberculosis" }],
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengembalikan response dengan error
          const statusCode = error.statusCode;
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan";

          if (statusCode !== "01") {
            this.toast.error("Error " + statusCode + ": " + errorMessage);
          }
        } else {
          // Jika tidak ada response dari server
          this.toast.error("Terjadi kesalahan: " + error.message);
        }

        console.error("Error dalam Promise.all:", error);
      });
  }

  async doSubmitEncounterProcedure() {
    let tasksList = [];
    this.showLoading();

    if (this.encounterProcedureCode && this.encounterProcedureDisplay) {
      tasksList.push(() =>
        this.doSubmitProcedure({
          name: "encounter_procedure",
          category: new Codeable(
            "http://snomed.info/sct",
            "277132007",
            "Therapeutic procedure"
          ),
          code: [
            new Codeable(
              "http://hl7.org/fhir/sid/icd-9-cm",
              this.encounterProcedureCode,
              this.encounterProcedureDisplay
            ),
          ],
          reasonCode: new Codeable(
            "http://hl7.org/fhir/sid/icd-10",
            "K05.2",
            "Acute periodontitis"
          ),
          note: this.encounterProcedureNote,
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        if (responses && responses.length > 0) {
          const allSuccess = responses.every((res) => res.statusCode === "00");

          if (allSuccess) {
            this.toast.success("Sukses Mengirim Data!");
          } else {
            const firstError = responses.find((res) => res.statusCode !== "00");
            throw new Error(firstError?.statusMsg || "Kesalahan Server");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengembalikan response dengan error
          const statusCode = error.statusCode;
          const errorMessage =
            error.response.data?.message || "Terjadi kesalahan";

          if (statusCode !== "01") {
            this.toast.error("Error " + statusCode + ": " + errorMessage);
          }
        } else {
          // Jika tidak ada response dari server
          this.toast.error("Terjadi kesalahan: " + error.message);
        }

        console.error("Error dalam Promise.all:", error);
      });
  }

  private async doSubmitCondition(
    conditionName,
    conditionCode,
    conditionDisplay,
    categoryCode,
    categoryDisplay
  ) {
    let request = new ConditionRequestData(
      this.encounter_id,
      this.useCaseId,
      this.patientData.idsatusehat,
      [
        new Condition(
          conditionName,
          conditionCode,
          conditionDisplay,
          categoryCode,
          categoryDisplay
        ),
      ]
    );

    return this.GigiService.createCondition(request);
  }

  private async doSubmitRiwayatAlergi(alergiName, alergiCode) {
    let request = new AllergyIntoleranceRequestData(
      this.encounter_id,
      this.useCaseId,
      this.patientData.idsatusehat,
      [new AllergyIntolerance(alergiName, alergiCode)]
    );

    return this.GigiService.createAllergyIntolerance(request);
  }

  private async doSubmitObservation(data: {
    name: string;
    category: Codeable;
    code: Codeable;
    result?: Result;
    resultBoolean?: boolean;
    valueInteger?: number;
    valueCodeableConcept?: Codeable;
    interpretation?: Interpretation;
    bodySite?: BodySite;
  }) {
    let request = new ObservationRequestData(
      this.encounter_id,
      this.useCaseId,
      this.patientData.idsatusehat,
      [
        new Observation({
          observationName: data.name,
          category: data.category,
          code: data.code,
          valueCodeableConcept: data.valueCodeableConcept,
          result: data.result,
          resultBoolean: data.resultBoolean,
          valueInteger: data.valueInteger,
          interpretation: data.interpretation,
          bodySite: data.bodySite,
        }),
      ]
    );

    return this.GigiService.createObservation(request);
  }

  private async doSubmitProcedure(data: {
    name: string;
    category: Codeable;
    code: Codeable[];
    reasonCode: Codeable;
    note?: string;
  }) {
    let request = new ProcedureRequestData({
      encounterId: this.encounter_id,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat,
      procedures: [
        new Procedure({
          name: data.name,
          category: data.category,
          data: data.code,
          reasonCode: data.reasonCode,
          note: data.note,
        }),
      ],
    });

    return this.GigiService.createProcedure(request);
  }

  private async doSubmitSpecimen(data: {
    name: string;
    status: string;
    type: Codeable;
    collection: {
      method: Codeable;
      collectedDateTime: string;
    };
    receivedTime: string;
    request: { reference: string }[];
  }) {
    let request = new SpecimenRequestData({
      encounterId: this.encounter_id,
      useCaseId: this.useCaseId,
      satusehatId: this.patientData.idsatusehat,
      specimens: [
        new Specimen({
          name: data.name,
          status: data.status,
          type: data.type,
          collection: data.collection,
          receivedTime: data.receivedTime,
          request: data.request,
        }),
      ],
    });

    return this.GigiService.createSpecimen(request);
  }
  async docreateKunjungan() {
    this.showLoading();
    this.patientData = await this.getPasien();
    this.cabangData = await this.getCabang();
    if (!this.patientData.idpasien) {
      let idpasien = await this.getPasienSatuSehat();
      if (!idpasien) {
        Swal.fire("Data Pasien Tidak ditemukan di SatuSehat");
      } else {
        this.idpasien = idpasien;
        this.isDisabledForm = false;
      }
    } else {
      this.idpasien = this.patientData.idpasien;
      this.isDisabledForm = false;
    }

    let response: any = await this.GigiService.createKunjungan({
      data: {
        rmno: this.notransaksi,
        orgId: this.cabangData.kodeorg,
        patientId: this.idpasien,
        patientName: this.patientData.pasien,
        practitionerId: this.patientData.idhis,
        practitionerName: this.patientData.namdokter,
        locationId: this.patientData.locationid,
        locationName: "RS Satu Sehat",
        satusehatId: this.patientData.idsatusehat,
      },
    });
    this.useCaseId = response.data.use_case_id;
    this.encounter_id = response.data.encounter_id;
    this.getDataPatient();
  }

  async getDataPatient() {
    let response: any = await this.ancService.getDataPatient({
      patientId: this.idpasien,
      rmno: this.notransaksi,
      usecase_id: this.useCaseId,
      type: "GIGI",
      status: "active",
    });

    this.setData(response.data);

    this.stopLoading();
  }

  setData(patient: any) {
    this.relatedPerson = {
      nama_ibu: patient?.related_person?.nama_ibu,
      nik_ibu: patient?.related_person?.nik_ibu,
      tl_ibu: patient?.related_person?.tl_ibu,
      hp_ibu: patient?.related_person?.hp_ibu,
      kota_ibu: patient?.related_person?.kota_ibu,
      alamat_jalan_ibu: patient?.related_person?.alamat_jalan_ibu,
      postal_code_ibu: patient?.related_person?.postal_code_ibu,
      province_id_ibu: patient?.related_person?.province_id_ibu,
      city_id_ibu: patient?.related_person?.city_id_ibu,
      district_id_ibu: patient?.related_person?.district_id_ibu,
      village_id_ibu: patient?.related_person?.village_id_ibu,
      rt_ibu: patient?.related_person?.rt_ibu,
      rw_ibu: patient?.related_person?.rw_ibu,
      nama_ayah: patient?.related_person?.nama_ayah,
      nik_ayah: patient?.related_person?.nik_ayah,
      tl_ayah: patient?.related_person?.tl_ayah,
      hp_ayah: patient?.related_person?.hp_ayah,
      kota_ayah: patient?.related_person?.kota_ayah,
      alamat_jalan_ayah: patient?.related_person?.alamat_jalan_ayah,
      postal_code_ayah: patient?.related_person?.postal_code_ayah,
      province_id_ayah: patient?.related_person?.province_id_ayah,
      city_id_ayah: patient?.related_person?.city_id_ayah,
      district_id_ayah: patient?.related_person?.district_id_ayah,
      village_id_ayah: patient?.related_person?.village_id_ayah,
      rt_ayah: patient?.related_person?.rt_ayah,
      rw_ayah: patient?.related_person?.rw_ayah,
    };

    let observations: any = patient?.observations?.reduce((acc, item) => {
      acc[item.name] = {
        ...item.data[0],
        interpretation: item.interpretation?.coding?.[0] || null,
        bodySite: item.bodySite?.coding?.[0] || null,
      };
      return acc;
    }, {});

    let conditions: any = patient?.conditions?.reduce((acc, item) => {
      acc[item.name] = item.data[0];
      return acc;
    }, {});

    let allergyIntolerances: any = patient?.allergyIntolerances?.reduce(
      (acc, item) => {
        acc[item.name] = item.data[0];
        return acc;
      },
      {}
    );

    let procedures: any = patient?.procedures?.reduce((acc, item) => {
      acc[item.name] = {
        ...item.data[0],
        note: item?.note || null,
      };
      return acc;
    }, {});

    let serviceRequests: any = patient?.serviceRequests?.reduce((acc, item) => {
      acc[item.name] = {
        ...item.data[1],
        patientInstruction: item?.patientInstruction || null,
      };
      return acc;
    }, {});

    let specimens: any = patient?.specimens?.reduce((acc, item) => {
      acc[item.name] = item.type;
      return acc;
    }, {});

    console.log(observations);
    console.log(conditions);
    console.log(allergyIntolerances);
    console.log(procedures);
    console.log(serviceRequests);
    console.log(specimens);

    this.keluhanUtama = conditions?.bleeding_gums?.display;
    this.riwayatPenyakit = conditions?.riwayat_penyakit?.display;
    this.golonganDarah =
      observations?.golongan_darah?.valueCodeableConcept?.display;
    this.riwayatAlergi = allergyIntolerances?.riwayat_alergi?.display;
    this.rhesus = observations?.rhesus?.valueCodeableConcept?.display;
    this.statusKehamilan =
      observations?.pregnancy_status?.valueCodeableConcept?.display;

    this.sistole = observations?.systolic?.result?.value;
    this.diastole = observations?.diastolic?.result?.value;
    this.heartRate = observations?.heart_rate?.result?.value;
    this.bodyTemperature = observations?.body_temperature?.result?.value;
    this.respiratoryRate = observations?.respiratory_rate?.result?.value;
    this.debrisIndeks = observations?.debris_indeks?.valueInteger;
    this.kalkulusIndeks = observations?.kalkulus_indeks?.valueInteger;
    this.skorTotalKalkulusIndeks =
      observations?.skor_total_kalkulus_indeks?.result?.value;
    this.skorTotalOHIS = observations?.skor_total_OHIS?.result?.value;
    this.kondisiGigi = observations?.skor_total_OHIS?.interpretation?.display;
    this.pemeriksaanOdontogram =
      observations?.pemeriksaan_odontogram?.bodySite?.display;

    this.statusPuasa = procedures?.other_endoscopy?.note;
    this.procedureFastingCode = procedures?.other_endoscopy?.code;
    this.procedureFastingDisplay = procedures?.other_endoscopy?.display;
    this.serviceRequestName = serviceRequests?.follow_up_visit?.text;
    this.specimenName = specimens?.blood_specimen?.display;
    this.hemoglobinValue = observations?.hemoglobin_inblood?.result?.value;
    this.mcvValue = observations?.mcv_count?.result?.value;

    this.encounterDiagnosisCode = conditions?.encounter_diagnosis?.code;
    this.encounterDiagnosisDisplay = conditions?.encounter_diagnosis?.display;

    this.encounterProcedureCode = procedures?.encounter_procedure?.code;
    this.encounterProcedureDisplay = procedures?.encounter_procedure?.display;
    this.encounterProcedureNote = procedures?.encounter_procedure?.note;

    this.tindakLanjutPatientInstrruction =
      serviceRequests?.follow_up_visit?.patientInstruction;
    this.tindakLanjutText = serviceRequests?.follow_up_visit?.text;

    this.conditionStable = conditions?.condition_stable?.display;
  }

  async setIdPasien() {
    if (!this.patientData.idpasien) {
      let idpasien = await this.getPasienSatuSehat();
      if (!idpasien) {
        Swal.fire("Data Pasien Tidak ditemukan di SatuSehat");
      } else {
        this.idpasien = idpasien;
        this.isDisabledForm = false;
      }
    } else {
      this.idpasien = this.patientData.idpasien;
      this.isDisabledForm = false;
    }

    return this.idpasien;
  }

  getPasienSatuSehat() {
    return new Promise((resolve) => {
      this.api
        .getpasien(this.patientData.nopengenal, this.headers)
        .subscribe((data) => {
          if (data.entry.length !== 0) {
            resolve(data.entry[0].resource.id);
          }
        });
    });
  }

  getPasien() {
    return new Promise((resolve) => {
      this.api
        .datapasien(this.userData.kdcabang, this.notransaksi)
        .subscribe((data) => {
          data.forEach((e) => {
            resolve(e);
          });
        });
    });
  }

  getCabang() {
    return new Promise((resolve) => {
      this.api.cabangper(this.userData.kdklinik).subscribe((data) => {
        data.forEach((e) => {
          resolve(e);
        });
      });
    });
  }

  showLoading() {
    // Swal.fire("Mohon tunggu!");
    // Swal.showLoading();
    this.isLoading = true;
    this.stopLoading(3000);
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, timing);
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async runWithDelay(promises, delayMs) {
    const results = [];
    for (const promiseFunc of promises) {
      const result = await promiseFunc(); // jalankan promise
      results.push(result);
      await this.delay(delayMs); // delay sebelum lanjut ke promise berikutnya
    }
    return results;
  }
}
