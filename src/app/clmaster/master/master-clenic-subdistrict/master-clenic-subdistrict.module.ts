import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterClenicSubDistrictComponent } from "./master-clenic-subdistrict.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [MasterClenicSubDistrictComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [MasterClenicSubDistrictComponent],
})
export class MasterClenicSubdistrictModule {}
