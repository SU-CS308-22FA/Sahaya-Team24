import React, { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";
import {Button, Select, MenuItem, FormControl, InputLabel,TextField ,Card,Stack} from '@mui/material'
import PlayerDataService from '../services/player.service';
import Delete from "./Delete";
import updatePlayer from "./updatePlayer";
import classes from './PlayerProfile.module.css';
import Layout from './layout/Layout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { UserIdContext } from "../contexts/UserIdContext";
const PlayerProfile = () => {
  const [player, setPlayer] = useState(null);
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const getBody = () => {
    let newBody = player
    newBody[key] = value
    setPlayer(player => ({
      ...player,
      ...newBody
    }))
    console.log(newBody)
    return newBody
  }

  let navigate = useNavigate();
  const navigateToSignIn = () => {
      navigate('/');
  };

  const deleteFunc = async () => {
    await Delete(uID)
    navigateToSignIn()
  }

  const [uID, setUID] = useState(window.localStorage.getItem('user_id'));
  useEffect(() => {
    const userID = window.localStorage.getItem('user_id')
    if (userID !== null) setUID(userID);
    console.log(userID);
  }, [])

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        //console.log(getAuth().currentUser.uid);
        //const uID = getAuth().currentUser.uid;
        const response = await PlayerDataService.get(uID);
        console.log(response.data);
        setPlayer(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPlayerData();
    
  }, []);
  

  return (
    <div>
      <Layout>
      <Card className = {classes.cardProfile}>
      <div><AccountCircleIcon fontSize="large"  /></div>
      <div>Name:{player != null ? player.p_name : null}</div>
      <div>Age:{player != null ? player.p_age : null}</div>
      <div>Player Rating:{player != null && player.p_rating[2] ?  player.p_rating[0]/player.p_rating[2] : "No Ratings yet"}</div>
      <div>Fair Play Rating:{player != null && player.p_rating[2] ? player.p_rating[1]/player.p_rating[2] : "No Ratings yet"}</div>
      <div>Position A:{player != null ? player.position_a : null}</div>
      <div>Position B:{player != null ? player.position_b : null}</div>
      <div>Location:{player != null ? player.p_location : null}</div>
      </Card>
      </Layout>
      <Card className = {classes.card}>
      <FormControl fullWidth>
        <InputLabel id="which_to_change">Select</InputLabel>
        <Select
          labelId="which_to_change"
          id="which_to_change"
          value={key}
          label="Key"
          onChange={(event) => setKey(event.target.value)}
        >
          <MenuItem value={"p_name"}>Name</MenuItem>
          <MenuItem value={"position_a"}>Position A</MenuItem>
          <MenuItem value={"position_b"}>Position B</MenuItem>
          <MenuItem value={"p_location"}>Location</MenuItem>
        </Select>
      </FormControl>
      <TextField variant="outlined" onChange={(event) =>setValue(event.target.value)}/>
      <div>
      <Button  className={classes.button} variant="contained" onClick={()=>{
        updatePlayer(getBody())
      }}>
      Change Value!</Button>
      </div>
      </Card>
      
      <Button className = {classes.button} variant="contained" onClick={deleteFunc}>DELETE profile</Button>
    
    </div>
    )
};

export default PlayerProfile;
