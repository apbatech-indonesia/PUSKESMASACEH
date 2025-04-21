import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-tekanan-gula-darah",
  templateUrl: "./form-tekanan-gula-darah.component.html",
  styleUrls: ["./form-tekanan-gula-darah.component.sass"],
})
export class FormTekananGulaDarahComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    tekananDarahTinggi: "",
    diabetes: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
