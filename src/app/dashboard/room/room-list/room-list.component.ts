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
  gallery = [
    {
      url: '../../../assets/images/gallery/g1.png',
      caption: 'presentation web-design',
      title: 'Presentation Web Design',
      description: 'A collection of web design images for presentations.',
    },
    {
      url: '../../../assets/images/gallery/g2.png',
      caption: 'web-design',
      title: 'Web Design',
      description: 'Various web design examples and inspirations.',
    },
    {
      url: '../../../assets/images/gallery/g3.png',
      caption: 'ui-design web-design',
      title: 'UI Design Web Design',
      description: 'Examples of UI design for web applications and websites.',
    },
    {
      url: '../../../assets/images/gallery/g4.png',
      caption: 'wireframe',
      title: 'Wireframe',
      description: 'Wireframe designs for planning and prototyping.',
    },
    {
      url: '../../../assets/images/gallery/g5.png',
      caption: 'presentation',
      title: 'Presentation',
      description: 'Images and graphics for presentations.',
    },
    {
      url: '../../../assets/images/gallery/g6.png',
      caption: 'web-design wireframe',
      title: 'Web Design Wireframe',
      description: 'Combining web design and wireframe concepts.',
    },
    {
      url: '../../../assets/images/gallery/g7.png',
      caption: 'ui-design',
      title: 'UI Design',
      description: 'User interface design examples and ideas.',
    },
    {
      url: '../../../assets/images/gallery/g8.png',
      caption: 'wireframe',
      title: 'Wireframe',
      description: 'Wireframe designs for planning and prototyping.',
    },
    {
      url: '../../../assets/images/gallery/g9.png',
      caption: 'web-design',
      title: 'Web Design',
      description: 'Various web design examples and inspirations.',
    },
    {
      url: '../../../assets/images/gallery/g10.png',
      caption: 'ui-design presentation',
      title: 'UI Design Presentation',
      description: 'UI design examples for presentations.',
    },
    {
      url: '../../../assets/images/gallery/g11.png',
      caption: 'web-design',
      title: 'Web Design',
      description: 'Various web design examples and inspirations.',
    },
    {
      url: '../../../assets/images/gallery/g12.png',
      caption: 'presentation wireframe',
      title: 'Presentation Wireframe',
      description: 'Wireframe designs for presentations.',
    },
  ];

  filteredGallery = this.gallery;
  roomData = [];
  pageData = {};
  filter = {
    status: '',
    roomType: '',
    name: '',
  };
  ngOnInit() {
    this.initData();
  }
  initData() {
    this.getRoomData();
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
  getRoomData(filter?) {
    this.apiService.listRoom(filter).subscribe((res) => {
      this.roomData = res['data'];
      this.pageData = res['pageData'];
      console.log(this.roomData);
      console.log(this.pageData);
    });
  }
}
