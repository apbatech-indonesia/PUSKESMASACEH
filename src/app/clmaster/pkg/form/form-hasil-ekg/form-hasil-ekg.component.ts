import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hasil-ekg",
  templateUrl: "./form-hasil-ekg.component.html",
  styleUrls: ["./form-hasil-ekg.component.sass"],
})
export class FormHasilEkgComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelJantung = {
    hasilEkg: "",
  };

  submitFormJantung() {
    console.log("Data Hasil Ekg:", this.modelJantung);
  }
}
