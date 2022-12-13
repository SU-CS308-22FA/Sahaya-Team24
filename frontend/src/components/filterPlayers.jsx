import React from 'react'
import { Link } from "react-router-dom";

import './css/playerList.css';
const FilterPlayers = ({searchstring, list}) => {

  const filteredList = list.filter((player) => {
   if (searchstring === '') {
       return player;
   }
   else {
       return player.p_name.toLowerCase().includes(searchstring)
   }
  })

 return (
  <div>
    {filteredList.map((player) => (
      <div className="player-preview" key={player.p_id} >
        <h1>{ player.p_name }</h1>
        <p> Location: { player.p_location }</p>
        <Link to='/Player' state={{uID: player.p_id, uType: 'player'}}><button>Profile</button></Link>
      </div>
    ))}
  </div>
 )
}

export default FilterPlayers