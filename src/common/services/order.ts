import axios from "axios";

export async function getOrders() {
  return axios.get(`/order`);
}

export async function createOrder(data: Order) {
  return axios.post(`/order`, data);
}