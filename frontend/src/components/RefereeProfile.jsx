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
import DatesDataService from '../services/dates.service';

import { LOCATION_ARRAY } from '../constants';

const RefereeProfile = () => {
  const [referee, setReferee] = useState(null);
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")

  const [uID, setUID] = useState(JSON.parse(window.localStorage.getItem('currentUser')).uid);
  useEffect(() => {
    const userID = JSON.parse(window.localStorage.getItem('currentUser')).uid
    if (userID !== null) setUID(userID);
    console.log(userID);
  }, [])

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
        const response = await RefereeDataService.get(uID);
        console.log(response.data);
        setReferee(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    getRefereeData();
  }, []);
  
  /* available locations */
  const[availableLoc, setAvailableLoc] = useState("");

  // add available location
  const getBodyALoc = () => {
    let newBody = referee;
    let newArray = newBody.available_locations;
    if (newArray.includes(availableLoc)) {
      alert("Cannot add the location. There is already a location called " + availableLoc);
    } else {
      newArray.push(availableLoc);
    }
    newBody["available_locations"] = newArray
    setReferee(referee => ({
      ...referee,
      ...newBody
    }));
    return newBody;
  }

  // delete available location
  const getBodyALocDelete = () => {
    let newBody = referee;
    let newArray = newBody.available_locations;
    if (!newArray.includes(availableLoc)) {
      alert("Cannot delete the location. There is no available location called " + availableLoc);
      return newBody;
    } else {
      let index = newArray.indexOf(availableLoc);
      if (index > -1) {
        newArray.splice(index, 1);
        newBody["available_locations"] = newArray;
        setReferee(referee => ({
          ...referee,
          ...newBody
        }));
        return newBody;
      }
    }
  }
  
  /* referee dates */
  const[date, setDate] = useState(dayjs().add(2,'h').toString());
  
  // select date from textfield
  const handleDatePick = (newDateValue) => {
    setDate(newDateValue);
    console.log("date set");
  }
  
  const getBodyDate = () => {
    let newBody = referee;
    let newArray = newBody.dates;
    if (newArray.includes(date)) {
      alert("Cannot add the date. There is already a date " + date);
    } else {
      console.log("hey")
      newArray.push(date);
    }
    newBody["dates"] = newArray
    setReferee(referee => ({
      ...referee,
      ...newBody
    }));
    return newBody;
  }
  
  // delete date
  const getBodyDateDelete = () => {
    let newBody = referee;
    let newArray = newBody.dates;
    if (!newArray.includes(date)) {
      alert("Cannot delete the date. There is no date " + date);
      return newBody;
    } else {
      let index = newArray.indexOf(date);
      if (index > -1) {
        newArray.splice(index, 1);
        newBody["dates"] = newArray;
        setReferee(referee => ({
          ...referee,
          ...newBody
        }));
        return newBody;
      }
    }
  }
  
  return (
    <div>
      <Layout>
      <Card className = {classes.cardProfile}>
      <div><AccountCircleIcon fontSize="large"  /></div>
      <div>Name: {referee != null ? referee.r_name : null}</div>
      <div>Age: {referee != null ? referee.r_age : null}</div>
      <div>Referee Rating: {referee != null ? referee.rr : null}</div>
      <div>Fair Play Rating: {referee != null ? referee.fpr : null}</div>
      <div>Location: {referee != null ? referee.r_location : null}</div>
      <div>Available locations: {referee != null ? referee.available_locations.map((loc, i) => (<li key={i}>{loc}</li>)) : null}</div>
      <div>Available dates: {referee != null ? referee.dates.map((c_date, i) => (
          <li key={i}>{c_date}</li>
        )): null}</div>
      </Card>
      </Layout>
      {/* available locations */}
      <div className="available-locations">
        <FormControl style={{width:245}}>
          <InputLabel id="input_location_label">Location</InputLabel>
          <Select
            id="input_location"
            autoWidth
            value={availableLoc}
            label="Location"
            onChange={(event) => setAvailableLoc(event.target.value)}
          >
          {LOCATION_ARRAY.map((location) => (
            <MenuItem value={location} key = {location}>{location}</MenuItem>
          ))}
          </Select>
        </FormControl>
        <Button  className={classes.button} variant="contained" onClick={()=>{
          updateReferee(getBodyALoc())
        }}>Add available location</Button>
        <Button  className={classes.button} variant="contained" onClick={()=>{
          updateReferee(getBodyALocDelete())
        }}>Delete available location</Button>
      </div>
      {/* Date picker for referee */}
      <div className="referee-date">
        <div style={{margin: 'auto', display: 'block', width: 'fit-content'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Pick a date"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDatePick}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button  className={classes.button} variant="contained" onClick={()=>{
            updateReferee(getBodyDate())
          }}>Add date</Button>
          <Button  className={classes.button} variant="contained" onClick={()=>{
            updateReferee(getBodyDateDelete())
          }}>Delete date</Button>
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
