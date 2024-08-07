import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { CategoryComponent } from './component/category/category.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
