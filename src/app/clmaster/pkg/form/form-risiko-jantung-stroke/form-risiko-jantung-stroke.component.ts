import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form-risiko-jantung-stroke",
  templateUrl: "./form-risiko-jantung-stroke.component.html",
  styleUrls: ["./form-risiko-jantung-stroke.component.sass"],
})
export class FormRisikoJantungStrokeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  modelRisiko = {
    persentase: "",
  };

  submitFormRisiko() {
    console.log("Prediksi Risiko Kardiovaskular:", this.modelRisiko);
  }
}
