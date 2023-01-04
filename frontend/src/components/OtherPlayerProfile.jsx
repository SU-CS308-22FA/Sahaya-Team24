import React, { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom'
import {Card} from '@mui/material'
import PlayerDataService from '../services/player.service';
import Layout from './layout/Layout';
import classes from './PlayerProfile.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const OtherPlayerProfile = () => {
  const [player, setPlayer] = useState(null);
  const location = useLocation();
  const {uID} = location.state;

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await PlayerDataService.get(uID);
        setPlayer(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPlayerData();
    
  }, []);
//
  return (
    <Layout>
      <Card className = {classes.cardProfile}>
      <div><AccountCircleIcon fontSize="large"  /></div>
      <div>Name:{player != null ? player.p_name : null}</div>
      <div>Age:{player != null ? player.p_age : null}</div>
      <div>Player Rating:{player != null && player.p_rating[2] ?  player.p_rating[0]/player.p_rating[2] : "No Ratings yet"}</div>
      <div>Fair Play Rating:{player != null && player.p_rating[2] ?  player.p_rating[1]/player.p_rating[2] : "No Ratings yet"}</div>
      <div>Position A:{player != null ? player.position_a : null}</div>
      <div>Position B:{player != null ? player.position_b : null}</div>
      <div>Location:{player != null ? player.p_location : null}</div>
    </Card>
    </Layout>
  )
}

export default OtherPlayerProfile