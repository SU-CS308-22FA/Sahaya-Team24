import React from 'react'
import { Link } from "react-router-dom";

import './css/refereeList.css';

const FilterReferees = ({searchstring, list}) => {

  const filteredRList = list.filter((referee) => {
   if (searchstring === '') {
       return referee;
   }
   else {
       return referee.r_name.toLowerCase().includes(searchstring)
   }
  })

 return (
  <div>
    {filteredRList.map(referee => (
        <div className="referee-preview" key={referee.r_id} >
          <h1>{ referee.r_name }</h1>
          <p> Location: { referee.r_location }</p>
          <Link to='/Referee' state={{uID: referee.r_id, uType: 'referee'}}><button>Profile</button></Link>
        </div>
      ))}
  </div>
 )
}

export default FilterReferees