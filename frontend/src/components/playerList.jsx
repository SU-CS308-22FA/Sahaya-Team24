import React, {useEffect, useState} from "react";
import './css/playerList.css';

import {TextField, Autocomplete} from '@mui/material'
import FilterPlayers from "./filterPlayers";

const PlayerList = ({ players }) => {
  const [input, setInput] = useState('')
  const [list, setList]= useState([]);

  useEffect(() => {
    setList(players);
  }, [])

  const handleInput = (e)=>{
    //console.log(e.target.value)
    setInput(e.target.value.toLowerCase())
  }

  return (
    <div className="player-list">
      <div className="searchbar">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={list.map(player=>player.p_name)}
    
            renderInput={(params) => <TextField {...params} 
            label="Search player by name"
            onSelect={handleInput}
            sx={{
            width: 350,
            margin:'10px auto',
            }} />}
          />
          <FilterPlayers searchstring={input} list={list} />
      </div>
    </div>
  );
}
 
export default PlayerList;