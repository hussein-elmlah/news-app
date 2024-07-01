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
    .then(() => {
      localStorage.removeItem("token");
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
};

export const userRegister = (values) => {
  return axiosInstance.post("/users/register", values);
};

export const getLoginHistory = () => {
  return axiosInstance.get('/users/history');
};

export const getUserData = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};