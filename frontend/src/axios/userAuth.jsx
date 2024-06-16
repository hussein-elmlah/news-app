import axiosInstance from "./config";

export const userLogin = (values) => {
  return axiosInstance.post("/users/login", values).then((response) => {
    const token = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }
    return token;
  });
};

export const userLogout = (e) => {
  return axiosInstance.post("/users/logout")
    .then((response) => {
      localStorage.removeItem("token");
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
};

export const userRegister = (values) => {
  // console.log(values);
  return axiosInstance.post("/users/register", values);
};

export const getLoginHistory = () => {
  return axiosInstance.get('/users/history');
};