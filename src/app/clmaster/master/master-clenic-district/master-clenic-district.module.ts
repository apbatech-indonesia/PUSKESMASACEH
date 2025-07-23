import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterClenicDistrictComponent } from "./master-clenic-district.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [MasterClenicDistrictComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [MasterClenicDistrictComponent],
})
export class MasterClenicDistrictModule {}
