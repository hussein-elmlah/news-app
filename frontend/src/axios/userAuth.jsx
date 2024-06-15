import axiosInstance from './config';

export const userLogin = (values) => {
  return axiosInstance.post('/users/login', values)
    .then(response => {
      if (response.data.token) {
        console.log('token', response.data.token);
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    });
};

export const userLogout = () => {
  console.log('User logged out')
  localStorage.removeItem('token');
  return axiosInstance.post('/users/logout');
};

export const userRegister = (values) => {
  // console.log(values);
  return axiosInstance.post('/users/register', values);
};
