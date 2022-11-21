import React , {useEffect, useState} from 'react'
import MatchDataService from '../services/match.service';

const MatchDetail = (inVal) => {

    let match = inVal.passedValue.sentVal;
    console.log("match is, ", match);
  return (
    <div>MatchDetaile</div>
  )
}

export default MatchDetail