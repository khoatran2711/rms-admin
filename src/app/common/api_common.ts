import { environment } from 'src/environments/environment';

const get = (endpoint) => environment.base_URL + '/api/v1/admin/' + endpoint;

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
  // listRoomType :get("room/list"),
  // roomTypeDetail :get("room/detail"),
  // createRoomType :get("room/create"),
  // updateRoomType :get("room/update"),
  // deleteRoomType :get("room/delete"),
};
