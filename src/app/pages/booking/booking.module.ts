import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking/booking.component';
import { SelectRoomComponent } from './select-room/select-room.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';


@NgModule({
  declarations: [
    BookingComponent,
    SelectRoomComponent,
    BookingServiceComponent,
    ConfirmBookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzEmptyModule,
    NzDrawerModule,
    NzSelectModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzUploadModule,
    NzModalModule,
    NzDropDownModule,
    NzTabsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BookingModule { }
