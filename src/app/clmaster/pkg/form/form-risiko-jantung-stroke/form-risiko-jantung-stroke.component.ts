import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-risiko-jantung-stroke",
  templateUrl: "./form-risiko-jantung-stroke.component.html",
  styleUrls: ["./form-risiko-jantung-stroke.component.sass"],
})
export class FormRisikoJantungStrokeComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelRisiko = {
    persentase: "",
  };

  submitFormRisiko() {
    console.log("Prediksi Risiko Kardiovaskular:", this.modelRisiko);
  }
}
