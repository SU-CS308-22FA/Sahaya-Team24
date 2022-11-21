import React from 'react'
import MatchDetail from "../components/MatchDetail"
import { useLocation } from 'react-router-dom';

const MatchDetailPage = () => {
  const loc = useLocation();
  console.log("the match is; ", loc );
  return (
    <div><MatchDetail passedValue = {loc.state}/></div>
  )
}

export default MatchDetailPage