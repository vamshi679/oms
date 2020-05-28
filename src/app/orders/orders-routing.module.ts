import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserordersComponent } from './userorders/userorders.component';
import { OrderdashboardComponent } from './orderdashboard/orderdashboard.component';


const routes: Routes = [{path:'userorders',component:UserordersComponent},{path:'orderdashboard',component:OrderdashboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
