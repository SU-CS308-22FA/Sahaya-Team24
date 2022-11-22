import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import MatchDataService from '../services/match.service';
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';
import { Box } from '@mui/system';

import MatchListItem from '../components/MatchListItem';
import classes from '../components/Mix.module.css';
import Layout from '../components/layout/Layout';
import { getAuth, signOut } from 'firebase/auth';

const HomePage = () => {
  const auth=getAuth();
  let navigate = useNavigate();

  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocations, setSelectedLocation] = useState(allLocations);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [matchesDb, setMatchesDb] = useState([]);

  useEffect(() => {
    const getMatchesData = async () => {
      try {
        const response = await MatchDataService.getAll();
        console.log(response.data);
        setMatchesDb(response.data);
        setSelectedMatches(response.data);

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
          <List spa style={{borderColor:"black"}}>
          <ListItem key={"dummy1"}>
            <MatchListItem passedValue={{m_name:"dummy1", m_location:"Sabanci", m_date:"Monday 22"}}/>
            </ListItem>
            <ListItem key={"dummy2"} >
            <MatchListItem passedValue={{m_name:"dummy2", m_location:"Sabanci", m_date:"Monday 22"}}/>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid style={{display: "flex", justifyContent: "center" }} item xs={6}>
          <Stack style={{minHeight:"100vh"}} spacing={2}>
          <Autocomplete 
      style={{width:"100%"}}
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
            
              <MatchListItem passedValue={value}/>
            
          ))}
          </Stack>
      </Grid>
      <Grid item xs={3}>
        <Box>
          <List spa style={{borderColor:"black"}}>
            <ListItem key={"dummy3"} >
            <MatchListItem passedValue={{m_name:"dummy3", m_location:"Sabanci", m_date:"Monday 22"}}/>
            </ListItem>
            <ListItem key={"dummy4"} >
            <MatchListItem passedValue={{m_name:"dummy4", m_location:"Sabanci", m_date:"Monday 22"}}/>
            </ListItem>
          </List>
        </Box>
      </Grid>
    </Grid>
    

  </Card>
    )
  else return(
    <div>Please verify your email if already verified reload the page!</div>
  )
}

export default HomePage;
