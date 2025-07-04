import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-gizi-pria",
  templateUrl: "./form-gizi-pria.component.html",
  styleUrls: ["./form-gizi-pria.component.sass"],
})
export class FormGiziPriaComponent implements OnInit {
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
