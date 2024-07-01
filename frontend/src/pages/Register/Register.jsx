import React, { useState } from 'react';
import { userRegister } from '../../axios/user';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};

    if (!values.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    } else if (values.fullName.trim().length < 8) {
      errors.fullName = 'Full Name must be at least 8 characters';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (values.password.trim().length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!values.rePassword.trim()) {
      errors.rePassword = 'Confirm Password is required';
    } else if (values.password !== values.rePassword) {
      errors.rePassword = 'Passwords must match';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      userRegister(formValues)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setErrors({ email: 'Email already exists' });
          } else {
            console.error('Registration failed:', error);
          }
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
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
        <div className="mb-3">
          <label htmlFor="rePassword" className="form-label">Re-enter Password</label>
          <input
            type="password"
            className={`form-control ${errors.rePassword ? 'is-invalid' : ''}`}
            id="rePassword"
            name="rePassword"
            value={formValues.rePassword}
            onChange={handleChange}
          />
          {errors.rePassword && <div className="invalid-feedback">{errors.rePassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
