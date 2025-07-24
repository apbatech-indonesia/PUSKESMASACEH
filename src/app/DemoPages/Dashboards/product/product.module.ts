import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TrendModule } from 'ngx-trend';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
@NgModule({
  imports: [
    CommonModule, FontAwesomeModule, ChartsModule, TrendModule, NgbModule,
    ProductRoutingModule, RoundProgressModule
  ],
  declarations: [ProductComponent]})
export class ProductModule { }



