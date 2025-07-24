import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownsComponent } from './dropdowns.component';
import { DropdownsRoutingModule } from './dropdowns-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, NgbModule,
    DropdownsRoutingModule, PageTitleModule
  ],
  declarations: [DropdownsComponent]})
export class DropdownsModule { }



