import React, {useState, useContext} from 'react'
import AddPlayer from '../components/CreatePlayer'
import AddReferee from '../components/CreateReferee'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { UserIdContext } from "../contexts/UserIdContext";

const AddPlayerP = () => {
  const [uType, setUType] = useState('player');
  const {userId} = useContext(UserIdContext);
  console.log(userId);
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Type of user</FormLabel>
        <RadioGroup row value={uType} onChange={(e) => setUType(e.target.value)}>
          <FormControlLabel value="player" control={<Radio />} label="Player" />
          <FormControlLabel value="referee" control={<Radio />} label="Referee" />
        </RadioGroup>
      </FormControl>
      {uType === 'player' ? <AddPlayer uID={userId}/> : <AddReferee uID={userId}/>}
      
    </div>
  );
};

export default AddPlayerP;