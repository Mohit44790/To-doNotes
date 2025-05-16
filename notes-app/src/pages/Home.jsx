import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice'; // Import logout action

const Home = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth); // Access user and token from Redux state

  // Check if the user is logged in by checking token
  useEffect(() => {
    if (token) {
      // If token exists, assume the user is logged in
    } else {
      // If token does not exist, user is logged out
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action from Redux
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1683309567810-4d232ee83d2f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
      }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
    >
      {/* Navigation Bar */}
      <nav className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white p-4 fixed top-0 left-0 z-50">
  <div className="grid grid-cols-5 gap-4 items-center">
    <ul className="flex justify-start space-x-6 col-span-4">
      <li>
        <Link to="/" className="hover:text-green-200 transition-all duration-300">Home</Link>
      </li>
      <li>
        <Link to="/notes" className="hover:text-green-200 transition-all duration-300">My Notes</Link>
      </li>
      <li>
        <Link to="/notes/create" className="hover:text-green-200 transition-all duration-300">Create Notes</Link>
      </li>
    </ul>

    {/* Conditionally render Login/Logout */}
    <div className="col-span-1 text-right">
      {user ? (
   <Link to={"/login"}>    <button
          onClick={handleLogout}
          className="hover:bg-red-700 text-white bg-red-500 rounded-md px-4 py-2 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button></Link> 
      ) : (
        <Link
          to="/login"
          className="hover:bg-blue-600 text-white bg-blue-500 rounded-md px-4 py-2 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </Link>
      )}
    </div>
  </div>
</nav>


      <div className="text-center mt-20">
       <h1 className="text-5xl font-bold neon-text mb-8">Welcome to the Notes App!</h1>

        <Link
          to="/notes"
          className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          View Notes
        </Link>
      </div>
    </div>
  );
};

export default Home;
