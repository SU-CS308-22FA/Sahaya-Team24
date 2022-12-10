import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import {UserDataContext} from "../contexts/UserDataContext";
import PlayerDataService from '../services/player.service';
import MatchDataService from '../services/match.service';
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField, Alert, Divider} from '@mui/material';
import { Box } from '@mui/system';

import MatchListItem from '../components/MatchListItem';

import { getAuth, signOut } from 'firebase/auth';
import PlayerProfileInfoCard from '../components/PlayerProfileInfoCard';
import RefereeProfileInfoCard from '../components/RefereeProfileInfoCard';


const HomePage = () => {
  const auth=getAuth();
  let navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocations, setSelectedLocation] = useState(allLocations);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [matchesDb, setMatchesDb] = useState([]);
  const {userType} = useContext(UserDataContext);

  

  useEffect(() => {
    const getMatchesData = async () => {
      try {
        const response = await MatchDataService.getAll();
        console.log(response.data.sort((a, b) => (a.m_date > b.m_date) ? 1 : -1));
        setMatchesDb(response.data.sort((a, b) => (a.m_date > b.m_date) ? 1 : -1));
        setSelectedMatches(response.data.sort((a, b) => (a.m_date > b.m_date) ? 1 : -1));

        let dummy=[...new Set(response.data.map((card) => card.m_location))];
        setAllLocations(dummy);
      } catch (err) {
        console.log(err);
      }
    };
    getMatchesData();
    
  }, []);

  const handleFilter = () => {
    if(selectedLocations.length == 0){
      setSelectedMatches(matchesDb);
      matchesDb.forEach((elemt) => console.log(elemt));
    }
    else{
      let dummy = matchesDb.filter((match) => selectedLocations.indexOf(match.m_location) > -1);
      setSelectedMatches(dummy);
    }
    
  }

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

  if(getAuth().currentUser.emailVerified) return (
    <Card style={{backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100%", borderRadius:"0"}}>
    <Box sx={{flexGrow: 1}}>
    <AppBar position='static' style={{backgroundColor: "#00466e"}}>
    <Toolbar>
    <h1 style={{color: "#ffffff", flexGrow: "1"}}>SAHAYA</h1>
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToProfile}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Profile</Typography></Button>
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={logout}><Typography style={{color: "#00466e", fontWeight: "bold"}}>SignOut!</Typography></Button>
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToCreateMatch}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Create New Match</Typography></Button>
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToSearch}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Search Users</Typography></Button>
    </Toolbar>
    </AppBar>
    </Box>
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Box>
          <List spa="true" style={{borderColor:"black"}}>
          <ListItem key="PlayerInfoAtLeft">
          <Button style={{padding:"0", textTransform:"none"}} onClick={navigateToProfile}>
          {userType === 'player' ? <PlayerProfileInfoCard passedValue={player}/> : <RefereeProfileInfoCard passedValue={player}/>}
            
        </Button>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid style={{display: "flex", justifyContent: "center" }} item xs={6}>
          <Stack style={{minHeight:"100vh"}} spacing={2}>
          <Autocomplete
          sx={{ color:"white" }}
      style={{width:"100%", color:"white"}}
      onChange={(event, value) => setSelectedLocation(value)}
      multiple
      id="tags-standard"
      options={allLocations}
      getOptionLabel={(location) => location}
      renderInput={(params) => (
        <TextField 
          {...params}
          variant="standard"
          label="Choose Locations"
          placeholder="Locations"
        />
      )}/>
      <Button style={{textTransform:"none", color:"white"}} onClick={handleFilter}>Apply Filters</Button>
          {selectedMatches.map((value) => (
            
              <MatchListItem key={value.m_id} passedValue={value}/>
            
          ))}
          </Stack>
      </Grid>
      <Grid item xs={3}>
        <Box>
          <List spa="true" style={{borderColor:"black"}}>
            <ListItem key="dummy3" >
            <MatchListItem key="dummy3" passedValue={{m_name:"dummy3", m_location:"Sabanci", m_date:"Monday 22"}}/>
            </ListItem>
            <ListItem key="dummy4" >
            <MatchListItem  key="dummy4" passedValue={{m_name:"dummy4", m_location:"Sabanci", m_date:"Monday 22"}}/>
            </ListItem>
          </List>
        </Box>
      </Grid>
    </Grid>
    

  </Card>
    )
  else {
    return(
      <div >
        <Alert severity='error'>Please verify your email and re-login!</Alert>
        <Button style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={logout}><Typography style={{color: "#00466e", fontWeight: "bold"}}>LOGOUT!</Typography></Button>
      </div>
    )
  }
  
}

export default HomePage;
