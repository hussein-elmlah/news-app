import React, { useState } from 'react';
import { userLogin } from '../../axios/userAuth';

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      await userLogin(formValues)
        .then((response) => {
          console.log('Login successful:', response);
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('Login failed:', error);
          setErrors({ general: 'Login failed. Please try again.' });
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        {errors.general && <div className="alert alert-danger">{errors.general}</div>}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
