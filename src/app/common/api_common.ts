import { environment } from "src/environments/environment"

const get = (endpoint) => environment.base_URL + "/api/v1/admin/" + endpoint


export const Admin_URL ={
  login: get("auth/login"),
  register: get("auth/register"),
}
