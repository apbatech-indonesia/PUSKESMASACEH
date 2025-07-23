import { Component, Input, OnInit } from "@angular/core";
import { PkgService } from "../../pkg.service";
import { ToastrService } from "ngx-toastr";
import { AncService } from "src/app/satusehat/satusehat-anc/services/anc.service";
import {
  Codeable,
  Result,
} from "src/app/satusehat/satusehat-gigi/data/models/observation-create.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-skrining-mandiri-tumbuh-kembang-tuberkulosis",
  templateUrl: "./skrining-mandiri-tumbuh-kembang-tuberkulosis.component.html",
  styleUrls: ["./skrining-mandiri-tumbuh-kembang-tuberkulosis.component.sass"],
})
export class SkriningMandiriTuberkulosisBayiComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  model = {
    batukLebih2Minggu: "",
    beratBadanTurun: "",
    beratBadanTidakNaik: "",
    nafsuMakanBerkurang: "",
    kontakTBC: "",
  };

  static fields = [
    "batukLebih2Minggu",
    "beratBadanTurun",
    "beratBadanTidakNaik",
    "nafsuMakanBerkurang",
    "kontakTBC",
  ];

  constructor(
    private toast: ToastrService,
    private PkgService: PkgService,
    private ancService: AncService
  ) {}

  ngOnInit() {
    this.getDataPatient();
  }

  async doSubmit() {
    let tasksList = [];
    this.showLoading();

    if (this.model.batukLebih2Minggu) {
      tasksList.push(() =>
        this.PkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "batukLebih2Minggu",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          resultBoolean: this.model.batukLebih2Minggu !== "Ya",
        })
      );
    }

    if (this.model.beratBadanTurun) {
      tasksList.push(() =>
        this.PkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "beratBadanTurun",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          resultBoolean: this.model.beratBadanTurun !== "Ya",
        })
      );
    }

    if (this.model.beratBadanTidakNaik) {
      tasksList.push(() =>
        this.PkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "beratBadanTidakNaik",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          resultBoolean: this.model.beratBadanTidakNaik !== "Ya",
        })
      );
    }

    if (this.model.nafsuMakanBerkurang) {
      tasksList.push(() =>
        this.PkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "nafsuMakanBerkurang",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          resultBoolean: this.model.nafsuMakanBerkurang !== "Ya",
        })
      );
    }

    if (this.model.kontakTBC) {
      tasksList.push(() =>
        this.PkgService.doSubmitObservation({
          encounterId: this.encounterId,
          useCaseId: this.useCaseId,
          satusehatId: this.satusehatId,
          name: "kontakTBC",
          category: new Codeable(
            "http://terminology.hl7.org/CodeSystem/observation-category",
            "vital-signs",
            "Vital Signs"
          ),
          code: new Codeable("http://loinc.org", "29463-7", "Body weight"),
          resultBoolean: this.model.kontakTBC !== "true",
        })
      );
    }

    this.PkgService.runWithDelay(tasksList)
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

    this.model.batukLebih2Minggu =
      observations?.batukLebih2Minggu?.resultBoolean.toString();
    this.model.beratBadanTurun =
      observations?.beratBadanTurun?.resultBoolean.toString();
    this.model.beratBadanTidakNaik =
      observations?.beratBadanTidakNaik?.resultBoolean.toString();
    this.model.nafsuMakanBerkurang =
      observations?.nafsuMakanBerkurang?.resultBoolean.toString();
    this.model.kontakTBC = observations?.kontakTBC?.resultBoolean.toString();
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
