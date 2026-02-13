import axios from "./api";

export const staffAPI = {
  getAll: () => axios.get("/staff"),

  getById: (id) => axios.get(`/staff/${id}`),

  create: (data) => {
    const formData = new FormData();
     formData.append("staffId", data.staffId);
     formData.append("firstName", data.firstName);
     formData.append("lastName", data.lastName);
     formData.append("phone", data.phone);
     formData.append("position", data.position);
     formData.append("baseSalary", Number(data.baseSalary));
     formData.append("nin", data.nin);
     if (data.photo) {
       formData.append("photo", data.photo);
     }
    return axios.post("/staff", formData,);
  },

  update: (id, data) => {
    const formData = new FormData();
     if (data.firstName) formData.append("firstName", data.firstName);
     if (data.lastName) formData.append("lastName", data.lastName);
     if (data.phone) formData.append("phone", data.phone);
     if (data.position) formData.append("position", data.position);
     if (data.baseSalary) formData.append("baseSalary", data.baseSalary);
     if (data.nin) formData.append("nin", data.nin);

     if (data.baseSalary !== undefined && data.baseSalary !== "") {
  formData.append("baseSalary", Number(data.baseSalary));
}
      if (data.photo) formData.append("photo", data.photo);
    return axios.put(`/staff/${id}`, formData);
  },
    

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