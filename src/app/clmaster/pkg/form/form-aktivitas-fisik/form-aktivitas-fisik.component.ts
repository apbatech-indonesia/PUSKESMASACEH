import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-aktivitas-fisik",
  templateUrl: "./form-aktivitas-fisik.component.html",
  styleUrls: ["./form-aktivitas-fisik.component.sass"],
})
export class FormAktivitasFisikComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  model = {
    olahraga: "",
    frekuensi: null,
    durasi: null,
  };

  submitForm() {
    console.log(this.model);
  }
}
