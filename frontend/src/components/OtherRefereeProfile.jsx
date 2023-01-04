import React, { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import {Card} from '@mui/material'
import RefereeDataService from '../services/referee.service';
import Layout from './layout/Layout';
import classes from './PlayerProfile.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const OtherRefereeProfile = () => {
  const [referee, setReferee] = useState(null);
  const location = useLocation();
  const {uID} = location.state;

  useEffect(() => {
    const getRefereeData = async () => {
      try {
        const response = await RefereeDataService.get(uID);
        setReferee(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRefereeData();
    
  }, []);

  return (
    <Layout>
      <Card className = {classes.cardProfile}>
      <div><AccountCircleIcon fontSize="large"  /></div>
      <div>Name:{referee != null ? referee.r_name : null}</div>
      <div>Age:{referee != null ? referee.r_age : null}</div>
      <div>Referee Rating:{referee != null ? referee.rr : null}</div>
      <div>Fair Play Rating:{referee != null ? referee.fpr : null}</div>
      <div>Location:{referee != null ? referee.r_location : null}</div>
    </Card>
    </Layout>
  )
}

export default OtherRefereeProfile