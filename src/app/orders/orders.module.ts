import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { OrdersRoutingModule } from './orders-routing.module';
import { UserordersComponent } from './userorders/userorders.component';
import {HttpClientModule} from '@angular/common/http'

import { from } from 'rxjs';
import { OrderdashboardComponent } from './orderdashboard/orderdashboard.component';


@NgModule({
  declarations: [UserordersComponent, OrderdashboardComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,FormsModule,HttpClientModule
  ]
})
export class OrdersModule { }
