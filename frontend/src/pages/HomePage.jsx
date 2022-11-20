import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import MatchDataService from '../services/match.service';
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';

import MatchListItem from '../components/MatchListItem';
import { Box } from '@mui/system';

const HomePage = () => {
  const auth=getAuth();
  let navigate = useNavigate();

  useEffect(() => {
    const getMatchesData = async () => {
      try {
        const response = await MatchDataService.getAll();
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMatchesData();
    
  }, []);


  const asd=[
    {name:"Asdasd", stadium:"Sabanci", date:"Monday 22"},
    {name:"sad", stadium:"Koc", date:"Wednesdey 12"},
    {name:"asd", stadium:"Bilkent", date:"Thursday 15"},
    {name:"das", stadium:"Sabanci", date:"Monday 22"},
    {name:"asdda", stadium:"Koc", date:"Wednesdey 12"},
    {name:"daasd", stadium:"Bilkent", date:"Thursday 15"},
    {name:"asdad", stadium:"Sabanci", date:"Monday 22"},
    {name:"dasdaad", stadium:"Koc", date:"Wednesdey 12"},
    {name:"daasdas", stadium:"Bilkent", date:"Thursday 15"},
    {name:"dassadads", stadium:"Sabanci", date:"Monday 22"},
    {name:"dasdaads", stadium:"Koc", date:"Wednesdey 12"},
    {name:"dasdasdas", stadium:"Bilkent", date:"Thursday 15"},

  ];

  let allLocations=[...new Set(asd.map((card) => card.stadium))];
  const [selectedLocations, setSelectedLocation] = useState(allLocations);
  const [selectedMatches, setSelectedMatches] = useState(asd);

  const handleFilter = () => {
    if(selectedLocations.length == 0){
      setSelectedMatches(asd);
    }
    else{
      let dummy = asd.filter((match) => selectedLocations.indexOf(match.stadium) > -1);
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

  const navigateToProfile = () => {
    navigate('/ProfilePage');
  };

  return (
    <Card style={{backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100%", borderRadius:"0"}}>
      <Box sx={{flexGrow: 1}}>
      <AppBar position='static' style={{backgroundColor: "#00466e"}}>
      <Toolbar>
      <h1 style={{color: "#ffffff", flexGrow: "1"}}>SAHAYA</h1>
      <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToProfile}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Profile</Typography></Button>
      <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={logout}><Typography style={{color: "#00466e", fontWeight: "bold"}}>SignOut!</Typography></Button>
      </Toolbar>
      </AppBar>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box>
            <List spa style={{borderColor:"black"}}>
            <ListItem key={"dummy1"}>
              <MatchListItem passedValue={{name:"dummy1", stadium:"Sabanci", date:"Monday 22"}}/>
              </ListItem>
              <ListItem key={"dummy2"} >
              <MatchListItem passedValue={{name:"dummy2", stadium:"Sabanci", date:"Monday 22"}}/>
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
              <MatchListItem passedValue={{name:"dummy3", stadium:"Sabanci", date:"Monday 22"}}/>
              </ListItem>
              <ListItem key={"dummy4"} >
              <MatchListItem passedValue={{name:"dummy4", stadium:"Sabanci", date:"Monday 22"}}/>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
      

    </Card>
  )
}

export default HomePage
