import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from 'src/app/dashboard/order/order-detail/order-detail.component';
import { OrderListComponent } from 'src/app/dashboard/order/order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
  },
  {
    path: 'detail/:id',
    data: {
      title: 'Order Detail',
    },
    component: OrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
