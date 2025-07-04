import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterClenicProvinceComponent } from "./master-clenic-province.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [MasterClenicProvinceComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [MasterClenicProvinceComponent],
})
export class MasterClenicProvinceModule {}
