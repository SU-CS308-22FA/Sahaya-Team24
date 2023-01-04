import React from 'react';
import { useNavigate } from 'react-router-dom';
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service'
import dayjs, { Dayjs } from 'dayjs';
import {Button, Select,  FormControl,MenuItem, InputLabel,TextField ,Card,Stack ,Box,Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { spacing } from '@mui/system';
import nextId from "react-id-generator"; // npm i react-id-generator
import { getAuth } from 'firebase/auth';
import { LOCATION_ARRAY } from '../constants';
// Also ıdk why but console logs comes one step back from the ffront end if you write "ege" to textfield it logs "eg"



const MatchCreate = () => {
  //idea this functions wil be addded as modal to hompage so that site will be much cooler
  const matchID = nextId("Match-Lobby-");



  //-------------functions for text fields-------------------------
  //matchname
    const [name, setName] = React.useState('Güzel bir lobi ismi');
    const handleNameChange = (event) => {
    setName(event.target.value);
    console.log("name: " , name);
  };
  //match location
  const [mLocation, setLoc] = React.useState('');
  const handleLocChange = (event) => {
    setLoc(event.target.value);
    console.log("loc: ",mLocation);
  };
  //----------------------------------------------------------


    //-------------functions for Date time picker--------------------------
    const [value, setValue] = React.useState(dayjs().add(2,'h').toString());

    const handleDateChange = (newValue) => {
      setValue(newValue);
      console.log("date: ",value);
    };
    //--------------------------------------------------------------------


    //----------------functions for select numof players-------------------
    const [numofPlayers, setNOP] = React.useState('');

    const handleplayerChange = (event) => {
    setNOP(event.target.value);
    console.log("numofPlayers: ",numofPlayers);
    };
    //------------------------------------------------------------------

    
    //----------------for switch--------------------------
    const [checked, setRefree] = React.useState(false);
    const handleRefreeChange = (event) => {
      setRefree(event.target.checked);
      console.log("checked: ",checked);
      
  };
    //-------------------------------------------------


    //---------------getCurrentuserID------------------
    const [uID, setUID] = useState(JSON.parse(window.localStorage.getItem('currentUser')).uid);
    //-------------------------------------------------


    //-------------------send button------------------------

    let navigate = useNavigate();
    var error_occured = false;
  const handlecreateMatch = () =>{
    //create data to send to data base
    var data = {
      m_id: matchID,
      m_name: name,
      m_location: mLocation,
      m_maxPlayer: numofPlayers,
      m_curPlayer: 0,
      m_needRefree: checked,
      m_date: value,
      owner_id: uID
    }

    //send data to database
    MatchDataService.create(data)
    .then(response => {
      this.setState({
        m_id: response.data.m_id,
        m_name: response.data.m_name,
        m_location: response.data.m_location,
        m_maxPlayer: response.data.m_maxPlayer,
        m_curPlayer: response.data.m_curPlayer,
        m_needRefree: response.data.m_needRefree,
        m_date: response.data.m_date,
        owner_id: response.data.owner_id
      });
      console.log(response.data);
    }).catch(err => {
      //when you add err.response u get better feedback from axios
      console.log(data);
      console.log(err.response);
      error_occured = true;
    });

    if(matchID != "" && name != ""  && mLocation != "" && numofPlayers != "" && value != ""){
      PlayerDataService.addMatchToPlayer(uID,matchID).then(()=>{
        navigate('../HomePage');
      })
    }else{
      alert("Lütfen bütün boşlukları doldurunuz");
    }
  }
  //---------------------------------------------------

  return (
    <Box m = {20} pt = {5}>
    <Card>
        <Box m = {5} >
        <TextField
          m = {5}
          required
          defaultValue="Güzel bir lobi ismi"
          variant="standard"
          size='medium'
          fullWidth = {true}
          onChange={handleNameChange}
        />
        <div >Maç tarihi: </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateTimePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

        <div>
        <FormControl style={{width:245}}>
          <InputLabel id="input_location_label">Location</InputLabel>
          <Select
            id="input_location"
            autoWidth
            value={mLocation}
            label="Location"
            onChange={handleLocChange}
          >
          {LOCATION_ARRAY.map((location) => (
            <MenuItem value={location} key = {location}>{location}</MenuItem>
          ))}
          </Select>
        </FormControl>
        </div>

        <FormControl fullWidth>  
        <InputLabel id="demo-simple-select-label">Oyuncu sayısı</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={numofPlayers}
            label="number of players"
            onChange={handleplayerChange}
        >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={22}>22</MenuItem>
        </Select>
        </FormControl>

        <>Hakem atansın istiyorum</>
        <Switch
          inputProps={{ 'aria-label': 'controlled' }}
          onChange ={ handleRefreeChange }
         />
        <div></div>
        <Button color="success" variant="contained" onClick={handlecreateMatch} >Yayınla</Button>
        
        </Box>
    </Card>
    </Box>
    
    
  )
}

export default MatchCreate