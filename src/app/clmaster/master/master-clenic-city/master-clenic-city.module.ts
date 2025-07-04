import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterClenicCityComponent } from "./master-clenic-city.component";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [MasterClenicCityComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [MasterClenicCityComponent],
})
export class MasterClenicCityModule {}
