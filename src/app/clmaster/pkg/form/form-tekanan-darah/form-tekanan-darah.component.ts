import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import {
  BodySite,
  Codeable,
  Interpretation,
  Observation,
  ObservationRequestData,
  Result,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
import { PkgService } from "../../pkg.service";

@Component({
  selector: "app-form-tekanan-darah",
  templateUrl: "./form-tekanan-darah.component.html",
  styleUrls: ["./form-tekanan-darah.component.sass"],
})
export class FormTekananDarahComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;
  DELAY = 10;

  static fields = [
    "sistolik_observation",
    "diastolik_observation",
    "hasil_observation_hipertensi",
  ];

  constructor(
    private toast: ToastrService,
    private PkgService: PkgService,
    private ancService: AncService
  ) {}

  model = {
    sistolik: null,
    diastolik: null,
    hasil: "",
  };

  kategoriTekananDarah: string[] = [
    "Hipotensi",
    "Tekanan Darah Optimal",
    "Tekanan Darah Normal",
    "Tekanan Darah Normal Tinggi",
    "Hipertensi Derajat 1",
    "Hipertensi Derajat 2",
    "Hipertensi Derajat 3",
    "Hipertensi Sistolik Terisolasi",
    "Tidak diketahui",
  ];

  submitForm() {
    this.doSubmit();
  }

  getTekananDarahLabel() {
    let result = "Tidak diketahui";

    if (!this.model.sistolik || !this.model.diastolik) {
      this.model.hasil = result;
      return;
    }

    const s = this.model.sistolik;
    const d = this.model.diastolik;

    if (s >= 180 || d >= 110) {
      result = "Hipertensi Derajat 3";
    } else if (s >= 160 || d >= 100) {
      result = "Hipertensi Derajat 2";
    } else if (s >= 140 || d >= 90) {
      result = "Hipertensi Derajat 1";
    } else if (s >= 140 && d <= 90) {
      result = "Hipertensi Sistolik Terisolasi";
    } else if ((s >= 130 && s <= 139) || (d >= 85 && d <= 89)) {
      result = "Tekanan Darah Normal Tinggi";
    } else if ((s >= 120 && s <= 129) || (d >= 80 && d <= 84)) {
      result = "Tekanan Darah Normal";
    } else if (s < 120 && d < 80) {
      result = "Tekanan Darah Optimal";
    } else if (s < 90 || d < 60) {
      result = "Hipotensi";
    }

    this.model.hasil = result;
  }

  ngOnInit() {
    this.getDataPatient();
  }

  async getDataPatient() {
    this.showLoading();

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
    let observations: any = patient?.observations?.reduce((acc, item) => {
      acc[item.name] = {
        ...item.data[0],
        interpretation: item.interpretation?.coding?.[0] || null,
        bodySite: item.bodySite?.coding?.[0] || null,
      };
      return acc;
    }, {});

    this.model.sistolik = observations?.sistolik_observation?.result.value;
    this.model.diastolik = observations?.diastolik_observation?.result.value;
    this.model.hasil =
      observations?.hasil_observation_hipertensi?.interpretation?.display;
  }

  //submision
  async doSubmit() {
    let tasksList = [];
    this.showLoading();

    if (this.model.sistolik) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "sistolik_observation",
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
            this.model.sistolik,
            "mmHg",
            "http://unitsofmeasure.org",
            "mm[Hg]"
          ),
        })
      );
    }

    if (this.model.diastolik) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "diastolik_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable(
            "http://loinc.org",
            "8462-4",
            "Diastolic blood pressure"
          ),
          result: new Result(
            this.model.diastolik,
            "mmHg",
            "http://unitsofmeasure.org",
            "mm[Hg]"
          ),
        })
      );
    }

    if (this.model.hasil) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "hasil_observation_hipertensi",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "268607006",
            "Hypertension risk level"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://snomed.info/sct",
                "827068008",
                this.model.hasil
              ),
            ],
            this.model.hasil
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
      this.encounterId,
      this.useCaseId,
      this.satusehatId,
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

    return this.PkgService.createObservation(request);
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
}
