import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignInPage from "./pages/SignInPage";

import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import AddPlayerP from "./pages/AddPlayerP";
import ProfilePage from "./pages/ProfilePage";
import MatchCreateP from "./pages/MatchCreateP";
import RegisterPage from "./pages/RegisterPage";
import MatchDetailPage from "./pages/MatchDetailPage"
import SearchUser from "./pages/SearchUser";

import { UserDataContext } from "./contexts/UserDataContext";
import { UserIdContext } from "./contexts/UserIdContext";
import OtherPlayerProfile from "./components/OtherPlayerProfile";
import OtherRefereeProfile from "./components/OtherRefereeProfile";
import MatchEditPage from "./pages/MatchEditPage"


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
                <Route path="/Player" element={<OtherPlayerProfile />} />
                <Route path="/Referee" element={<OtherRefereeProfile />} />
                <Route path="/search" element={<SearchUser />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
                <Route path="/HomePage" element={<HomePage />} />
                <Route path="/RegisterP/CreateProfile" element={<AddPlayerP />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/matchcreation" element={<MatchCreateP />} />
                <Route path="/matchDetail" element={<MatchDetailPage />} />
                <Route path="/RegisterP/CreateProfile/HomePage" element={<HomePage />} />
                <Route path="/matchDetail/editMatch" element={<MatchEditPage/>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UserDataContext.Provider>
    </UserIdContext.Provider>
  );
};

export default App;
