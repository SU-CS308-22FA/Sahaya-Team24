import React, {useEffect, useRef, useState} from 'react'

import SearchBar from '../components/SearchBar'
import RefereeDataService from '../services/referee.service';
import PlayerDataService from '../services/player.service';
import PlayerList from '../components/playerList';
import RefereeList from '../components/refereeList';


const SearchUser = () => {
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
  
  
  return (
    <div className='players'>
      <h1>Players</h1>
      {players && <PlayerList players={players} />}
      <h1>Referees</h1>
      {referees && <RefereeList referees={referees} />}
    </div> 
  );
}

export default SearchUser