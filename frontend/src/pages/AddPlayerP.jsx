import React, {useState, useContext} from 'react'
import AddPlayer from '../components/CreatePlayer'
import AddReferee from '../components/CreateReferee'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { getAuth,sendEmailVerification } from 'firebase/auth';

const AddPlayerP = () => {
  const [uType, setUType] = useState('player');
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
  
  const sendVerif = async () => {
    await sendEmailVerification(currentUser)
  }

  if(currentUser.emailVerified)
    return (
      <div>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Type of user</FormLabel>
          <RadioGroup row value={uType} onChange={(e) => setUType(e.target.value)}>
            <FormControlLabel value="player" control={<Radio />} label="Player" />
            <FormControlLabel value="referee" control={<Radio />} label="Referee" />
          </RadioGroup>
        </FormControl>
        {uType === 'player' ? <AddPlayer uID={currentUser.uid}/> : <AddReferee uID={currentUser.uid}/>}
        
      </div>
    );
  else
    return (
      <div>
        Please Verify and Reload!
        <Button onClick={sendVerif}>Re-send Verification</Button>
      </div>
    );
};

export default AddPlayerP;