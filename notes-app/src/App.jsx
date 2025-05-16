// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

import './index.css';
import NotesList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import SyncStatus from './components/SyncStatus';

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/notes", element: <NotesList /> },
    { path: "/notes/create", element: <NoteEditor /> },
    {path:"/notes/edit/:id" ,element:<NoteEditor />},
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <SyncStatus isOnline={navigator.onLine} /> {/* Online status */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
