import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { kajianperawatComponent } from "./kajianperawat.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { LaddaModule } from "angular2-ladda";

@NgModule({
  declarations: [kajianperawatComponent],
  exports: [kajianperawatComponent],
  imports: [CommonModule, FormsModule, NgSelectModule, LaddaModule],
})
export class KajianperawatModule {}
