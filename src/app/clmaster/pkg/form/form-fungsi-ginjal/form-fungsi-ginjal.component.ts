import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-fungsi-ginjal",
  templateUrl: "./form-fungsi-ginjal.component.html",
  styleUrls: ["./form-fungsi-ginjal.component.sass"],
})
export class FormFungsiGinjalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelGinjal = {
    ureum: null,
    kreatinin: null,
    elfg: null,
  };

  submitFormGinjal() {
    console.log("Fungsi Ginjal:", this.modelGinjal);
  }
}
