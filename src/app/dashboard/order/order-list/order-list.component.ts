import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalService: NzModalService,
    private notificationService: NotificationService
  ) {}
  orderData = [];
  filter = {
    start: '' as any,
    end: '' as any,
    orderType: '',
    status: '',
    pageData :<any>{
    }
  };
  orderTypeData = ['booking', 'service'];
  statusData = ['Payment', 'Waitting', 'CheckOuted', 'Canceled'];
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

  datePicker;
  roomsOption = [];
  statusOption = [];
  ngOnInit(): void {
    this.fetchOrderData();
  }
  fetchOrderData() {
    this.apiService.listOrder(this.filter).subscribe((res) => {
      this.orderData = res.data;
      this.filter.pageData = res.pageData
    });
  }

  filterByOption(e, type) {
    if (!e) {
      this.filter[type] = '';
    }

    this.fetchOrderData();
  }
  filterByName() {}
  onChangeDate(e) {
    if (this.datePicker[0] && this.datePicker[1]) {
      this.filter.start = moment(this.datePicker[0]).unix() || '';
      this.filter.end = moment(this.datePicker[1]).unix() || '';
    }
    if (e.length === 0) {
      this.filter.start = '';
      this.filter.end = '';
    }
    this.fetchOrderData();
  }
  changeStatusOrder(id, status) {
    const data = {
      id,
      status,
    };
    this.modalService.confirm({
      nzTitle:
        '<span class="text-dark dark:text-white/[.87]">Confirmation</span>',
      nzContent: `<div class="text-light capitalize dark:text-white/60 text-[15px]">Are you sure you want to ${this.statusObject[status].title} this order ?</div>`,
      nzClassName: 'confirm-modal',
      nzOnOk: () => {
        this.apiService.updateStatusOrder(data).subscribe((res) => {
          this.fetchOrderData();
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
  onViewOrderDetail(id) {
    return this.router.navigate(['dashboard/order/detail', id]);
  }
}
