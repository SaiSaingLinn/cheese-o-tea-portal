/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const setupResponseInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error: any) => {
      return Promise.reject(error);
    }
  );
};

export const setupRequestInterceptor = () => {
  axios.interceptors.request.use(
    (config: any) => {
      const request = { ...config };
      if (!request.url.startsWith("http")) {
        request.url = `${'http://localhost:3000/v1'}${request.url}`; // should be env variable
      }

      // token will go here
      // if (token)
      //   request.headers = {
      //     ...request.headers,
      //     Authorization: `Bearer ${token}`,
      //   };
      return request;
    },
    (error) => Promise.reject(error)
  );
};
