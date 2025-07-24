import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ListGroupsComponent } from './list-groups.component';
import { ListGroupsRoutingModule } from './list-groups-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from '../../../Layout/Components/page-title/page-title.module';
@NgModule({
  imports: [
    CommonModule, NgbModule, NgxLoadingModule.forRoot({}),
    ListGroupsRoutingModule, PageTitleModule, RoundProgressModule
  ],
  declarations: [ListGroupsComponent]})
export class ListGroupsModule { }



