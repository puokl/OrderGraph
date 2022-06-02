import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const axiosInt = axios.create();

axiosInt.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const mock = new AxiosMockAdapter(axiosInt, { delayResponse: 0 });

export default axiosInt;
