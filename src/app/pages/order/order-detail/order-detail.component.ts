import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderID;
  usageDate = [];
  orderData;
  serviceData;
  totalPriceRoom = 0;
  totalPriceService = 0;
  countNight = 0;
  paymentBtnClass;

  statusObject = {
    Payment: {
      title: 'Payment',
      color: 'active',
    },
    Waitting: {
      title: 'Waitting',
      color: 'warning',
    },
    CheckOuted: {
      title: 'Check Outed',
      color: 'primary',
    },
    Canceled: {
      title: 'Canceled',
      color: 'danger',
    },
  };
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private modalService: NzModalService,
    private notificationService: NotificationService
  ) {
    this.orderID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fetchOrderDetail();
  }
  fetchOrderDetail() {
    this.apiService.getOrder(this.orderID).subscribe((res: any) => {
      this.orderData = res[0];
      this.usageDate = [
        moment(this.orderData.checkInDate * 1000).format('DD-MM-YYYY HH:mm'),
        moment(this.orderData.checkOutDate * 1000).format('DD-MM-YYYY HH:mm'),
      ];
      this.paymentBtnClass = `  bg-${
        this.orderData?.status == 'Waitting'
          ? 'green-500 text-white'
          : 'gray-300 text-gray-800'
      }  py-2 px-4 rounded`;
      let startDate = moment.unix(this.orderData.checkInDate).startOf('day');
      let endDate = moment.unix(this.orderData.checkOutDate).startOf('day');
      this.countNight = endDate.diff(startDate, 'days');
      this.totalPriceRoom = this.totalRoomPrice();
      this.totalPriceService = this.totalServicePrice();
    });
  }
  totalRoomPrice() {
    const totalAmount = this.orderData?.rooms.reduce((acc, room) => {
      return (acc += room.totalPrice);
    }, 0);
    return totalAmount;
  }
  totalServicePrice() {
    const totalAmount = this.orderData?.services.reduce((acc, service) => {
      return (acc += service.totalPrice);
    }, 0);
    return totalAmount;
  }
  changeStatusOrder(status) {
    const data = {
      id: this.orderID,
      status,
    };
    this.modalService.confirm({
      nzTitle:
        '<span class="text-dark dark:text-white/[.87]">Confirmation</span>',
      nzContent: `<div class="text-light capitalize dark:text-white/60 text-[15px]">Are you sure you want to ${this.statusObject[status].title} this order ?</div>`,
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        this.apiService.updateStatusOrder(data).subscribe((res) => {
          this.fetchOrderDetail();
          this.notificationService.createNotification({
            type: 'success',
            title: 'Success',
            message: `Update status order success`,
            position: 'bottomRight',
          });
        });
      },
    });
  }
}
