import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-karies-gigi-hilang",
  templateUrl: "./form-karies-gigi-hilang.component.html",
  styleUrls: ["./form-karies-gigi-hilang.component.sass"],
})
export class FormKariesGigiHilangComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelGigi = {
    gigiKaries: "",
    gigiHilang: "",
  };

  submitFormGigi() {
    console.log("Data Skrining Gigi:", this.modelGigi);
  }
}
