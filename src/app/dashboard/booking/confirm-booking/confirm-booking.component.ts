import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { ApiService } from 'src/app/shared/services/api.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss'],
})
export class ConfirmBookingComponent implements OnInit {
  constructor(private orderService: OrderService, private apiService: ApiService,private router: Router) {}
  ngOnInit(): void {
    this.fetchData();
  }

  roomBookingDetails = [];
  customerData;
  serviceBookingDetails = [];
  fetchData() {
    const customerData = this.orderService.getCustomerInfo();
    customerData['checkInDateTime'] = moment(
      customerData.checkInDate * 1000
    ).format('DD/MM/YYYY HH:mm');
    customerData['checkOutDateTime'] = moment(
      customerData.checkOutDate * 1000
    ).format('DD/MM/YYYY HH:mm');
    this.customerData = customerData;
    const roomOrderData = this.orderService.getRoomInfo();
    this.roomBookingDetails = roomOrderData.rooms;
    const serviceOrderData = this.orderService.getProductInfo();
    serviceOrderData.forEach((item) => {
      item['usageDateTime'] = moment
        .unix(item['usageDate'])
        .format('DD/MM/YYYY HH:mm');
    });
    this.serviceBookingDetails = serviceOrderData;
  }
  calculateTotal(): number {
    const roomTotal = this.roomBookingDetails.reduce(
      (sum, room) => sum + room.totalPrice,
      0
    );

    const serviceTotal = this.serviceBookingDetails.reduce(
      (sum, service) => sum + service.totalPrice,
      0
    );
    return roomTotal + serviceTotal;
  }

  confirmBooking(): void {
    const data = {
      userID: 'admin',
      ...this.customerData,
      rooms: this.roomBookingDetails,
      services: this.serviceBookingDetails,
      totalAmount: this.calculateTotal(),
      status: 'Payment',
      orderType: 'booking',
    };
    this.apiService.createOrder(data).subscribe((res) => {
      this.orderService.clearAllData();
      this.router.navigate(['/dashboard/booking']);
    });
    console.log('data', data);
    console.log('Booking Confirmed!');
  }

  cancelBooking(): void {
    console.log('Booking Cancelled');
  }
}
