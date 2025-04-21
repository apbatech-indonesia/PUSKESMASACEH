import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { PkgService } from "../../pkg.service";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import {
  BodySite,
  Codeable,
  Interpretation,
  Observation,
  ObservationRequestData,
  Result,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";

@Component({
  selector: "app-form-karies-gigi-hilang",
  templateUrl: "./form-karies-gigi-hilang.component.html",
  styleUrls: ["./form-karies-gigi-hilang.component.sass"],
})
export class FormKariesGigiHilangComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;
  DELAY = 10;

  static fields = ["tooth_decay_observation", "tooth_loss_observation"];

  modelGigi = {
    gigiKaries: null,
    gigiHilang: null,
  };

  constructor(
    private toast: ToastrService,
    private PkgService: PkgService,
    private ancService: AncService
  ) {}

  ngOnInit(): void {
    this.getDataPatient();
  }

  async getDataPatient() {
    this.showLoading();

    let response: any = await this.ancService.getDataPatient({
      patientId: this.idpasien,
      rmno: this.notransaksi,
      usecase_id: this.useCaseId,
      type: "PKG-REG",
      status: "active",
    });

    this.setData(response.data);
    this.stopLoading();
  }

  setData(patient: any) {
    let observations: any = patient?.observations?.reduce((acc, item) => {
      acc[item.name] = item.data?.[0];
      return acc;
    }, {});

    this.modelGigi.gigiKaries =
      observations?.tooth_decay_observation?.resultBoolean.toString();
    this.modelGigi.gigiHilang =
      observations?.tooth_loss_observation?.resultBoolean.toString();
  }

  submitFormGigi() {
    this.doSubmit();
  }

  async doSubmit() {
    let tasksList = [];
    this.showLoading();

    if (this.modelGigi.gigiKaries !== null) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "tooth_decay_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "80967001",
            "Dental caries"
          ),
          resultBoolean: this.modelGigi.gigiKaries == "true",
        })
      );
    }

    if (this.modelGigi.gigiHilang !== null) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "tooth_loss_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "251317003",
            "Missing tooth count"
          ),
          resultBoolean: this.modelGigi.gigiHilang == "true",
        })
      );
    }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        const allSuccess = responses.every((res) => res.statusCode === "00");
        if (allSuccess) {
          this.toast.success("Data gigi berhasil dikirim!");
        } else {
          const firstError = responses.find((res) => res.statusCode !== "00");
          throw new Error(firstError?.statusMsg || "Kesalahan Server");
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
      const result = await promiseFunc();
      results.push(result);
      await this.delay(delayMs);
    }
    return results;
  }

  showLoading() {
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
