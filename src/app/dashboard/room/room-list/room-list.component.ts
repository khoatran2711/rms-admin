import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  constructor(private apiService: ApiService, private fb: FormBuilder) {}
  roomData = [];
  filter = {
    status: '',
    roomType: '',
    name: '',
  };
  ngOnInit(){

  }
  initData(){

  }
  isConfirmLoading;
  isVisible;
  filteredPeople = [];
  value;
  statusFilter;
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
  getRoomData(filter?){
    this.apiService.listRoom(filter).subscribe(
      res => {
        this.roomData = res
      }
    )
  }
}
