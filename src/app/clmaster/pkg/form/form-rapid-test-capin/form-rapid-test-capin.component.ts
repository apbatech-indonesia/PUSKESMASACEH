import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { PkgService } from "../../pkg.service";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import {
  Observation,
  ObservationRequestData,
  Codeable,
  Result,
  Interpretation,
  BodySite,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";

@Component({
  selector: "app-form-rapid-test-capin",
  templateUrl: "./form-rapid-test-capin.component.html",
  styleUrls: ["./form-rapid-test-capin.component.sass"],
})
export class FormRapidTestCapinComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [
    "hb_observation",
    "sifilis_observation",
    "hib_observation",
    "anemia_observation",
  ];

  constructor(
    private toast: ToastrService,
    private PkgService: PkgService,
    private ancService: AncService
  ) {}

  DELAY = 10;

  modelRapid = {
    hb: null,
    sifilis: null,
    hib: null,
    anemia: null,
  };

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
      acc[item.name] = item.data[0];
      return acc;
    }, {});

    this.modelRapid.hb = observations?.hb_observation?.result?.value;
    this.modelRapid.sifilis = observations?.sifilis_observation?.result?.value;
    this.modelRapid.hib = observations?.hib_observation?.result?.value;
    this.modelRapid.anemia = observations?.anemia_observation?.result?.value;
  }

  submitFormRapid() {
    this.doSubmit();
  }

  async doSubmit() {
    const tasksList = [];
    this.showLoading();

    if (this.modelRapid.hb != null) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "hb_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://loinc.org",
            "718-7",
            "Hemoglobin [Mass/volume] in Blood"
          ),
          result: new Result(
            this.modelRapid.hb,
            "g/dL",
            "http://unitsofmeasure.org",
            "g/dL"
          ),
        })
      );
    }

    // [todo]
    // if (this.modelRapid.sifilis != null) {
    //   tasksList.push(() =>
    //     this.doSubmitObservation({
    //       name: "sifilis_observation",
    //       category: new Codeable(
    //         "http://terminology.hl7.org/CodeSystem/observation-category",
    //         "exam",
    //         "Exam"
    //       ),
    //       code: new Codeable(
    //         "http://snomed.info/sct",
    //         "1138591000000107",
    //         "Syphilis screening"
    //       ),
    //       result: new Result(
    //         this.modelRapid.sifilis,
    //         "{qual}",
    //         "http://unitsofmeasure.org",
    //         this.modelRapid.sifilis
    //       ),
    //     })
    //   );
    // }

    // if (this.modelRapid.hib != null) {
    //   tasksList.push(() =>
    //     this.doSubmitObservation({
    //       name: "hib_observation",
    //       category: new Codeable(
    //         "http://terminology.hl7.org/CodeSystem/observation-category",
    //         "exam",
    //         "Exam"
    //       ),
    //       code: new Codeable(
    //         "http://snomed.info/sct",
    //         "66071002",
    //         "Haemophilus influenzae type b test"
    //       ),
    //       result: new Result(
    //         this.modelRapid.hib,
    //         "{qual}",
    //         "http://unitsofmeasure.org",
    //         this.modelRapid.hib
    //       ),
    //     })
    //   );
    // }

    // if (this.modelRapid.anemia != null) {
    //   tasksList.push(() =>
    //     this.doSubmitObservation({
    //       name: "anemia_observation",
    //       category: new Codeable(
    //         "http://terminology.hl7.org/CodeSystem/observation-category",
    //         "exam",
    //         "Exam"
    //       ),
    //       code: new Codeable(
    //         "http://snomed.info/sct",
    //         "271737000",
    //         "Anemia screening"
    //       ),
    //       result: new Result(
    //         this.modelRapid.anemia,
    //         "{qual}",
    //         "http://unitsofmeasure.org",
    //         this.modelRapid.anemia
    //       ),
    //     })
    //   );
    // }

    this.runWithDelay(tasksList, this.DELAY)
      .then((responses: any) => {
        const allSuccess = responses.every((res) => res.statusCode === "00");

        if (allSuccess) {
          this.toast.success("Sukses Mengirim Data!");
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
