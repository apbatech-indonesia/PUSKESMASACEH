import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-demografi-pria",
  templateUrl: "./form-demografi-pria.component.html",
  styleUrls: ["./form-demografi-pria.component.sass"],
})
export class FormDemografiPriaComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  model = {
    status: "",
    rencana: "",
    disabilitas: "",
  };

  statusList = ["Belum Menikah", "Menikah", "Cerai Mati", "Cerai Hidup"];

  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    console.log("Data form:", this.model);
  }
}
