import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-sputum-tbc",
  templateUrl: "./form-sputum-tbc.component.html",
  styleUrls: ["./form-sputum-tbc.component.sass"],
})
export class FormSputumTbcComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    metodePemeriksaan: {
      tcm: false,
      bta: false,
    },
    hasilTCM: "",
    hasilBTA: "",
  };

  submitForm() {
    console.log("Pemeriksaan TB:", this.model);
  }
}
