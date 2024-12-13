import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss'],
})
export class ConfirmBookingComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private apiService: ApiService,
    private router: Router,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit() {
    // Thay đổi giá trị
    this.totalPriceRoom = this.calculateTotal().roomTotal;
    this.totalPriceService = this.calculateTotal().serviceTotal;
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.fetchData();
  }

  roomBookingDetails = [];
  customerData;
  serviceBookingDetails = [];
  countNight = 0;
  totalPriceRoom;
  totalPriceService;
  today;
  fetchData() {
    this.today = moment().format('DD/MM/YYYY HH:mm');
    const customerData = this.orderService.getCustomerInfo();
    if (customerData?.orderType == `booking`) {
      customerData['checkInDateTime'] = moment(
        customerData.checkInDate * 1000
      ).format('DD/MM/YYYY HH:mm');
      customerData['checkOutDateTime'] = moment(
        customerData.checkOutDate * 1000
      ).format('DD/MM/YYYY HH:mm');
      let nights = moment(
        customerData['checkOutDateTime'],
        'DD/MM/YYYY HH:mm'
      ).diff(
        moment(customerData['checkInDateTime'], 'DD/MM/YYYY HH:mm'),
        'days'
      );
      this.countNight = nights;
    }

    this.customerData = customerData;
    const roomOrderData = this.orderService.getRoomInfo();
    if (roomOrderData != null) {
      this.roomBookingDetails = roomOrderData.rooms;
    }
    const serviceOrderData = this.orderService.getProductInfo();
    if (serviceOrderData != null) {
      {
        serviceOrderData.forEach((item) => {
          item['usageDateTime'] = moment
            .unix(item['usageDate'])
            .format('DD/MM/YYYY HH:mm');
        });
        this.serviceBookingDetails = serviceOrderData;
      }
    }
  }
  calculateTotal() {
    const roomTotal = this.roomBookingDetails.reduce(
      (sum, room) => sum + room.totalPrice,
      0
    );

    const serviceTotal = this.serviceBookingDetails.reduce(
      (sum, service) => sum + service.totalPrice,
      0
    );

    const totalRevenue = roomTotal + serviceTotal;

    return { roomTotal, serviceTotal, totalRevenue };
  }

  confirmBooking(status): void {
    this.modalService.confirm({
      nzTitle: `Do you want to ${
        status == 'Waitting' ? 'save' : 'payment'
      } this booking?`,
      nzContent: `${status == 'Waitting' ? 'Save' : 'Payment'} this booking`,
      nzOnOk: () => {
        const data = {
          userID: 'admin',
          ...this.customerData,
          rooms: this.roomBookingDetails,
          services: this.serviceBookingDetails,
          totalAmount: this.calculateTotal().totalRevenue,
          status: status,
        };
        this.apiService.createOrder(data).subscribe((res) => {
          this.orderService.clearAllData();
          this.notificationService.createNotification({
            type: 'success',
            title: 'Success',
            message: `${
              status == 'Waitting' ? 'Save' : 'Payment'
            } order successfully`,
            position: 'bottomRight',
          });
          this.router.navigate(['/dashboard/order']);
        });
      },
    });
  }

  cancelBooking(): void {
    this.modalService.confirm({
      nzTitle: 'Do you want to cancel this booking?',
      nzContent: 'Clear all booking',
      nzOnOk: () => {
        this.orderService.clearAllData();
        this.notificationService.createNotification({
          type: 'success',
          title: 'Success',
          message: 'Cancel booking successfully',
          position: 'bottomRight',
        });
        this.router.navigate(['/dashboard/booking']);
      },
    });
  }
}
