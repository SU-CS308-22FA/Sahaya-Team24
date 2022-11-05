import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignInPage from "./pages/SignInPage";

import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import RegisterP from "./pages/RegisterP";

const App = () => {
  return (
    
    <BrowserRouter>
      <div className={classes.app} >
        <div className="content">
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/RegisterP" element={<RegisterP />} />
            <Route path="/HomePage" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
    
  );
};

export default App;
