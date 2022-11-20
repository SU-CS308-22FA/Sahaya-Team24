import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignInPage from "./pages/SignInPage";

import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import AddPlayerP from  "./pages/AddPlayerP";
import ProfilePage from "./pages/ProfilePage";
import MatchCreateP from "./pages/MatchCreateP";
import RegisterPage from "./pages/RegisterPage";
import MatchDetail from "./pages/MatchDetail";

const App = () => {
  return (
    
    <BrowserRouter>
      <div className={classes.app} >
        <div className="content">
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/RegisterP/CreateProfile/HomePage" element={<HomePage />} />
            <Route path="/RegisterP/CreateProfile" element={<AddPlayerP />} />
            <Route path="/ProfilePage" element={<ProfilePage/>} />
            <Route path="/matchcreation" element={<MatchCreateP/>} />
            <Route path="/MatchDetail" element={<MatchDetail/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
    
  );
};

export default App;
