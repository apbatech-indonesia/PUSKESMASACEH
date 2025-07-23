import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-abnormalitas-jantung",
  templateUrl: "./form-abnormalitas-jantung.component.html",
  styleUrls: ["./form-abnormalitas-jantung.component.sass"],
})
export class FormAbnormalitasJantungComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  ekgOptions: string[] = [
    "Normal",
    "Abnormal ST Depresi",
    "Abnormal T Inversi",
    "Abnormal Hipertrofi Ventrikel Kiri",
    "Abnormal Atrial Fibrilasi",
    "Abnormal Q-Patologis",
    "Abnormal ST Elevasi",
    "Abnormal Lainnya",
  ];

  modelJantung = {
    pemeriksaanEkg: "",
    hasilEkg: "",
  };

  submitFormJantung() {
    console.log("Data Skrining Jantung:", this.modelJantung);
  }
}
