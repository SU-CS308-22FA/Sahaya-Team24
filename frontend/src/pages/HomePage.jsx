import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import MatchDataService from '../services/match.service';
import RefereeDataService from '../services/referee.service'
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField, Alert, Divider} from '@mui/material';
import { Box } from '@mui/system';

import MatchListItem from '../components/MatchListItem';
import PlayerDataService from '../services/player.service'
import { getAuth, signOut } from 'firebase/auth';
import PlayerProfileInfoCard from '../components/PlayerProfileInfoCard';
import RefereeProfileInfoCard from '../components/RefereeProfileInfoCard';
import MessageList_item from '../components/MessageList_item';


const HomePage = () => {
  let auth=getAuth();
  let navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [referee, setReferee] = useState(null)
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(allLocations);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [matchesDb, setMatchesDb] = useState([]);
  const [selectedMatchName, setSelectedMatchName] = useState("");
  const [notifications, setNotifications] = useState([])
  const [uType, setUType] = useState(window.localStorage.getItem('user_type'));
  const [uID, setUID] = useState(JSON.parse(window.localStorage.getItem('currentUser')).uid);

  useEffect(() => {
    const userType = window.localStorage.getItem('user_type')
    if (userType !== null) setUType(userType);

    if (uType === 'player') {
      const setPlayerData = async () => {
        const playerInfo = await PlayerDataService.get(uID)
        setPlayer(playerInfo)
      }
      setPlayerData()
    } else if (uType === 'referee') {
      const setRefereeData = async () => {
        const refereeInfo = await RefereeDataService.get(uID)
        setReferee(refereeInfo)
      }
      setRefereeData()
    }
  }, []);

  useEffect(() => {
    if (uType === 'player') {
      const fetchData = async () => {
        const playerInfo = await PlayerDataService.get(uID)
        setPlayer(playerInfo)
      };
      const timer = setInterval(() => {
        fetchData();
      }, 1000);
    
      return () => clearInterval(timer);
    } else if (uType === 'referee') {
      const fetchData = async () => {
        const refereeInfo = await RefereeDataService.get(uID)
        setReferee(refereeInfo)
      };
      const timer = setInterval(() => {
        fetchData();
      }, 3000);
    
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(()=>{
    if (player && player.data && player.data.p_notification) {
      setNotifications(player.data.p_notification)
    }
  },[player])
  
  useEffect(() => {
    if (referee && referee.data && referee.data.r_notifications) {
      setNotifications(referee.data.r_notifications)
    }
  }, [referee])
  
  useEffect(() => {
    const getMatchesData = async () => {
      try {
        const response = await MatchDataService.getAll();
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
      if(selectedMatchName==null){
        setSelectedMatches(matchesDb);
      }
      else{
        let dummy = matchesDb.filter((match) => match.m_name.toLowerCase().includes(selectedMatchName.toLocaleLowerCase().trim()));
        setSelectedMatches(dummy);
      }
    }
    else{
      if(selectedMatchName==null){
        let dummy = matchesDb.filter((match) => selectedLocations.indexOf(match.m_location) > -1);
      setSelectedMatches(dummy);
      }
      else{
        let dummy = matchesDb.filter((match) => selectedLocations.indexOf(match.m_location) > -1);
        dummy = dummy.filter((match) => match.m_name.toLowerCase().includes(selectedMatchName.toLocaleLowerCase().trim()));
        setSelectedMatches(dummy);
      }
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

  const navigateToSignIn = () =>{
    navigate( '/' )

  }

  return(
    <Card style={{backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100%", borderRadius:"0"}}>
    <Box sx={{flexGrow: 1}}>
    <AppBar position='static' style={{backgroundColor: "#00466e"}}>
    <Toolbar>
    <h1 style={{color: "#ffffff", flexGrow: "1"}}>SAHAYA</h1>
    {uType=='anonymous'? null : <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToProfile}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Profile</Typography></Button>}
    {uType != 'player'?null:<Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToCreateMatch}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Create New Match</Typography></Button>}
    <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToSearch}><Typography style={{color: "#00466e", fontWeight: "bold"}}>Search Users</Typography></Button>
    {uType=='anonymous'? <Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={navigateToSignIn}><Typography style={{color: "#00466e", fontWeight: "bold"}}>SignIn</Typography></Button>:<Button  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained" onClick={logout}><Typography style={{color: "#00466e", fontWeight: "bold"}}>SignOut!</Typography></Button>}
    </Toolbar>
    </AppBar>
    </Box>
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Box>
          <List spa="true" style={{borderColor:"black"}}>
          <ListItem key="PlayerInfoAtLeft">
          <Button style={{padding:"0", textTransform:"none"}} onClick={navigateToProfile}>
          {uType === 'anonymous' ? null : uType === 'player' ? <PlayerProfileInfoCard/> : <RefereeProfileInfoCard/>}
            
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
      onChange={(event, value) => setSelectedLocations(value)}
      multiple
      id="tags-standard"
      options={allLocations}
      getOptionLabel={(location) => location}
      renderInput={(params) => (
        <TextField 
          {...params}
          InputLabelProps={{ style: { color: "white" } }}
          variant="standard"
          label="Choose Locations"
          placeholder="Locations"
        />
      )}/>
      <TextField
              id="input_match_search"
              InputLabelProps={{ style: { color: "white" } }}
              type="email"
              label="Match Name"
              variant="outlined"
              value={selectedMatchName}
              onChange={(event) => setSelectedMatchName(event.target.value)}
            />
      <Button style={{textTransform:"none", color:"white"}} onClick={handleFilter}>Apply Filters/Search</Button>
          {selectedMatches.map((value) => (
            
              <MatchListItem key={value.m_id} passedValue={value}/>
            
          ))}
          </Stack>
      </Grid>
      <Grid item xs={3}>
        <Box>
        {notifications && notifications.length > 0? 
          <List spa="true" style={{borderColor:"black"}}>
              {notifications?.map((object) =>
                  <MessageList_item 
                    key = {object.id}
                    passedValue = {object}
                  />
              )}
          </List>
          :
          null
        }  
        </Box>
      </Grid>
    </Grid>
    

  </Card>
  )
  
}

export default HomePage;
