import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-tekanan-gula",
  templateUrl: "./form-tekanan-gula.component.html",
  styleUrls: ["./form-tekanan-gula.component.sass"],
})
export class FormTekananGulaComponent implements OnInit {
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
