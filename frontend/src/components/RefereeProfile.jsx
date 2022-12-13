import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {Button, Select, MenuItem, FormControl, InputLabel,TextField ,Card} from '@mui/material'
import RefereeDataService from '../services/referee.service';
import DeleteR from "./DeleteR";
import updateReferee from "./updateReferee";
import classes from './PlayerProfile.module.css';
import Layout from './layout/Layout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

// imports for date
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RefereeProfile = () => {
  const [referee, setReferee] = useState(null);
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const [dateValue, setDateValue] = useState(dayjs());

  const handleDatePick = (newDateValue) => {
    setDateValue(newDateValue);
    console.log("date set");
  }

  const getBody = () => {
    let newBody = referee
    newBody[key] = value
    setReferee(referee => ({
      ...referee,
      ...newBody
    }))
    console.log(newBody)
    return newBody
  }

  let navigate = useNavigate();
  const navigateToSignIn = () => {
      navigate('/');
  };

  useEffect(() => {
    const getRefereeData = async () => {
      try {
        const uID = getAuth().currentUser.uid;
        const response = await RefereeDataService.get(uID);
        console.log(response.data);
        setReferee(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRefereeData();
  }, []);
  
  return (
    <div>
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

      {/* Date picker for referee */}
      <div className="referee-date">
        <div style={{margin: 'auto', display: 'block', width: 'fit-content'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Pick a date"
              inputFormat="MM/DD/YYYY"
              value={dateValue}
              onChange={handleDatePick}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button  className={classes.button} variant="contained" onClick={()=>{
            console.log(dateValue);
          }}>Add date</Button>
        </div>
      </div>

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
          <MenuItem value={"r_name"}>Name</MenuItem>
          <MenuItem value={"r_location"}>Location</MenuItem>
        </Select>
      </FormControl>
      <TextField variant="outlined" onChange={(event) =>setValue(event.target.value)}/>
      <div>
      <Button  className={classes.button} variant="contained" onClick={()=>{
        updateReferee(getBody())
      }}>
      Change Value!</Button>
      </div>
      </Card>
      
      <Button className = {classes.button} variant="contained" onClick={()=>{
        DeleteR()
        navigateToSignIn()
        }}>DELETE profile</Button>
    
    </div>
    )
};

export default RefereeProfile;