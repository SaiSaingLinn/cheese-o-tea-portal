import axios from "axios";

export async function getCategories() {
  return axios.get(`/category`);
}

export function createCategory(data: Category) {
  return axios.post("/category", data);
}

export function updateCategory(id: string, data: Category) {
  return axios.patch(`/category/${id}`, data);
}

export function deleteCategory(id: string) {
  return axios.delete(`/category/${id}`);
}