import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-thorax-tbc",
  templateUrl: "./form-thorax-tbc.component.html",
  styleUrls: ["./form-thorax-tbc.component.sass"],
})
export class FormThoraxTbcComponent implements OnInit {
  @Input() useCaseId: any;
  @Input() encounterId: any;
  @Input() notransaksi: any;
  @Input() idpasien: any;
  @Input() satusehatId: any;

  isLoading: boolean = false;

  static fields = [];

  constructor() {}

  ngOnInit(): void {}
}
