import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {Button, Select, MenuItem, FormControl, InputLabel,TextField ,Card,Stack} from '@mui/material'
import PlayerDataService from '../services/player.service';
import Delete from "./Delete";
import PatchPlayer from "./PatchPlayer";
import { Link } from "react-router-dom";
import classes from './PlayerProfile.module.css';
import Layout from './layout/Layout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { margin, padding } from "@mui/system";


const PlayerProfile = () => {
  const [player, setPlayer] = useState(null);
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  
  useEffect(() => {
    const getPlayerData = async () => {
      try {
        console.log(getAuth().currentUser.uid);
        const uID = getAuth().currentUser.uid;
        const response = await PlayerDataService.get(uID);
        console.log(response.data);
        setPlayer(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPlayerData();
    
  }, []);
  console.log('player: ',player);
  return (
    <div>
      <Layout>
      <Card className = {classes.cardProfile}>
      <div><AccountCircleIcon fontSize="large"  /></div>
      <div>Name:{player != null ? player.p_name : null}</div>
      <div>Age:{player != null ? player.p_age : null}</div>
      <div>Player Rating:{player != null ? player.pr : null}</div>
      <div>Fair Play Rating:{player != null ? player.fpr : null}</div>
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
        PatchPlayer(key,value)
      }}>
      Change Value!</Button>
      </div>
      </Card>


      
      
      
      <Link to="/" style={{
       position: 'absolute', left: '90%',
      }}>Home</Link>
      
      <Button className = {classes.button} variant="contained" onClick={Delete}>DELETE profile</Button>
    
    </div>
    )
};

export default PlayerProfile;
