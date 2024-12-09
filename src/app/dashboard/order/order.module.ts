import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PerfectScrollbarModule } from 'ngx-om-perfect-scrollbar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzFormModule,
    PerfectScrollbarModule,
    NzTableModule,
    NzIconModule,
    NzToolTipModule,
    NzPaginationModule

  ]
})
export class OrderModule { }
