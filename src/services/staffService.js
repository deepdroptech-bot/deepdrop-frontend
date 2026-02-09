import axios from "./api";

export const staffAPI = {
  getAll: () => axios.get("/staff"),

  getById: (id) => axios.get(`/staff/${id}`),

  create: (data) =>
    axios.post("/staff", data, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  update: (id, data) =>
    axios.put(`/staff/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    }),

  addBonus: (id, data) =>
    axios.patch(`/staff/${id}/bonus`, data),

  addDeduction: (id, data) =>
    axios.patch(`/staff/${id}/deduction`, data),

  deactivate: (id) =>
    axios.patch(`/staff/${id}/deactivate`),

  activate: (id) =>
    axios.patch(`/staff/${id}/activate`),

  delete: (id) =>
    axios.delete(`/staff/${id}`)
};