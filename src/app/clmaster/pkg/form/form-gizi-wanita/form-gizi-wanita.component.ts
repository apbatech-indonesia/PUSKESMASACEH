import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-gizi-wanita",
  templateUrl: "./form-gizi-wanita.component.html",
  styleUrls: ["./form-gizi-wanita.component.sass"],
})
export class FormGiziWanitaComponent implements OnInit {
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
