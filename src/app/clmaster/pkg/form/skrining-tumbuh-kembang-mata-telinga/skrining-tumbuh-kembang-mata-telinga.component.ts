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

@Component({
  selector: "app-skrining-tumbuh-kembang-mata-telinga",
  templateUrl: "./skrining-tumbuh-kembang-mata-telinga.component.html",
  styleUrls: ["./skrining-tumbuh-kembang-mata-telinga.component.sass"],
})
export class SkriningTumbuhKembangMataTelinga implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;
  DELAY = 10;

  static fields = [
    "hasil_tes_daya_dengar_observation",
    "pemeriksaan_pupil_putih_observation",
  ];

  model = {
    hasilTesDayaDengar: "",
    pemeriksaanPupilPutih: "",
  };

  hasilTesDayaDengarOptions = [
    { label: "Sesuai usia", code: "17621005" },
    { label: "Ada kemungkinan penyimpangan", code: "410519009" },
  ];

  pemeriksaanPupilPutihOptions = [
    { label: "Normal", code: "17621005" },
    { label: "Curiga kelainan pupil putih", code: "410519009" },
  ];

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

      this.model.hasilTesDayaDengar =
        observations?.hasil_tes_daya_dengar_observation?.interpretation?.code ||
        "";
      this.model.pemeriksaanPupilPutih =
        observations?.pemeriksaan_pupil_putih_observation?.interpretation
          ?.code || "";
    } catch (error) {
      this.toast.error("Gagal mengambil data pasien");
    } finally {
      this.stopLoading();
    }
  }

  async doSubmit() {
    this.showLoading();

    const tasksList: (() => Promise<any>)[] = [];

    if (this.model.hasilTesDayaDengar) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "hasil_tes_daya_dengar_observation",
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
                this.model.hasilTesDayaDengar,
                this.getLabel(
                  "hasilTesDayaDengar",
                  this.model.hasilTesDayaDengar
                )
              ),
            ],
            this.getLabel("hasilTesDayaDengar", this.model.hasilTesDayaDengar)
          ),
        })
      );
    }

    if (this.model.pemeriksaanPupilPutih) {
      tasksList.push(() =>
        this.doSubmitObservation({
          name: "pemeriksaan_pupil_putih_observation",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "exam",
            "Exam"
          ),
          code: new Codeable(
            "http://snomed.info/sct",
            "275727004",
            "Pemeriksaan Pupil Putih"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pemeriksaanPupilPutih,
                this.getLabel(
                  "pemeriksaanPupilPutih",
                  this.model.pemeriksaanPupilPutih
                )
              ),
            ],
            this.getLabel(
              "pemeriksaanPupilPutih",
              this.model.pemeriksaanPupilPutih
            )
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

    return this.PkgService.createObservation(request);
  }

  getLabel(field: string, code: string): string {
    const mapOptions: Record<string, { label: string; code: string }[]> = {
      hasilTesDayaDengar: this.hasilTesDayaDengarOptions,
      pemeriksaanPupilPutih: this.pemeriksaanPupilPutihOptions,
    };

    const option = mapOptions[field]?.find((opt) => opt.code === code);
    return option?.label || "";
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
  }

  stopLoading(timing: number = 1000) {
    setTimeout(() => {
      this.isLoading = false;
      Swal.close();
    }, timing);
  }
}
