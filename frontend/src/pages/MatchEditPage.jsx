import React from 'react'
import { useLocation } from 'react-router-dom';
import MatchEdit from"../components/MatchEdit"

const MatchEditPage = () => {
    const loc = useLocation();
  return (
    <div>
    <MatchEdit passedValue = {loc.state}/> 
    </div>
  )
}

export default MatchEditPage