import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './pages/login';
import UserPage from './pages/userPage'
import AdminPage from './pages/adminPage';
import ErrorPage from './pages/ErrorPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path="/" element={<App/>}></Route> */}
        <Route path="/" element={<Login/>}></Route>
        <Route exact path="/adminPage" element={<AdminPage/>}></Route> 
        <Route exact path="/userPage" element={<UserPage/>}></Route> 
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);