import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-leher-rahim",
  templateUrl: "./form-leher-rahim.component.html",
  styleUrls: ["./form-leher-rahim.component.sass"],
})
export class FormLeherRahimComponent implements OnInit {
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
    hubunganIntimKanker: "",
  };

  submitForm() {
    console.log(this.model);
  }
}
