import React, { useEffect, useState } from 'react'
import PlayerProfile from '../components/PlayerProfile';
import RefereeProfile from '../components/RefereeProfile';

import { Button, AppBar, Toolbar, Typography, Card} from '@mui/material';
import { Box } from '@mui/system';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [uType, setUType] = useState(window.localStorage.getItem('user_type'));

  useEffect(() => {
    const userType = window.localStorage.getItem('user_type')
    if (userType !== null) setUType(userType);
    console.log(uType);
  }, [])

  const auth=getAuth();
  let navigate = useNavigate();
  const logout = async() => {
    signOut(auth).then(()=>{
      console.log("Sign-out successful.");
      navigate('/');
    }).catch((error) => {
      console.log("An error happened while singout!");
    });
  }

  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToProfile = () => {
    navigate('/ProfilePage');
  };

  const navigateToCreateMatch = () =>{
    navigate( '/matchcreation' )

  }

  const navigateToHome = () =>{
    navigate( '/HomePage' )

  }

  return (
    <Card style={{height:"100%"}}>
    <Box sx={{flexGrow: 1}}>
    <AppBar position='static' style={{backgroundColor: "#00466e"}}>
    <Toolbar>
    <h1 style={{color: "#ffffff", flexGrow: "1"}}>SAHAYA</h1>
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToHome}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Home Page</Typography></Button>
    {uType != 'player' ? null: <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToCreateMatch}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Create New Match</Typography></Button>}
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToSearch}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Search Users</Typography></Button>
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={logout}><Typography style={{color: "#00466e", fontWeight: "bold"}}>SignOut!</Typography></Button>
    </Toolbar>
    </AppBar>
    </Box>
    <div>
      {uType === "player" ? <PlayerProfile/> : <RefereeProfile/>}
    </div>
    </Card>
  )
}

export default ProfilePage;