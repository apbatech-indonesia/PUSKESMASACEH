import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-mata-telinga",
  templateUrl: "./form-mata-telinga.component.html",
  styleUrls: ["./form-mata-telinga.component.sass"],
})
export class FormMataTelingaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    tajamPendengaran: "",
    otoskop: "",
    etumblin: "",
    snellen: "",
    pinhole: "",
    pupil: "",
  };

  submitForm() {
    console.log("Form dikirim:", this.model);
    // Di sini bisa kamu kirim ke API atau simpan sesuai kebutuhan
  }
}
