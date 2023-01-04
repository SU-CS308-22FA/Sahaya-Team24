import React, { useContext ,useEffect,useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import playerService from '../services/player.service';
import refereeService from '../services/referee.service';

export const PrivateRoute = () => {
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
    const userType = window.localStorage.getItem('user_type')
    
    return userType != "anonymous" && currentUser == null ? <Navigate to="/" /> : userType != "anonymous" && (!currentUser.emailVerified || userType == '') ? <Navigate to="/CreateProfile" /> : <Outlet />

}