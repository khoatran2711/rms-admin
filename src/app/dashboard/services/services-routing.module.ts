import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from 'src/app/dashboard/services/product-list/product-list.component';
import { ServiceListComponent } from 'src/app/dashboard/services/service-list/service-list.component';

const routes: Routes = [
  { path: '', component: ServiceListComponent },
  {
    path: 'product/:Serviceid',
    data: { title: 'Product List' },
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
