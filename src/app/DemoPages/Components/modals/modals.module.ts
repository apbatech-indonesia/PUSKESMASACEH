import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals.component';
import { ModalsRoutingModule } from './modals-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule,
    ModalsRoutingModule, PageTitleModule],
  declarations: [ModalsComponent]})
export class ModalsModule { }



