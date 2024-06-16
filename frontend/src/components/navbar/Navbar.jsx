import React, { useState, useEffect } from 'react';
import { userLogout } from '../../axios/user';
import { fetchUserData, selectUser } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    userLogout().then(() => {
      setIsLoggedIn(false);
      // Optionally clear local storage or perform other logout actions
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">My Website</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/sources">Sources</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/top-subscribed">Top subscribed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/history">History</a>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
