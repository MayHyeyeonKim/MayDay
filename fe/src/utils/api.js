import axios from "axios";
// 상황따라 주소 다름
// const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
// const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
  // baseURL: LOCAL_BACKEND,
  // baseURL: REACT_APP_PROD_BACKEND,
  baseURL: `${BACKEND_PROXY}/api`,

  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
api.interceptors.request.use(
  (request) => {
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    return Promise.reject(error);
  }
);

export default api;
