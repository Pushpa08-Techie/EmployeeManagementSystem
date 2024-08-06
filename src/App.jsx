// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Registration from './Components/Registration';
import Login from './Components/Login';
import OrgDetails from './Components/OrgDetails';
import PersonalDetailsForm from './Components/PersonalDetailsForm';
import UsersList from './Components/UsersList';
import UsersDetails from './Components/UsersDetails';
import Layout from './Components/Layout'; // Import the new Layout component
import { useState } from 'react';
import Header from './Components/Header';




function App() {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <BrowserRouter className='grid-container'>
      <Routes>
      
        {/* Routes for authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<PersonalDetailsForm />} />
          <Route path="/users/:id" element={<UsersDetails />} />
          <Route path="/org-details" element={<OrgDetails />} />
          
          {/* <Header OpenNvabar={OpenNvabar}/>
      <Nvabar openNvabarToggle={openNvabarToggle} OpenNvabar={OpenNvabar}/>
      <Home /> */}
        </Route>
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
