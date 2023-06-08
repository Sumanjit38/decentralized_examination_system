//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Teachers from './Components/teachers/Teachers';
import Students from './Components/students/Students';
import Departments from './Components/departments/Departments';
import UserManagement from './Components/userManagement/UserManagement';
import Profile from './Components/students/Profile'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },
  {
    path: '/teachers',
    element: <div><Dashboard WrappedComponent={Teachers}/></div>
  },
  {
    path: '/students',
    element: <div><Dashboard WrappedComponent={Students}/></div>
  },
  {
    path: '/departments',
    element: <div><Dashboard WrappedComponent={Departments}/></div>
  },
  {
    path: '/user-management',
    element: <div><Dashboard WrappedComponent={UserManagement}/></div>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
