import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  Codeable,
  Interpretation,
  ValueQuantity,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
import Swal from "sweetalert2";
import { PkgService } from "../../pkg.service";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";

@Component({
  selector: "app-skrining-gizi-pertumbuhan",
  templateUrl: "./skrining-gizi-pertumbuhan.component.html",
})
export class SkriningGiziPertumbuhanComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading = false;
  DELAY = 10;

  model = {
    beratBadan: null,
    tinggiBadan: null,
    bbu: "",
    pbtu: "",
    bbpb: "",
    lingkarKepala: "",
  };

  static fields = [
    "beratBadan",
    "tinggiBadan",
    "bbu",
    "pbtu",
    "bbpb",
    "lingkarKepala",
  ];

  bbuOptions = [
    { label: "Berat Badan Sangat Kurang", code: "OI000007" },
    { label: "Berat Badan Kurang", code: "248342006" },
    { label: "Berat Badan Normal", code: "43664005" },
    { label: "Berat Badan Lebih", code: "OI000010" },
  ];

  pbtuOptions = [
    { label: "Sangat Pendek", code: "OI000011" },
    { label: "Pendek", code: "444000005" },
    { label: "Normal", code: "17489000" },
    { label: "Tinggi", code: "83077003" },
  ];

  bbpbOptions = [
    { label: "Gizi Buruk", code: "OI000001" },
    { label: "Gizi Kurang", code: "248325000" },
    { label: "Gizi Baik", code: "248324001" },
    { label: "Risiko Gizi Lebih", code: "OI000004" },
    { label: "Gizi Lebih", code: "238131007" },
    { label: "Obesitas", code: "414915002" },
  ];

  lingkarKepalaOptions = [
    { label: "Makrosefali", code: "1145403003" },
    { label: "Normal", code: "840673007" },
    { label: "Mikrosefali", code: "1148757008" },
  ];

  constructor(
    private toastr: ToastrService,
    private pkgService: PkgService,
    private ancService: AncService
  ) {}

  ngOnInit() {
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

      this.setData(response?.data);
    } catch (error) {
      this.toastr.error("Gagal mengambil data pasien");
    } finally {
      this.stopLoading();
    }
  }

  setData(patient: any) {
    const observations = patient?.observations?.reduce(
      (acc: any, item: any) => {
        acc[item.name] = {
          ...item.data?.[0],
          interpretation: item.interpretation?.coding?.[0] || null,
          bodySite: item.bodySite?.coding?.[0] || null,
        };
        return acc;
      },
      {}
    );

    this.model.beratBadan = observations?.beratBadan?.valueQuantity?.value;
    this.model.tinggiBadan = observations?.tinggiBadan?.valueQuantity?.value;

    this.model.bbu = observations?.bbu?.interpretation?.code;
    this.model.pbtu = observations?.pbtu?.interpretation?.code;
    this.model.bbpb = observations?.bbpb?.interpretation?.code;
    this.model.lingkarKepala =
      observations?.lingkarKepala?.interpretation?.code;
  }

  getLabel(field: string, code: string): string {
    const mapOptions: Record<string, { label: string; code: string }[]> = {
      bbu: this.bbuOptions,
      pbtu: this.pbtuOptions,
      bbpb: this.bbpbOptions,
      lingkarKepala: this.lingkarKepalaOptions,
    };

    const option = mapOptions[field]?.find((opt) => opt.code === code);
    return option?.label || "";
  }

  async doSubmit() {
    const tasksList = [];

    if (this.model.beratBadan) {
      tasksList.push(() =>
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "beratBadan",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          valueQuantity: new ValueQuantity(
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
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "tinggiBadan",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          valueQuantity: new ValueQuantity(
            this.model.tinggiBadan,
            "cm",
            "http://unitsofmeasure.org",
            "cm"
          ),
        })
      );
    }

    if (this.model.bbu) {
      tasksList.push(() =>
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "bbu",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          valueQuantity: new ValueQuantity(
            "-2",
            "{Zscore}",
            "http://unitsofmeasure.org",
            "{Zscore}"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.bbu,
                this.getLabel("bbu", this.model.bbu)
              ),
            ],
            this.getLabel("bbu", this.model.bbu)
          ),
        })
      );
    }

    if (this.model.pbtu) {
      tasksList.push(() =>
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "pbtu",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          valueQuantity: new ValueQuantity(
            "-2",
            "{Zscore}",
            "http://unitsofmeasure.org",
            "{Zscore}"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.pbtu,
                this.getLabel("pbtu", this.model.pbtu)
              ),
            ],
            this.getLabel("pbtu", this.model.pbtu)
          ),
        })
      );
    }

    if (this.model.bbpb) {
      tasksList.push(() =>
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "bbpb",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          valueQuantity: new ValueQuantity(
            "-2",
            "{Zscore}",
            "http://unitsofmeasure.org",
            "{Zscore}"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.bbpb,
                this.getLabel("bbpb", this.model.bbpb)
              ),
            ],
            this.getLabel("bbpb", this.model.bbpb)
          ),
        })
      );
    }

    if (this.model.lingkarKepala) {
      tasksList.push(() =>
        this.pkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "lingkarKepala",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          valueQuantity: new ValueQuantity(
            "-2",
            "{Zscore}",
            "http://unitsofmeasure.org",
            "{Zscore}"
          ),
          interpretation: new Interpretation(
            [
              new Codeable(
                "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                this.model.lingkarKepala,
                this.getLabel("lingkarKepala", this.model.lingkarKepala)
              ),
            ],
            this.getLabel("lingkarKepala", this.model.lingkarKepala)
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

  getCode(field: string, label: string): string {
    const mapOptions: Record<string, { label: string; code: string }[]> = {
      bbu: this.bbuOptions,
      pbtu: this.pbtuOptions,
      bbpb: this.bbpbOptions,
      lingkarKepala: this.lingkarKepalaOptions,
    };

    const option = mapOptions[field]?.find((opt) => opt.label === label);
    return option?.code || "UNKNOWN";
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
