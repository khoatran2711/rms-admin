import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  savedCustomerInfo(data){
    localStorage.setItem("customerInfo", JSON.stringify(data))
  }
  getCustomerInfo(){
    return JSON.parse(localStorage.getItem("customerInfo"))
  }
  saveRoomInfo(data){
    localStorage.setItem("roomInfo", JSON.stringify(data))
  }
  getRoomInfo(){
    return JSON.parse(localStorage.getItem("roomInfo"))
  }
  saveProductInfo(data){
    localStorage.setItem("productInfo", JSON.stringify(data))
  }
  getProductInfo(){
    return JSON.parse(localStorage.getItem("productInfo"))
  }

}
