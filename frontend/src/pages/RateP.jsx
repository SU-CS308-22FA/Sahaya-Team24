import React from 'react'
import RateSendPage from "../components/RateSendPage";
import { useLocation } from 'react-router-dom';

const RateP = () => {
    const loc = useLocation();
  return (
    <div><RateSendPage passedValue = {loc.state} /></div>
  )
}

export default RateP