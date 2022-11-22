import { Link } from "react-router-dom";

import './css/refereeList.css';

const RefereeList = ({ referees }) => {
  return (
    <div className="referee-list">
      {referees.map(referee => (
        <div className="referee-preview" key={referee.r_id} >
          <h1>{ referee.r_name }</h1>
          <p> RR: { referee.rr }</p>
          <p> FPR: { referee.fpr }</p>
          <p> Location: { referee.r_location }</p>
          <Link to='/Referee' state={{uID: referee.r_id, uType: 'referee'}}><button>Profile</button></Link>
        </div>
      ))}
    </div>
  );
}
 
export default RefereeList;