import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  constructor(private apiService: ApiService, private fb: FormBuilder) {}
  isOpenCreateType = false;
  selectClass =
    'capitalize [&>nz-select-top-control]:border-normal dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[46px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[4px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60';
  host = environment.base_URL;
  roomTypeData = [];
  roomData = [];
  pageData = {};
  searchNameTypeRoom = '';
  filter = {
    status: '',
    roomType: '',
    name: '',
  };
  submitedTypeRoom = false;
  isConfirmLoading;
  isVisible;
  filteredPeople = [];
  value;
  statusFilter;
  roomTypeForm: FormGroup;

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.getRoomData();
    this.getRoomTypeData();
    this.makeRoomTypeForm();
  }

  makeRoomTypeForm(d?) {
    this.roomTypeForm = this.fb.group({
      id: [d?.id],
      name: [d?.name, Validators.required],
      imageUrl: [
        d?.imageUrl || 'https://placehold.co/250x200',
        Validators.required,
      ],
      maxPeople: [d?.maxPeople, Validators.required],
      decscription: [d?.decscription],
    });
  }
  filterByStatus() {}
  contactSearchValue;
  filterByContact() {}
  searchById() {}

  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {}
  showModal() {
    this.isVisible = true;
    console.log('show');
  }
  getRoomData(filter?) {
    this.apiService.listRoom(filter).subscribe((res) => {
      this.roomData = res['data'];
      this.pageData = res['pageData'];
      console.log(this.roomData);
      console.log(this.pageData);
    });
  }
  getRoomTypeData(filte?) {
    this.apiService.listRoomType(filte).subscribe((res) => {
      this.roomTypeData = res['data'];
      console.log(this.roomTypeData);
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
    this.submitedTypeRoom = true;
    if (this.roomTypeForm.valid) {
      const id = this.roomTypeForm.get('id').value;
      console.log(this.roomTypeForm.value);
      if (id) {
        this.apiService
          .updateRoomType(this.roomTypeForm.value)
          .subscribe((_) => {
            this.getRoomTypeData();
            this.closeCreateTypeRoom();
          });
        this.submitedTypeRoom = false;

        return;
      }
      this.apiService.createRoomType(this.roomTypeForm.value).subscribe((_) => {
        this.getRoomTypeData();
        this.closeCreateTypeRoom();
      });
      this.submitedTypeRoom = false;
      return;
    }
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
}
