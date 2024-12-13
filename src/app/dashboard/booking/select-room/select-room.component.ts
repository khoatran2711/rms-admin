import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { ApiService } from 'src/app/shared/services/api.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.component.html',
  styleUrls: ['./select-room.component.scss'],
})
export class SelectRoomComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private orderService: OrderService,
    private router: Router
  ) {}
  datePicker = [];
  roomData = [];
  roomForm: FormGroup;
  countOfNight = 0;
  ngOnInit(): void {
    const customerData = this.orderService.getCustomerInfo();
    const roomOrderData = this.orderService.getRoomInfo();

    this.datePicker = [
      moment(customerData.checkInDate * 1000).format('YYYY-MM-DD HH:mm'),
      moment(customerData.checkOutDate * 1000).format('YYYY-MM-DD HH:mm'),
    ];
    let startDate = moment.unix(customerData.checkInDate).startOf('day');
    let endDate = moment.unix(customerData.checkOutDate).startOf('day');
    let nights = endDate.diff(startDate, 'days');
    this.countOfNight = nights;
    this.makeForm(roomOrderData);

    if (!roomOrderData) {
      this.addRooms();
    }
    this.fetchRoomData();
  }
  makeForm(d?) {
    this.roomForm = this.fb.group({
      rooms: this.fb.array(d?.rooms.map(item => this.fb.group({
        room: [item.room],
        countPeople: [item.countPeople],
        totalPrice: [item.totalPrice],
      })) || []),
      totalRoom: [d?.totalRoom || null],
      subTotal: [d?.subTotal || null],
    });

  console.log('roomForm', this.roomForm);
  }
  addRooms() {
    const newRoom = this.fb.group({
      room: [null],
      countPeople: [null],
      totalPrice: [null],
    });
    this.rooms.push(newRoom);
  }
  onChange(e) {
    const customerData = this.orderService.getCustomerInfo();

    this.datePicker = [
      moment(customerData.checkInDate * 1000).format('YYYY-MM-DD HH:mm'),
      moment(customerData.checkOutDate * 1000).format('YYYY-MM-DD HH:mm'),
    ];
  }
  disabledDate = (current: Date): boolean => {
    return current && current.getTime() < new Date().setHours(0, 0, 0, 0);
  };
  get rooms(): FormArray {
    return this.roomForm?.get('rooms') as FormArray;
  }
  fetchRoomData() {
    const customerData = this.orderService.getCustomerInfo();
    const filter = {
      start: customerData.checkInDate,
      end: customerData.checkOutDate,
    }
    this.apiService.availableRoom(filter).subscribe((res: any) => {
      this.roomData = res;
      console.log('roomData', this.roomData);
    });

  }
  onChangeRoom(e, i) {
    console.log('onChangeRoom', e, i);
    this.rooms.at(i).patchValue({
      totalPrice: e.price * this.countOfNight,
    });
    this.updateTotalRoom();
    console.log('onChangeRoom', this.roomForm.value);
  }
  updateTotalRoom() {
    const totalPriceRooms = this.roomForm.value.rooms.reduce(
      (acc, room) => acc + room.totalPrice,
      0
    );
    const totalRoom = this.roomForm.value.rooms.length;
    this.roomForm.patchValue({
      subTotal: totalPriceRooms,
      totalRoom: totalRoom,
    });
  }

  submitForm() {
    this.orderService.saveRoomInfo(this.roomForm.value);
    console.log('submitForm', this.roomForm.value);
    this.router.navigate(['/dashboard/booking/booking-service']);
  }
  removeRoom(i) {
    this.rooms.removeAt(i);
    this.updateTotalRoom();
  }
  compareObjects = (o1: any, o2: any) => {
    return o1?.id === o2?.id;
  };
  toInfomation(){
    this.router.navigate(['/dashboard/booking']);
  }
}
