import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Admin_URL, Common_URL } from 'src/app/common/api_common';
import { register } from 'swiper/element/bundle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }
  host = environment.base_URL;
  login(data){
   return this.httpService.Post(Admin_URL.login,data)
  }

  register(data){
    return this.httpService.Post(Admin_URL.login,data)
  }

  // fetching infomation of user
  getInfomation(){
    return this.httpService.Get(Admin_URL.getInfomatino)
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
  availableRoom(filter){
    return this.httpService.Get(Admin_URL.availableRoom,filter)
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
  // fetching Employee
  listEmployee(filter){
    return this.httpService.Get(Admin_URL.listEmployee,filter)
  }
  getEmployee(id){
    return this.httpService.Get(Admin_URL.employeeDetail,{id:id})
  }
  createEmployee(data){
    return this.httpService.Post(Admin_URL.createEmployee,data)
  }
  updateEmployee(data){
    return this.httpService.Post(Admin_URL.updateEmployee,data)
  }
  deleteEmployee(id){
    return this.httpService.Delete(Admin_URL.deleteEmployee,{id:id})
  }

  // fetching Order
  listOrder(filter){
    return this.httpService.Get(Admin_URL.listOrder, filter)
  }
  getOrder(id){
    return this.httpService.Get(Admin_URL.orderDetail, {id: id})
  }
  createOrder(data){
    return this.httpService.Post(Admin_URL.createOrder, data)
  }
  updateStatusOrder(data){
    return this.httpService.Post(Admin_URL.updateStatusOrder, data)
  }
  deleteOrder(id){
    return this.httpService.Delete(Admin_URL.deleteOrder, {id: id})
  }

  //Fetching Role
  listRole(filter){
    return this.httpService.Get(Admin_URL.listRole, filter)
  }
  getRole(id){
    return this.httpService.Get(Admin_URL.roleDetail, {id: id})
  }
  createRole(data){
    return this.httpService.Post(Admin_URL.createRole, data)
  }
  updateRole(data){
    return this.httpService.Post(Admin_URL.updateRole, data)
  }
  deleteRole(id){
    return this.httpService.Delete(Admin_URL.deleteRole, {id: id})
  }
  getPermission(data){
    return this.httpService.Get(Admin_URL.getRolePermission,data)
  }

  // Report API
  getOverviewData(){
    return this.httpService.Get(Admin_URL.overview)
  }
  getSaleReport(filter){
    return this.httpService.Get(Admin_URL.saleReport, filter)
  }

  // fetching upload IMG
  uploadIMG(imageFile){
    return this.httpService.Post(Common_URL.uploadIMG,imageFile)
  }
}
