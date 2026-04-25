import axios from "axios";

const BASE_URL = "http://localhost:8081/api/admin";

export const getAdminStats = () => axios.get(`${BASE_URL}/stats`);
