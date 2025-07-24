import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './tabs.component';
import { TabsRoutingModule } from './tabs-routing.module';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, NgbModule, FormsModule, ReactiveFormsModule,
    TabsRoutingModule, PageTitleModule
  ],
  declarations: [TabsComponent]})
export class TabsModule { }



