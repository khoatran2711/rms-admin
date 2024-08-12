import { environment } from 'src/environments/environment';

const get = (endpoint) => environment.base_URL + '/api/v1/admin/' + endpoint;
const getCommon = (endpoint) => environment.base_URL + '/api/v1/common/' + endpoint;


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
  listRoomType :get("roomType/list"),
  roomTypeDetail :get("roomType/detail"),
  createRoomType :get("roomType/create"),
  updateRoomType :get("roomType/update"),
  deleteRoomType :get("roomType/delete"),

};
export const Common_URL = {
  uploadIMG: getCommon("image/upload"),
}
