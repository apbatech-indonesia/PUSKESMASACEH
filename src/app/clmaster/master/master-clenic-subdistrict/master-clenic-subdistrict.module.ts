import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterClenicSubDistrictComponent } from "./master-clenic-subdistrict.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [MasterClenicSubDistrictComponent],
  imports: [CommonModule, FormsModule],
  exports: [MasterClenicSubDistrictComponent],
})
export class MasterClenicSubdistrictModule {}
