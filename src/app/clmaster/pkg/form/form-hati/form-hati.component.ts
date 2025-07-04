import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hati",
  templateUrl: "./form-hati.component.html",
  styleUrls: ["./form-hati.component.sass"],
})
export class FormHatiComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

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
