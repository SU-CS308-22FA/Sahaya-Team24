import { Link } from "react-router-dom";

const PlayerList = ({ players }) => {
  return (
    <div className="player-list">
      {players.map(player => (
        <div className="player-preview" key={player.p_id} >
          <h1>{ player.p_name }</h1>
          <p> { player.pr }</p>
          <p> { player.fpr }</p>
          <p> { player.position_a }</p>
          <p> { player.position_b }</p>
          <p> { player.p_location }</p>
          <Link to='/Player' state={{uID: player.p_id, uType: 'player'}}>Profile</Link>
        </div>
      ))}
    </div>
  );
}
 
export default PlayerList;