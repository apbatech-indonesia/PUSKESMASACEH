import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-hepatitis",
  templateUrl: "./form-hepatitis.component.html",
  styleUrls: ["./form-hepatitis.component.sass"],
})
export class FormHepatitisComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}

  modelHepatitis = {
    hbsag: "",
    antihcv: "",
  };

  submitFormHepatitis() {
    console.log("Hasil Hepatitis:", this.modelHepatitis);
  }
}
