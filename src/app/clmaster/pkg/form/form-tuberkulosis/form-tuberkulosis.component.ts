import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-tuberkulosis",
  templateUrl: "./form-tuberkulosis.component.html",
  styleUrls: ["./form-tuberkulosis.component.sass"],
})
export class FormTuberkulosisComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  model = {
    batukLama: "",
    kontakTBC: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
