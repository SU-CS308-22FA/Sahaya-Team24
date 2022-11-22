import { Link } from "react-router-dom";
import './css/playerList.css';

const PlayerList = ({ players }) => {
  return (
    <div className="player-list">
      {players.map(player => (
        <div className="player-preview" key={player.p_id} >
          <h1>{ player.p_name }</h1>
          <p> Location: { player.p_location }</p>
          <Link to='/Player' state={{uID: player.p_id, uType: 'player'}}><button>Profile</button></Link>
        </div>
      ))}
    </div>
  );
}
 
export default PlayerList;