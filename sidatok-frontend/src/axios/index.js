import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL_API}`,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message === "Token is Expired"
      ) {
        originalConfig._retry = true;

        try {
          const rs = await client.post("/auth/refresh");

          const { token } = rs.data.data;
          localStorage.setItem("ACCESS_TOKEN", token);

          return client(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default client;
