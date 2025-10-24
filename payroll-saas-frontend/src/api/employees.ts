import axios from "axios";

const API_URL = "http://localhost:8000/employees/";

export const getEmployees = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

export const createEmployee = async (data: any) => {
  const res = await axios.post(`${API_URL}`, data);
  return res.data;
};

export const updateEmployee = async (id: number, data: any) => {
  const res = await axios.put(`${API_URL}${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id: number) => {
  const res = await axios.delete(`${API_URL}${id}`);
  return res.data;
};