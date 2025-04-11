import axios from "axios";

export function adminLogin(data: Login) {
  return axios.post("/admin/login", data);
}