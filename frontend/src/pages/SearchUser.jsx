import React, {useEffect, useRef, useState} from 'react'

import SearchBar from '../components/SearchBar'
import RefereeDataService from '../services/referee.service';
import PlayerDataService from '../services/player.service';
import PlayerList from '../components/playerList';
import RefereeList from '../components/refereeList';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/system';
import { Autocomplete, Button, TextField } from '@mui/material';

const SearchUser = () => {
  const [userType, setUserType] = useState('player');
  const [players, setPlayers] = useState([]);
  const [referees, setReferees] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState(null);
  const [filteredReferees, setFilteredReferees] = useState(null);
  const [allPlayerLocations, setAllPlayerLocations] = useState([]);
  const [allRefereeLocations, setAllRefereeLocations] = useState([]);
  const [selectedPlayerLocations, setSelectedPlayerLocations] = useState(allPlayerLocations);
  const [selectedRefereeLocations, setSelectedRefereeLocations] = useState(allRefereeLocations);
  const [allPositions, setAllPositions] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState(allPositions);
  const [minRate, setMinRate] = useState(0);
  const [filteredAge, setFilteredAge] = useState([]);
  let allAges=[[0,17],[18,25],[26,35],[36,45],[46,55],[56,70]];

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await PlayerDataService.getAll();
        setPlayers(response.data);
        setFilteredPlayers(response.data);
        let dummy=[...new Set(response.data.map((player) => player.p_location))];
        setAllPlayerLocations(dummy);
        let dummyPositionA=[...new Set(response.data.map((player) => player.position_a))];
        let dummyPositionB=[...new Set(response.data.map((player) => player.position_b))];
        let dummyPosiitons = [...dummyPositionA, ...dummyPositionB];
        console.log("*******************************");
        console.log(dummyPosiitons);
        setAllPositions(dummyPosiitons);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getRefereeData = async () => {
      try {
        const response = await RefereeDataService.getAll();
        setReferees(response.data);
        setFilteredReferees(response.data);
        let dummy=[...new Set(response.data.map((referee) => referee.r_location))];
        setAllRefereeLocations(dummy);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPlayerData();
    getRefereeData();
  }, []);

  
  
  const handleChange = (event) => {
    setUserType(event.target.value);
    setSelectedRefereeLocations(allRefereeLocations);
    setSelectedPlayerLocations(allPlayerLocations);
    setFilteredAge(allAges);
    setSelectedPositions(allPositions);
  };

  function isBetween(theAge)  {
    console.log("Heloooooooooo "+theAge);
    let dummy = filteredAge.filter((age) => (age[0] <= theAge && age[1] >= theAge));
    console.log(dummy);
    if(dummy.length == 0){
      return false;
    }
    return true;
  }

  const handleFilter = () => {
    console.log("---------Selected");
    console.log(selectedPositions);
    console.log(selectedPlayerLocations);
    console.log(selectedRefereeLocations);
    console.log(filteredAge);
    console.log("---------ended");
    if(selectedPlayerLocations.length == 0 && filteredAge.length == 0 && selectedRefereeLocations.length == 0 ){
      if( selectedPositions.length == 0 && userType !== 'player'){
        setFilteredPlayers(players);
      }
      else{
        let dummy = players.filter((player) => ((selectedPositions.indexOf(player.position_a) > -1 || selectedPositions.indexOf(player.position_b) > -1)));
        setFilteredPlayers(players);
      }
      setFilteredReferees(referees);
      
    }
    else if(filteredAge.length == 0 && selectedPlayerLocations.length != 0){
      if(selectedPositions.length > 0 && userType === 'player'){
        let dummy = players.filter((player) => (selectedPlayerLocations.indexOf(player.p_location) > -1 && (selectedPositions.indexOf(player.position_a) > -1 || selectedPositions.indexOf(player.position_b) > -1)));
        setFilteredPlayers(dummy);
      }
      else{
        let dummy = players.filter((player) => (selectedPlayerLocations.indexOf(player.p_location) > -1 ));
        setFilteredPlayers(dummy);
      }
      
      let dummy2 = referees.filter((referee) => (selectedRefereeLocations.indexOf(referee.r_location) > -1 ));
      setFilteredReferees(dummy2);
    }
    else if(selectedPlayerLocations.length == 0 && selectedRefereeLocations.length == 0 && filteredAge.length != 0){
      if(selectedPositions.length > 0 && userType === 'player'){
        let dummy = players.filter((player) => (isBetween(player.p_age) && (selectedPositions.indexOf(player.position_a) > -1 || selectedPositions.indexOf(player.position_b) > -1)));
        setFilteredPlayers(dummy);
      }
      else{
        let dummy = players.filter((player) => (isBetween(player.p_age) ));
        setFilteredPlayers(dummy);
      }
      let dummy2 = referees.filter((referee) => (isBetween(referee.r_age)));
      setFilteredReferees(dummy2);
    }
    else{
      if(selectedPositions.length > 0 && userType === 'player'){
        let dummy = players.filter((player) => (selectedPlayerLocations.indexOf(player.p_location) > -1 && isBetween(player.p_age) &&(selectedPositions.indexOf(player.position_a) > -1 || selectedPositions.indexOf(player.position_b) > -1)));
        setFilteredPlayers(dummy);
      }
      else{
        let dummy = players.filter((player) => (selectedPlayerLocations.indexOf(player.p_location) > -1 && isBetween(player.p_age)));
        setFilteredPlayers(dummy);
      }
      let dummy2 = referees.filter((referee) => (selectedRefereeLocations.indexOf(referee.r_location) > -1 && isBetween(referee.r_age)));
      setFilteredReferees(dummy2);
    }
    
  }

  return (
    <div className='users'>
      <Box sx={{ minWidth: 120 }}>
        <FormControl >
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="UserType"
            onChange={handleChange}
          >
            <MenuItem value={'player'}>Player</MenuItem>
            <MenuItem value={'referee'}>Referee</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Stack  spacing={2}>
          <Autocomplete
          sx={{ color:"white" }}
      style={{width:"100%", color:"white"}}
      onChange={(event, value) => {
        setSelectedRefereeLocations(value);
        setSelectedPlayerLocations(value);
      }}
      multiple
      id="tags-standard"
      options={userType === 'player' ? allPlayerLocations : allRefereeLocations}
      getOptionLabel={(location) => location}
      renderInput={(params) => (
        <TextField 
          {...params}
          variant="standard"
          label="Choose Locations"
          placeholder="Locations"
        />
      )}/>
      <Autocomplete
          sx={{ color:"white" }}
      style={{width:"100%", color:"white"}}
      onChange={(event, value) => {
        setFilteredAge(value);
        console.log(value);
      }}
      multiple
      id="tags-age"
      options={[[0,17],[18,25],[26,35],[36,45],[46,55],[56,70]]}
      getOptionLabel={(age) => age[0] +"-"+age[1]}
      renderInput={(params) => (
        <TextField 
          {...params}
          variant="standard"
          label="Choose Age Range"
          placeholder="Age"
        />
      )}/>
      {userType === 'player' ? <Autocomplete
          sx={{ color:"white" }}
      style={{width:"100%", color:"white"}}
      onChange={(event, value) => {
        setSelectedPositions(value);
        console.log(value);
      }}
      multiple
      id="tags-position"
      options={allPositions}
      getOptionLabel={(position) => position}
      renderInput={(params) => (
        <TextField 
          {...params}
          variant="standard"
          label="Choose Positions"
          placeholder="Positions"
        />
      )}/> : null}
      <Button style={{textTransform:"none", color:"black"}} onClick={handleFilter}>Apply Filters</Button>
          
          </Stack>
      {userType === 'player' ? <div>{filteredPlayers && <PlayerList players={filteredPlayers} />}</div> : <div>{filteredReferees && <RefereeList referees={filteredReferees} />}</div>}     
    </div> 
  );
}

export default SearchUser