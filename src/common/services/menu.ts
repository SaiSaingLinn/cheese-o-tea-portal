import axios from "axios";

export async function getMenus() {
  return axios.get(`/menu-item`);
}

export function createMenu(data: Menu) {
  return axios.post("/menu-item", data);
}

export function updateMenu(id: string, data: Menu) {
  return axios.patch(`/menu-item/${id}`, data);
}

export function deleteMenu(id: string) {
  return axios.delete(`/menu-item/${id}`);
}