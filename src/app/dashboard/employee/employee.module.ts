import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { EmployeeUpsertComponent } from './employee-upsert/employee-upsert.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeUpsertComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NzSkeletonModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    AngularSvgIconModule.forRoot(),
    NzDropDownModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NzUploadModule,
    NzSelectModule,
    NzDatePickerModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class EmployeeModule { }
