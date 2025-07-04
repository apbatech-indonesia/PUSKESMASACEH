import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-kanker-payudara",
  templateUrl: "./form-kanker-payudara.component.html",
  styleUrls: ["./form-kanker-payudara.component.sass"],
})
export class FormKankerPayudaraComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}
  hasilSadanisOptions: string[] = [
    "Normal",
    "Ditemukan Benjolan",
    "Curiga Kanker",
  ];

  hasilUsgOptions: string[] = ["Normal", "Simple Cyst", "Non-Simple Cyst"];

  modelPayudara = {
    pemeriksaan: {
      sadanis: false,
      usg: false,
    },
    hasilSadanis: "",
    hasilUsg: "",
  };

  submitFormPayudara() {
    console.log("Data Skrining Kanker Payudara:", this.modelPayudara);
  }
}
