import axios from "axios";

const instance = axios.create({
  baseURL: "https://657567fbb2fbb8f6509d0b65.mockapi.io/api/assesment",
  headers: {},
});

export default instance;
