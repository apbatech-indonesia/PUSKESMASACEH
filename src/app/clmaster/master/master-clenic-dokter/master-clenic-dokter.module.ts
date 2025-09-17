import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterClenicDokterComponent } from "./master-clenic-dokter.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [MasterClenicDokterComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [MasterClenicDokterComponent],
})
export class MasterClenicDokterModule {}
