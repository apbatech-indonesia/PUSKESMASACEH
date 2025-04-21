import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-gizi",
  templateUrl: "./form-gizi.component.html",
  styleUrls: ["./form-gizi.component.sass"],
})
export class FormGiziComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    beratBadan: null,
    tinggiBadan: null,
    lingkarPerut: null,
  };

  submitForm() {
    console.log("Data Gizi:", this.model);
  }
}
