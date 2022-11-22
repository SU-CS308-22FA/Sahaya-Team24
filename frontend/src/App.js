import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignInPage from "./pages/SignInPage";

import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import AddPlayerP from "./pages/AddPlayerP";
import ProfilePage from "./pages/ProfilePage";

import RegisterPage from "./pages/RegisterPage";

import { UserDataContext } from "./contexts/UserDataContext";
import { UserIdContext } from "./contexts/UserIdContext";

const App = () => {
  const [userType, setUserType] = useState(null);
  const value = useMemo(() => ({ userType, setUserType }), [userType, setUserType]);

  const [userId, setUserId] = useState(null);
  const val = useMemo(() => ({ userId, setUserId }), [userId, setUserId]);
  return (
    <UserIdContext.Provider value={val}>
      <UserDataContext.Provider value={value} >
        <BrowserRouter>
          <div className={classes.app} >
            <div className="content">
              <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/RegisterP/CreateProfile" element={<AddPlayerP />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UserDataContext.Provider>
    </UserIdContext.Provider>
  );
};

export default App;
