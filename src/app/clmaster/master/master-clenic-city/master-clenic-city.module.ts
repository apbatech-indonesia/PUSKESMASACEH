import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterClenicCityComponent } from './master-clenic-city.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterClenicCityComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MasterClenicCityComponent
  ]
})
export class MasterClenicCityModule { }
