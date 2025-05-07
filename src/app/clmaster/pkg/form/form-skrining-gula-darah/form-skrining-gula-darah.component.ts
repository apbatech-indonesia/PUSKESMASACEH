import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  BodySite,
  Codeable,
  Interpretation,
  Observation,
  ObservationRequestData,
  Result,
  ValueQuantity,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
import Swal from "sweetalert2";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import { PkgService } from "../../pkg.service";

@Component({
  selector: "app-form-skrining-gula-darah",
  templateUrl: "./form-skrining-gula-darah.component.html",
  styleUrls: ["./form-skrining-gula-darah.component.sass"],
})
export class FormSkriningGulaDarahComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [
    "gula_darah_sewaktu_observation",
    "gula_darah_puasa_observation",
  ];

  constructor(
    private toast: ToastrService,
    private PkgService: PkgService,
    private ancService: AncService
  ) {}

  DELAY = 10;

  model = {
    gds: null,
    gdp: null,
  };

  submitForm() {
    this.doSubmit();
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

    this.model.gds =
      observations?.gula_darah_sewaktu_observation?.valueQuantity?.value;
    this.model.gdp =
      observations?.gula_darah_puasa_observation?.valueQuantity?.value;
  }

  //submision
  async doSubmit() {
    let tasksList = [];
    this.showLoading();

    if (this.model.gds) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "gula_darah_sewaktu_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "laboratory",
            "Laboratory"
          ),
          code: new Codeable(
            "http://loinc.org",
            "2345-7",
            "Glucose [Mass/volume] in Serum or Plasma"
          ),
          valueQuantity: new ValueQuantity(
            this.model.gds,
            "mg/dL",
            "http://unitsofmeasure.org",
            "mg/dL"
          ),
        })
      );
    }

    if (this.model.gdp) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "gula_darah_puasa_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "laboratory",
            "Laboratory"
          ),
          code: new Codeable(
            "http://loinc.org",
            "1558-6",
            "Fasting glucose [Mass/volume] in Serum or Plasma"
          ),
          valueQuantity: new ValueQuantity(
            this.model.gdp,
            "mg/dL",
            "http://unitsofmeasure.org",
            "mg/dL"
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
    valueQuantity?: ValueQuantity;
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
          valueQuantity: data.valueQuantity,
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
