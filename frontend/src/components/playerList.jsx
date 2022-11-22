import { Link } from "react-router-dom";

const PlayerList = ({ players }) => {
  return (
    <div className="player-list">
      {players.map(player => (
        <div className="player-preview" key={player.p_id} >
          <h1>{ player.p_name }</h1>
          <p> PR: { player.pr }</p>
          <p> FPR: { player.fpr }</p>
          <p> Pos A: { player.position_a }</p>
          <p> Pos B: { player.position_b }</p>
          <p> Location: { player.p_location }</p>
          <Link to='/Player' state={{uID: player.p_id, uType: 'player'}}>Profile</Link>
        </div>
      ))}
    </div>
  );
}
 
export default PlayerList;