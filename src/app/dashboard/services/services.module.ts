import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProductListComponent } from './product-list/product-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    ServiceListComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    NzInputModule,
    AngularSvgIconModule.forRoot(),
    NzDropDownModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzTableModule
  ]
})
export class ServicesModule { }
