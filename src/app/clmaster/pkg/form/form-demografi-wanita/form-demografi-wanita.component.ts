import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-form-demografi-wanita",
  templateUrl: "./form-demografi-wanita.component.html",
  styleUrls: ["./form-demografi-wanita.component.sass"],
})
export class FormDemografiWanitaComponent implements OnInit {
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
    status: "",
    rencana: "",
    hamil: "",
    disabilitas: "",
  };

  statusList = ["Belum Menikah", "Menikah", "Cerai Mati", "Cerai Hidup"];

  submitForm() {
    console.log("Data submitted:", this.model);
    // kamu bisa ganti console.log dengan kirim ke API atau modal close dsb.
  }
}
