import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { PkgService } from "../../pkg.service";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import {
  Codeable,
  Interpretation,
  ValueQuantity,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";

@Component({
  selector: "app-skrining-tumbuh-kembang-perkembangan",
  templateUrl: "./skrining-tumbuh-kembang-perkembangan.component.html",
})
export class SkriningTumbuhKembangPerkembanganComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  static fields = ["hasilKpsp"];

  model = {
    hasilKpsp: "",
  };
  isLoading: boolean = false;

  hasilKpspOptions = [
    { label: "Sesuai", code: "KPSP001" },
    { label: "Meragukan", code: "KPSP002" },
    { label: "Penyimpangan", code: "KPSP003" },
  ];

  constructor(
    private toastr: ToastrService,
    private pkgService: PkgService,
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

      this.model.hasilKpsp =
        observations?.hasilKpsp?.interpretation?.code || "";
    } catch (error) {
      this.toastr.error("Gagal mengambil data pasien");
    } finally {
      this.stopLoading();
    }
  }

  async doSubmit() {
    const tasksList = [];

    if (this.model.hasilKpsp) {
      tasksList.push(() =>
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "hasilKpsp",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),

          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.hasilKpsp,
                this.getLabel("hasilKpsp", this.model.hasilKpsp)
              ),
            ],
            this.getLabel("hasilKpsp", this.model.hasilKpsp)
          ),
        })
      );
    }

    if (tasksList.length === 0) {
      this.toastr.warning("Tidak ada data yang di-submit.");
      return;
    }

    this.showLoading();

    try {
      const responses: any = await this.pkgService.runWithDelay(tasksList);
      const allSuccess = responses.every((res) => res.statusCode === "00");

      if (allSuccess) {
        this.toastr.success("Sukses Mengirim Data!");
      } else {
        const firstError = responses.find(
          (res: any) => res.statusCode !== "00"
        );
        throw new Error(firstError?.statusMsg || "Kesalahan Server");
      }
    } catch (error: any) {
      this.toastr.error("Terjadi kesalahan: " + (error.message || error));
    } finally {
      this.stopLoading();
    }
  }

  getLabel(field: string, code: string): string {
    const mapOptions: Record<string, { label: string; code: string }[]> = {
      hasilKpsp: this.hasilKpspOptions,
    };

    const option = mapOptions[field]?.find((opt) => opt.code === code);
    return option?.label || "";
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
