import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  isLoading = true;
  showContent = false;
  avatarUrl;
  passwordVisible = false;
  password?: string;
  isOpenaddRoom = false;
  validateForm!: FormGroup;
  orderRoomForm: FormGroup;
  datePicker = [];
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit() {
    this.makeOrderForm();
    const customerData = this.orderService.getCustomerInfo();
    console.log('customerData', customerData);
    if (customerData) {
      console.log('customerData', 'have data');
      if (customerData?.orderType == `booking`) {
        console.log('customerData', 'booking');
        this.datePicker = [
          moment(customerData.checkInDate * 1000).format('YYYY-MM-DD HH:mm'),
          moment(customerData.checkOutDate * 1000).format('YYYY-MM-DD HH:mm'),
        ];
        this.makeOrderForm(customerData);
      }
      if (customerData?.orderType == 'service') {
        this.orderService.clearAllData();
      }
    }

    this.loadData();
  }
  handleChange(e) {}
  close() {}
  makeOrderForm(d?) {
    this.validateForm = this.fb.group({
      customerName: [d?.customerName, [Validators.required]],
      phoneNumber: [d?.phoneNumber, [Validators.required]],
      email: [d?.email, [Validators.required]],
      identityNumber: [d?.identityNumber, [Validators.required]],
      checkInDate: [d?.checkInDate, [Validators.required]],
      checkOutDate: [d?.checkOutDate, [Validators.required]],
      userID: ['66a786fe70935a10e380d08e', [Validators.required]],
      orderType: ['booking', [Validators.required]],
    });
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
    if (result[0]) {
      const startDateTimestamp = moment(result[0]).unix();
      this.validateForm.controls['checkInDate'].setValue(startDateTimestamp);
    }
    if (result[1]) {
      const endDateTimestamp = moment(result[1]).unix();
      this.validateForm.controls['checkOutDate'].setValue(endDateTimestamp);
    }
    console.log(this.validateForm.value);
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
  disabledDate = (current: Date): boolean => {
    return current && current.getTime() < new Date().setHours(0, 0, 0, 0);
  };
  //Step

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.orderService.savedCustomerInfo(this.validateForm.value);
      this.router.navigate(['/dashboard/booking/select-room']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({
            onlySelf: true,
          });
        }
      });
    }
  }
  resetAll() {
    this.datePicker = [];
    this.validateForm.reset();
    this.validateForm.controls['userID'].setValue('66a786fe70935a10e380d08e');
    this.validateForm.controls['orderType'].setValue('booking');
    this.orderService.clearAllData();
  }
}
