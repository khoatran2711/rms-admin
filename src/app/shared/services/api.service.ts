import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Admin_URL, Common_URL } from 'src/app/common/api_common';
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

  // fetching Room
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
  deleteRoom(id){
    return this.httpService.Delete(Admin_URL.deleteRoom,{id:id})
  }
  // fetching Room Type
  listRoomType(filter){
    return this.httpService.Get(Admin_URL.listRoomType,filter)
  }
  getRoomType(id){
    return this.httpService.Get(Admin_URL.roomTypeDetail,{id:id})
  }
  createRoomType(data){
    return this.httpService.Post(Admin_URL.createRoomType,data)
  }
  updateRoomType(data){
    return this.httpService.Post(Admin_URL.updateRoomType,data)
  }
  deleteRoomType(id){
    return this.httpService.Delete(Admin_URL.deleteRoomType,id)
  }
  // fetching Service
  listService(filter){
    return this.httpService.Get(Admin_URL.listService,filter)
  }
  getService(id){
    return this.httpService.Get(Admin_URL.ServiceDetail,{id:id})
  }
  createService(data){
    return this.httpService.Post(Admin_URL.createService,data)
  }
  updateService(data){
    return this.httpService.Post(Admin_URL.updateService,data)
  }
  deleteService(id){
    return this.httpService.Delete(Admin_URL.deleteService,{id:id})
  }
  // fetching Service
  listProduct(filter){
    return this.httpService.Get(Admin_URL.listProduct,filter)
  }
  getProduct(id){
    return this.httpService.Get(Admin_URL.productDetail,{id:id})
  }
  createProduct(data){
    return this.httpService.Post(Admin_URL.createProduct,data)
  }
  updateProduct(data){
    return this.httpService.Post(Admin_URL.updateProduct,data)
  }
  deleteProduct(id){
    return this.httpService.Delete(Admin_URL.deleteProduct,{id:id})
  }

  // fetching upload IMG
  uploadIMG(imageFile){
    return this.httpService.Post(Common_URL.uploadIMG,imageFile)
  }
}
