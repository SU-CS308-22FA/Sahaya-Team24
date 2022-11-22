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

const SearchUser = () => {
  const [userType, setUserType] = useState('player');
  const [players, setPlayers] = useState(null);
  const [referees, setReferees] = useState(null);

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await PlayerDataService.getAll();
        setPlayers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getRefereeData = async () => {
      try {
        const response = await RefereeDataService.getAll();
        setReferees(response.data);
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
  };

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
      {userType === 'player' ? <div>{players && <PlayerList players={players} />}</div> : <div>{referees && <RefereeList referees={referees} />}</div>}     
    </div> 
  );
}

export default SearchUser