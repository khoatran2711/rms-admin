import { environment } from 'src/environments/environment';

const get = (endpoint) => environment.base_URL + '/api/v1/admin/' + endpoint;
const getCommon = (endpoint) =>
  environment.base_URL + '/api/v1/common/' + endpoint;

export const Admin_URL = {
  login: get('auth/login'),
  register: get('auth/register'),

  // Room URL
  listRoom: get('room/list'),
  roomDetail: get('room/detail'),
  createRoom: get('room/create'),
  updateRoom: get('room/update'),
  deleteRoom: get('room/delete'),

  // Room Type
  listRoomType: get('roomType/list'),
  roomTypeDetail: get('roomType/detail'),
  createRoomType: get('roomType/create'),
  updateRoomType: get('roomType/update'),
  deleteRoomType: get('roomType/delete'),
  // Room Type
  listService: get('service/list'),
  ServiceDetail: get('service/detail'),
  createService: get('service/create'),
  updateService: get('service/update'),
  deleteService: get('service/delete'),
  // Product
  listProduct: get('product/list'),
  productDetail: get('product/detail'),
  createProduct: get('product/create'),
  updateProduct: get('product/update'),
  deleteProduct: get('product/delete'),
  // Employee
  listEmployee: get('employee/list'),
  employeeDetail: get('employee/detail'),
  createEmployee: get('employee/create'),
  updateEmployee: get('employee/update'),
  deleteEmployee: get('employee/delete'),
  // Order
  listOrder: get('order/list'),
  orderDetail: get('order/detail'),
  createOrder: get('order/create'),
  updateOrder: get('order/update'),
  deleteOrder: get('order/delete')
};
export const Common_URL = {
  uploadIMG: getCommon('image/upload'),
};
