import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-gula-darah-lanjutan-hba1c",
  templateUrl: "./form-gula-darah-lanjutan-hba1c.component.html",
  styleUrls: ["./form-gula-darah-lanjutan-hba1c.component.sass"],
})
export class FormGulaDarahLanjutanHba1cComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelHbA1C = {
    hba1c: null,
  };

  submitFormHbA1C() {
    console.log("HbA1C:", this.modelHbA1C);
  }
}
