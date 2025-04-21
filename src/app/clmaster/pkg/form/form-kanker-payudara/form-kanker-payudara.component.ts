import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-kanker-payudara",
  templateUrl: "./form-kanker-payudara.component.html",
  styleUrls: ["./form-kanker-payudara.component.sass"],
})
export class FormKankerPayudaraComponent implements OnInit {
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
