import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModules } from '../../AngularMaterialModules';
import { ProductComponent } from './component/product/product.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModules,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
