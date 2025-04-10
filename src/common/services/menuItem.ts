import axios from "axios";

export async function getMenuItems(search?: string) {
  return axios.get(`/menu-item?${search}`);
}