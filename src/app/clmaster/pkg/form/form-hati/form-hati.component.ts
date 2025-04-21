import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hati",
  templateUrl: "./form-hati.component.html",
  styleUrls: ["./form-hati.component.sass"],
})
export class FormHatiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    hepBPositif: "",
    keluargaHepB: "",
    hubunganNonPasangan: "",
    transfusi: "",
    hemodialisis: "",
    narkoba: "",
    odhiv: "",
    hepC: "",
    kolesterol: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
