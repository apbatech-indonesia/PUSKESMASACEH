import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-kesehatan-jiwa",
  templateUrl: "./form-kesehatan-jiwa.component.html",
  styleUrls: ["./form-kesehatan-jiwa.component.sass"],
})
export class FormKesehatanJiwaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  opsiJiwa = [
    "Tidak sama sekali",
    "Kurang dari 1 minggu",
    "Lebih dari 1 minggu",
    "Hampir setiap hari",
  ];

  model = {
    semangat: "",
    murung: "",
    cemas: "",
    khawatir: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
