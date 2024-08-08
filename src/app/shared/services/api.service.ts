import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Admin_URL } from 'src/app/common/api_common';
import { register } from 'swiper/element/bundle';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

  login(data){
   return this.httpService.Post(Admin_URL.login,data)
  }

  register(data){
    return this.httpService.Post(Admin_URL.login,data)
  }

  listRoom(filter){
    return this.httpService.Get(Admin_URL.listRoom,filter)
  }
  getRoom(id){
    return this.httpService.Get(Admin_URL.roomDetail,{id:id})
  }
  createRoom(data){
    return this.httpService.Post(Admin_URL.createRoom,data)
  }
  updateRoom(data){
    return this.httpService.Post(Admin_URL.updateRoom,data)
  }
}
