import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { PkgService } from "../../pkg.service";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import {
  Codeable,
  Observation,
  ObservationRequestData,
  Interpretation,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
import { DashboardPkgService } from "../../dashboard/dashboard-pkg/dashboard-pkg-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-skrining-tuberkulosis",
  templateUrl: "./skrining-tuberkulosis.component.html",
})
export class SkriningTuberkulosisComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;
  DELAY = 10;

  static fields = [
    "pemeriksaanTbSatuTahunKontakTBC",
    "pemeriksaanTbSatuTahunDemam",
    "pemeriksaanTbSatuTahunKelenjar",
    "pemeriksaanTbSatuTahunPembengkakan",
    "pemeriksaanTbSatuTahunIndurasi",
    "pemeriksaanTbSatuTahunHasilMantoux",
    "pemeriksaanTbSatuTahunSkorTB",
  ];

  model = {
    pemeriksaanTbSatuTahunKontakTBC: "",
    pemeriksaanTbSatuTahunDemam: "",
    pemeriksaanTbSatuTahunKelenjar: "",
    pemeriksaanTbSatuTahunPembengkakan: "",
    pemeriksaanTbSatuTahunIndurasi: "",
    pemeriksaanTbSatuTahunHasilMantoux: "",
    pemeriksaanTbSatuTahunSkorTB: "",
  };

  options = [
    { label: "Ya", code: "1" },
    { label: "Tidak", code: "0" },
  ];

  constructor(
    private toast: ToastrService,
    private pkgService: PkgService,
    private ancService: AncService,
    private dashboardPkgService: DashboardPkgService
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

      const observations = response?.data?.observations?.reduce(
        (acc: any, item: any) => {
          acc[item.name] = {
            ...item.data?.[0],
            interpretation: item.interpretation?.coding?.[0] || null,
          };
          return acc;
        },
        {}
      );

      this.model.pemeriksaanTbSatuTahunKontakTBC =
        observations?.pemeriksaanTbSatuTahunKontakTBC?.interpretation?.code ||
        "";
      this.model.pemeriksaanTbSatuTahunDemam =
        observations?.pemeriksaanTbSatuTahunDemam?.interpretation?.code || "";
      this.model.pemeriksaanTbSatuTahunKelenjar =
        observations?.pemeriksaanTbSatuTahunKelenjar?.interpretation?.code ||
        "";
      this.model.pemeriksaanTbSatuTahunPembengkakan =
        observations?.pemeriksaanTbSatuTahunPembengkakan?.interpretation
          ?.code || "";
      this.model.pemeriksaanTbSatuTahunIndurasi =
        observations?.pemeriksaanTbSatuTahunIndurasi?.interpretation?.code ||
        "";
      this.model.pemeriksaanTbSatuTahunHasilMantoux =
        observations?.pemeriksaanTbSatuTahunHasilMantoux?.interpretation
          ?.code || "";
      this.model.pemeriksaanTbSatuTahunSkorTB =
        observations?.pemeriksaanTbSatuTahunSkorTB?.interpretation?.code || "";
    } catch (error) {
      this.toast.error("Gagal mengambil data pasien");
    } finally {
      this.stopLoading();
    }
  }

  async doSubmit() {
    this.showLoading();

    const tasksList: (() => Promise<any>)[] = [];

    if (this.model.pemeriksaanTbSatuTahunKontakTBC) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunKontakTBC",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunKontakTBC,
                this.model.pemeriksaanTbSatuTahunKontakTBC
              ),
            ],
            this.model.pemeriksaanTbSatuTahunKontakTBC
          ),
        })
      );
    }

    if (this.model.pemeriksaanTbSatuTahunDemam) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunDemam",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunDemam,
                this.model.pemeriksaanTbSatuTahunDemam
              ),
            ],
            this.model.pemeriksaanTbSatuTahunDemam
          ),
        })
      );
    }

    if (this.model.pemeriksaanTbSatuTahunKelenjar) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunKelenjar",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunKelenjar,
                this.model.pemeriksaanTbSatuTahunKelenjar
              ),
            ],
            this.model.pemeriksaanTbSatuTahunKelenjar
          ),
        })
      );
    }

    if (this.model.pemeriksaanTbSatuTahunPembengkakan) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunPembengkakan",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunPembengkakan,
                this.model.pemeriksaanTbSatuTahunPembengkakan
              ),
            ],
            this.model.pemeriksaanTbSatuTahunPembengkakan
          ),
        })
      );
    }

    if (this.model.pemeriksaanTbSatuTahunIndurasi) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunIndurasi",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunIndurasi,
                this.model.pemeriksaanTbSatuTahunIndurasi
              ),
            ],
            this.model.pemeriksaanTbSatuTahunIndurasi
          ),
        })
      );
    }

    if (this.model.pemeriksaanTbSatuTahunHasilMantoux) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunHasilMantoux",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunHasilMantoux,
                this.model.pemeriksaanTbSatuTahunHasilMantoux
              ),
            ],
            this.model.pemeriksaanTbSatuTahunHasilMantoux
          ),
        })
      );
    }

    if (this.model.pemeriksaanTbSatuTahunSkorTB) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaanTbSatuTahunSkorTB",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Hasil Tes Daya Dengar"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanTbSatuTahunSkorTB,
                this.model.pemeriksaanTbSatuTahunSkorTB
              ),
            ],
            this.model.pemeriksaanTbSatuTahunSkorTB
          ),
        })
      );
    }

    try {
      const responses = await this.pkgService.runWithDelay(tasksList);
      const allSuccess = responses.every((res) => res.statusCode === "00");

      if (allSuccess) {
        this.dashboardPkgService
          .createDashboardPkg({
            norm: "this.norm",
            notransaksi: this.notransaksi,
            layanan: "Skrining Tuberkulosis",
            status: "layanan"
          })
          .toPromise();

        this.toast.success("Sukses Mengirim Data!");
      } else {
        const firstError = responses.find((res) => res.statusCode !== "00");
        throw new Error(firstError?.statusMsg || "Kesalahan Server");
      }
    } catch (error: any) {
      this.toast.error(
        "Terjadi kesalahan: " + (error.message || "Unknown error")
      );
    } finally {
      this.stopLoading();
    }
  }

  private async doSubmitObservation(data: {
    name: string;
    category: Codeable;
    code: Codeable;
    interpretation: Interpretation;
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
          interpretation: data.interpretation,
        }),
      ]
    );

    return this.pkgService.createObservation(request);
  }

  getLabel(code: string): string {
    const option = this.options.find((opt) => opt.code === code);
    return option?.label || "";
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  showLoading() {
    this.isLoading = true;
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, timing);
  }
}
