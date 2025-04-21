import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hepatitis",
  templateUrl: "./form-hepatitis.component.html",
  styleUrls: ["./form-hepatitis.component.sass"],
})
export class FormHepatitisComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelHepatitis = {
    hbsag: "",
    antihcv: "",
  };

  submitFormHepatitis() {
    console.log("Hasil Hepatitis:", this.modelHepatitis);
  }
}
