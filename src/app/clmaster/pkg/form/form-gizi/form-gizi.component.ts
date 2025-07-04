import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  BodySite,
  Codeable,
  Interpretation,
  Observation,
  ObservationRequestData,
  Result,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
import Swal from "sweetalert2";
import { PkgService } from "../../pkg.service";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";

@Component({
  selector: "app-form-gizi",
  templateUrl: "./form-gizi.component.html",
  styleUrls: ["./form-gizi.component.sass"],
})
export class FormGiziComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [
    "body_weight_observation",
    "body_height_observation",
    "waist_circumference_observation",
  ];

  constructor(
    private toast: ToastrService,
    private PkgService: PkgService,
    private ancService: AncService
  ) {}

  DELAY = 10;

  model = {
    beratBadan: null,
    tinggiBadan: null,
    lingkarPerut: null,
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
      type: "PKG-REG",
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

    this.model.beratBadan =
      observations?.body_weight_observation?.result?.value;
    this.model.tinggiBadan =
      observations?.body_height_observation?.result?.value;
    this.model.lingkarPerut =
      observations?.waist_circumference_observation?.result?.value;
  }

  //submision
  async doSubmit() {
    let tasksList = [];
    this.showLoading();

    if (this.model.beratBadan) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "body_weight_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          result: new Result(
            this.model.beratBadan,
            "kg",
            "http://unitsofmeasure.org",
            "kg"
          ),
        })
      );
    }

    if (this.model.tinggiBadan) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "body_height_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "8302-2", "Body height"),
          result: new Result(
            this.model.tinggiBadan,
            "cm",
            "http://unitsofmeasure.org",
            "cm"
          ),
        })
      );
    }

    if (this.model.lingkarPerut) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "waist_circumference_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "276361009",
            "Waist circumference"
          ),
          result: new Result(
            this.model.lingkarPerut,
            "cm",
            "http://unitsofmeasure.org",
            "cm"
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
