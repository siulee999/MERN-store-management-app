import useAxiosPrivate from "./useAxiosPrivate";
import axios from "./axios";

export default function useApi() {
  const axiosPrivate = useAxiosPrivate();

  const api = {    
    async fetchData(section) {
      const response = await axios.get(`/${section}`);
      return response.data;
    },

    async createData(section, data) {
      const response = await axiosPrivate.post(`/${section}/add`, data);
      return response.data;
    },

    async updateData(section, data, id) {
      const response = await axiosPrivate.put(`/${section}/edit/${id}`, data);
      return response.data;
    },

    async deleteData(section, id) {
      await axiosPrivate.delete(`/${section}/del/${id}`);
    },

    async searchData(section, query) {
      const response = await axios.get(`/${section}?q=${query}`);
      return response.data;
    },

    async login(credentials) {
      const response = await axios.post("/auth/login", credentials, {
        withCredentials: true
      });
      return response.data.accessToken;
    },
  }
  return api;
}
