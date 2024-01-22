import axios from "axios";
import Cookies from "universal-cookie";

const _axios = axios.create({
  //url local server need change when publishing to server
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_SERVER,
});

const mainAxios = {
  request: async (parameter: any) => {
    const { methodType, url, payload, requiresToken, config } = parameter;

    const cookies = new Cookies();
    return new Promise((resolve, reject) => {
      // axios request default options
      const headers = config && config.headers ? config.headers : {};

      if (headers.contentType) {
        headers["Content-Type"] = headers.contentType;
        delete headers.contentType;
      } else {
        headers["Content-Type"] = "application/json";
      }

      // if API endpoint requires a token
      if (requiresToken) {
        // const acToken = localStorage.getItem("idToken");
        const acToken = cookies.get("idToken");
        if (acToken) {
          headers["Authorization"] = `Bearer ${acToken}`;
        }
      }

      _axios
        .request({
          url,
          method: methodType,
          data: payload,
          headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401) {
              const acToken = localStorage.getItem("idToken");
              if (acToken) {
                localStorage.removeItem("idToken");
                localStorage.removeItem("token");
                window.location.reload();
              }
            }
            if (err.response.status >= 400 && err.response.status < 500) {
              console.log("da vao day");
              const errData = err.response.data;
              console.log("::: Error Code :", errData.code);
              console.log("::: Error Message :", errData.message);
              // alert(errData.message)
            } else {
              const errData = err.response.data;
              0.02;

              console.log("::: Error Code :", errData.code);
              // alert(errData.message)
            }
          }
          reject(err);
        });
    });
  },

  getRequest: async function (parameter: any) {
    parameter.methodType = "GET";
    return this.request(parameter);
  },

  postRequest: async function (parameter: any) {
    parameter.methodType = "POST";
    return this.request(parameter);
  },

  putRequest: async function (parameter: any) {
    parameter.methodType = "PUT";
    return this.request(parameter);
  },

  patchRequest: async function (parameter: any) {
    parameter.methodType = "PATCH";
    return this.request(parameter);
  },

  deleteRequest: async function (parameter: any) {
    parameter.methodType = "DELETE";
    return this.request(parameter);
  },
};

export { mainAxios };
