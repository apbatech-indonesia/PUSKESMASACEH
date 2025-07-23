import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-profil-lipid",
  templateUrl: "./form-profil-lipid.component.html",
  styleUrls: ["./form-profil-lipid.component.sass"],
})
export class FormProfilLipidComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelProfilLipid = {
    kolesterol: "",
    kolesterolInterpretasi: "",
    hdl: "",
    hdlInterpretasi: "",
    ldl: "",
    ldlInterpretasi: "",
    trigliserida: "",
    trigliseridaInterpretasi: "",
  };

  submitFormProfilLipid() {
    console.log("Hasil Profil Lipid:", this.modelProfilLipid);
  }
}
