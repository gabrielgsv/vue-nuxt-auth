import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "X-Custom-Header": "foobar",
  },
});

export default api;
