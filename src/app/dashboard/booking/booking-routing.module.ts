import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingServiceComponent } from 'src/app/dashboard/booking/booking-service/booking-service.component';
import { BookingComponent } from 'src/app/dashboard/booking/booking/booking.component';
import { SelectRoomComponent } from 'src/app/dashboard/booking/select-room/select-room.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  },
  {
    path: 'select-room',
    data: { title: 'Select Room ' },
    component: SelectRoomComponent
  },
  {
    path: 'booking-service',
    data: { title: 'Booking Service ' },
    component: BookingServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
