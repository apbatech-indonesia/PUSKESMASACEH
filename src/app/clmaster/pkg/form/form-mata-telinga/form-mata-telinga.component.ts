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
  selector: "app-form-mata-telinga",
  templateUrl: "./form-mata-telinga.component.html",
  styleUrls: ["./form-mata-telinga.component.sass"],
})
export class FormMataTelingaComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;
  DELAY = 10;

  static fields = [
    "tajam_pendengaran_observation",
    "otoskop_observation",
    "etumblin_observation",
    "snellen_observation",
    "pinhole_observation",
    "pupil_observation",
  ];

  model = {
    tajamPendengaran: "",
    otoskop: "",
    etumblin: "",
    snellen: "",
    pinhole: "",
    pupil: "",
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

    try {
      const response: any = await this.ancService.getDataPatient({
        patientId: this.idpasien,
        rmno: this.notransaksi,
        usecase_id: this.useCaseId,
        type: "PKG-REG",
        status: "active",
      });

      this.setData(response.data);
    } catch (error) {
      this.toast.error("Gagal mengambil data pasien");
    } finally {
      this.stopLoading();
    }
  }

  setData(patient: any) {
    const observations = patient?.observations?.reduce((acc, item) => {
      acc[item.name] = {
        ...item.data?.[0],
        interpretation: item.interpretation?.coding?.[0] || null,
        bodySite: item.bodySite?.coding?.[0] || null,
      };
      return acc;
    }, {});

    this.model.tajamPendengaran =
      observations?.tajam_pendengaran_observation?.valueCodeableConcept?.display || "";
    this.model.otoskop = observations?.otoskop_observation?.valueCodeableConcept?.display || "";
    this.model.etumblin =
      observations?.etumblin_observation?.valueCodeableConcept?.display || "";
    this.model.snellen = observations?.snellen_observation?.valueCodeableConcept?.display || "";
    this.model.pinhole = observations?.pinhole_observation?.valueCodeableConcept?.display || "";
    this.model.pupil = observations?.pupil_observation?.valueCodeableConcept?.display || "";
  }

  async submitForm() {
    this.doSubmit();
  }
  async doSubmit() {
    this.showLoading();

    const tasksList: (() => Promise<any>)[] = [];

    if (this.model.tajamPendengaran) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "tajam_pendengaran_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Tajam Pendengaran"
          ),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            this.model.tajamPendengaran
          ),
        })
      );
    }

    if (this.model.otoskop) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "otoskop_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable("http://snomed.info/sct", "275727004", "Otoskop"),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            this.model.otoskop
          ),
        })
      );
    }

    if (this.model.etumblin) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "etumblin_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable("http://snomed.info/sct", "275727004", "Etumblin"),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            this.model.etumblin
          ),
        })
      );
    }

    if (this.model.snellen) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "snellen_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable("http://snomed.info/sct", "275727004", "Snellen"),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            this.model.snellen
          ),
        })
      );
    }

    if (this.model.pinhole) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pinhole_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable("http://snomed.info/sct", "275727004", "Pinhole"),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            this.model.pinhole
          ),
        })
      );
    }

    if (this.model.pupil) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pupil_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable("http://snomed.info/sct", "275727004", "Pupil"),
          valueCodeableConcept: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            this.model.pupil
          ),
        })
      );
    }

    try {
      const responses = await this.runWithDelay(tasksList, this.DELAY);
      const allSuccess = responses.every((res) => res.statusCode === "00");

      if (allSuccess) {
        this.toast.success("Sukses Mengirim Data!");
      } else {
        const firstError = responses.find((res) => res.statusCode !== "00");
        throw new Error(firstError?.statusMsg || "Kesalahan Server");
      }
    } catch (error: any) {
      this.toast.error(
        "Terjadi kesalahan: " + (error.message || "Unknown error")
      );
    }
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
    const request = new ObservationRequestData(
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

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async runWithDelay(promises: (() => Promise<any>)[], delayMs: number) {
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
