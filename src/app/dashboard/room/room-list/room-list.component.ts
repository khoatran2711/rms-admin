import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  constructor(private apiService: ApiService, private fb: FormBuilder) {}
  formatNumber = formatNumber;
  switchValue = true;
  options = {
    suffix: ' USD',
    prefix: '$',
    thousands: ',',
    decimal: '.',
    // inputMode: CurrencyMaskInputMode.NATURAL,
  };
  roomsOption = [];
  statusOption = [
    {
      en: 'Available',
      vi: 'Sẵn sàng',
    },
    {
      en: 'Occupied',
      vi: 'Đang sử dụng',
    },
    {
      en: 'Reserved',
      vi: 'Đã đặt',
    },
    {
      en: 'Out of Service',
      vi: 'Không sử dụng',
    },
    {
      en: 'Cleaning',
      vi: 'Đang dọn dẹp',
    },
    {
      en: 'Checked Out',
      vi: 'Đã trả phòng',
    },
  ];
  isOpenCreateType = false;
  host = environment.base_URL;
  roomTypeData = [];
  roomData = [];
  originRoomData = [];
  pageData = {
    totalDocs: 1,
    limit: 10,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };
  searchNameTypeRoom = '';
  filter = {
    status: '',
    roomTypeID: '',
    name: '',
  };
  submitedRoom = false;
  submitedTypeRoom = false;
  isConfirmLoading;
  isVisible;
  // filteredPeople = [];
  // value;
  statusFilter;
  roomTypeForm: FormGroup;
  roomForm: FormGroup;

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.getRoomData();
    this.getRoomTypeData();
    this.makeRoomTypeForm();
    this.makeRoomForm();
  }
  clearFilter() {
    this.filter.name = '';
    this.filter.roomTypeID = '';
    this.filter.status = '';
  }

  makeRoomTypeForm(d?) {
    this.roomTypeForm = this.fb.group({
      id: [d?.id],
      name: [d?.name, Validators.required],
      imageUrl: [d?.imageUrl || 'https://placehold.co/250x200'],
      maxPeople: [d?.maxPeople, Validators.required],
      decscription: [d?.decscription],
    });
  }
  makeRoomForm(d?) {
    this.roomForm = this.fb.group({
      id: [d?.id],
      roomTypeID: [d?.roomTypeID, Validators.required],
      name: [d?.name, Validators.required],
      price: [d?.price, Validators.required],
      status: [
        (this.switchValue && 'Available') || 'Out of Service',
        Validators.required,
      ],
    });
  }

  filterByOption() {
    this.filter.name = '';
    this.getRoomData(this.filter);
  }

  filterByName() {
    let name = this.filter.name;
    let filterData = this.originRoomData.filter((item) =>
      item.name.includes(name)
    );
    this.roomData = filterData;
  }
  searchById() {}

  handleCancel() {
    this.isVisible = false;
  }
  showModal(id?) {
    if (id) {
      this.apiService.getRoom(id).subscribe((res) => {
        this.makeRoomForm(res[0]);
      });
    }
    this.makeRoomForm();
    this.isVisible = true;
  }
  getRoomData(filter?) {
    this.apiService.listRoom(this.filter).subscribe((res) => {
      this.roomData = res['data'];
      this.originRoomData = res['data'];
      this.pageData = res['pageData'];
      console.log(this.pageData)
    });
  }
  getRoomTypeData(filte?) {
    this.apiService.listRoomType(filte).subscribe((res) => {
      this.roomTypeData = res['data'];
      this.roomsOption = res['data'];
    });
  }
  openCreateTypeRoom(id?) {
    if (id) {
      this.apiService.getRoomType(id).subscribe((res) => {
        this.makeRoomTypeForm(res);
        this.isOpenCreateType = true;
      });
    }
    this.makeRoomTypeForm();
    this.isOpenCreateType = true;
  }
  closeCreateTypeRoom() {
    this.isOpenCreateType = false;
    console.log(this.isOpenCreateType);
  }
  onUploadImage(event) {
    let fileInput = event.target.files[0];
    if (fileInput) {
      let formdata = new FormData();
      formdata.set('file', fileInput);
      this.apiService.uploadIMG(formdata).subscribe((res) => {
        this.roomTypeForm.get('imageUrl').setValue(res);
      });
    }
  }
  submitRoomTypeForm() {
    if (this.roomTypeForm.invalid) {
      this.submitedTypeRoom = true;
      // console.log(this.roomTypeForm['name'].errors)
      Object.values(this.roomTypeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const id = this.roomTypeForm.get('id').value;
    console.log(this.roomTypeForm.value);
    if (id) {
      this.apiService.updateRoomType(this.roomTypeForm.value).subscribe((_) => {
        this.clearFilter();
        this.getRoomTypeData();
        this.closeCreateTypeRoom();
      });
      this.submitedTypeRoom = false;

      return;
    }
    this.apiService.createRoomType(this.roomTypeForm.value).subscribe((_) => {
      this.clearFilter();
      this.getRoomTypeData();
      this.closeCreateTypeRoom();
    });
    this.submitedTypeRoom = false;
    return;
  }
  onDeleteRoomType(id) {
    let data = {
      id,
    };
    this.apiService.deleteRoomType(data).subscribe((_) => {
      this.getRoomTypeData();
    });
  }
  onSearch() {
    if (!this.searchNameTypeRoom) {
      this.apiService.listRoomType({}).subscribe((res) => {
        this.roomTypeData = res['data'];
      });
    }
    let searchData = this.roomTypeData.filter((item) =>
      item.name.toLowerCase().includes(this.searchNameTypeRoom.toLowerCase())
    );
    this.roomTypeData = searchData;
  }
  get type() {
    return this.roomTypeForm.controls;
  }
  get roomControl() {
    return this.roomForm.controls;
  }
  submitRoomForm() {
    this.submitedRoom = true;
    if (this.roomForm.valid) {
      let id = this.roomForm.get('id').value;
      let data = this.roomForm.value;
      if (id) {
        this.apiService.updateRoom(data).subscribe((_) => {
          this.getRoomData(this.filter);
          this.isVisible = false;
        });
        return;
      }
      this.apiService.createRoom(data).subscribe((_) => {
        this.getRoomData(this.filter);
        this.isVisible = false;
      });
      return;
    }
    Object.values(this.roomForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
    return;
  }
  onDelete(id) {
    console.log(id);
    this.apiService.deleteRoom(id).subscribe((res) => {
      this.getRoomData({});
    });
  }
  // onSearchByName(){
  //   let searchName = this.filterByName
  // }
}
