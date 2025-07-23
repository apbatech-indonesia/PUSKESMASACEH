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
  selector: "app-skrining-gigi-karies",
  templateUrl: "./skrining-gigi-karies.component.html",
  styleUrls: ["./skrining-gigi-karies.component.sass"],
})
export class SkriningGigiKariesComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;
  DELAY = 1000; // Delay updated to 1000ms

  static fields = ["gigiKaries", "gigiHilang"];

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
      this.toast.error("Gagal mengambil data pasien.");
    } finally {
      this.stopLoading();
    }
  }

  setData(patient: any) {
    const observations: any = patient?.observations?.reduce((acc, item) => {
      acc[item.name] = item.data?.[0];
      return acc;
    }, {});

    this.modelGigi.gigiKaries =
      observations?.gigiKaries?.resultBoolean?.toString();
    this.modelGigi.gigiHilang =
      observations?.gigiHilang?.resultBoolean?.toString();
  }

  submitFormGigi() {
    this.doSubmit();
  }

  async doSubmit() {
    this.showLoading();

    const tasksList = [];

    if (this.modelGigi.gigiKaries !== null) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "gigiKaries",
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
          resultBoolean: this.modelGigi.gigiKaries === "true",
        })
      );
    }

    if (this.modelGigi.gigiHilang !== null) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "gigiHilang",
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
          resultBoolean: this.modelGigi.gigiHilang === "true",
        })
      );
    }

    if (tasksList.length === 0) {
      this.toast.warning("Tidak ada data untuk disubmit.");
      return;
    }

    try {
      const responses = await this.runWithDelay(tasksList, this.DELAY);
      const allSuccess = responses.every((res) => res.statusCode === "00");
      if (allSuccess) {
        this.toast.success("Data gigi berhasil dikirim!");
      } else {
        const firstError = responses.find((res) => res.statusCode !== "00");
        throw new Error(firstError?.statusMsg || "Kesalahan Server");
      }
    } catch (error) {
      this.toast.error("Terjadi kesalahan: " + error.message);
    }
  }

  private async doSubmitObservation(data: {
    name: string;
    category: Codeable;
    code: Codeable;
    resultBoolean?: boolean;
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
          resultBoolean: data.resultBoolean,
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
