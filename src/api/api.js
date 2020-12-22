import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let API_URL = "";

let DEV = true;

if (DEV === true) {
  API_URL = "http://localhost:5000";
} else {
  API_URL = "https://api.cshops.in";
}

const getToken = () => {
  let userData = JSON.parse(localStorage.getItem("aboutus"));
  return userData && userData.token;
};

const Axios = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json", "x-auth-token": getToken() },
});

Axios.defaults.timeout = 15000;

Axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      toast.error(response.data.message);
    } else {
      if (response.data.status === false) {
        toast.error(response.data.message);
      } else {
        toast.success("Success");
        let getdata = JSON.parse(localStorage.getItem("aboutus"));
        let { token } = getdata || "";
        let aboutData = { data: response.data, token: token };
        localStorage.setItem("aboutus", JSON.stringify(aboutData));
        return aboutData;
      }
    }
  },
  (error) => {
    if (error) {
      toast.error(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export { Axios };
