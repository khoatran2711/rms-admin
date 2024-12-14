import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from 'src/app/pages/services/product-list/product-list.component';
import { ServiceListComponent } from 'src/app/pages/services/service-list/service-list.component';

const routes: Routes = [
  { path: '', component: ServiceListComponent },
  {
    path: 'product/:Serviceid',
    data: { title: 'Products' },
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
