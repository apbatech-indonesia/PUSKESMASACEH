import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-ppok-puma",
  templateUrl: "./form-ppok-puma.component.html",
  styleUrls: ["./form-ppok-puma.component.sass"],
})
export class FormPpokPumaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    merokok: "",
    napasPendek: "",
    dahak: "",
    batuk: "",
    tesSpirometri: "",
  };

  submitForm() {
    console.log("Pemeriksaan PPOK:", this.model);
  }
}
