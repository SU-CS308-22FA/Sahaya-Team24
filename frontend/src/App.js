import React, {useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import classes from "./App.module.css";
import { PrivateRoute } from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import AddPlayerP from "./pages/AddPlayerP";
import ProfilePage from "./pages/ProfilePage";
import MatchCreateP from "./pages/MatchCreateP";
import RegisterPage from "./pages/RegisterPage";
import MatchDetailPage from "./pages/MatchDetailPage"
import SearchUser from "./pages/SearchUser";
import OtherPlayerProfile from "./components/OtherPlayerProfile";
import OtherRefereeProfile from "./components/OtherRefereeProfile";
import MatchEditPage from "./pages/MatchEditPage"
import RateP from "./pages/RateP";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";

const App = () => {
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.localStorage.setItem('currentUser', JSON.stringify(user))
      } else {
        window.localStorage.setItem('currentUser','')
      }
    });
  }, []);
  
  return (
    <BrowserRouter>
      <div className={classes.app} >
        <div className="content">
          <Routes>
            <Route path="/CreateProfile" element={<AddPlayerP />} />
            <Route path="/" element={<SignInPage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route element={<PrivateRoute/>}>
              <Route path="/Player" element={<OtherPlayerProfile />} />
              <Route path="/Referee" element={<OtherRefereeProfile />} />
              <Route path="/search" element={<SearchUser />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/matchcreation" element={<MatchCreateP />} />
              <Route path="/matchDetail" element={<MatchDetailPage />} />
              <Route path="/RegisterP/CreateProfile/HomePage" element={<HomePage />} />
              <Route path="/matchDetail/editMatch" element={<MatchEditPage/>} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
