import React , {useEffect, useState} from 'react'

import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service'
import RefereeDataService from '../services/referee.service';
import { useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';
import { Box, margin } from '@mui/system';
import classes from '../components/Mix.module.css';
import { getAuth } from 'firebase/auth';
import MatchEditDeletebtns from './MatchEditDeletebtns'


const MatchDetail = (inVal) => {
  const [uType, setUType] = useState(window.localStorage.getItem('user_type'));
  const [match, setMatch] = useState(inVal.passedValue.sentVal)
  const [referee, setReferee] = useState(null);
  let nref;
  if(match.m_needRefree){
    nref = "Hakem var";
  }else{
    nref = "Hakem yok";
  }
  let navigate = useNavigate();
  const navigateToHome = () =>{
    navigate( '/HomePage' )

  }
  var date = new Date(match.m_date);
  
  var year = date.getFullYear().toString() ;
  var month = ((date.getMonth()+1).toString() + " /");
  var day = (date.getDate().toString() + " /");

  var hr = date.getHours();
  var min = date.getMinutes();
    
    //---------------getCurrentuserID------------------
    const [uID, setUID] = useState(JSON.parse(window.localStorage.getItem('currentUser')).uid);
    //const auth=getAuth();
    //const uID = auth.currentUser.uid;
    //-------------------------------------------------
   
    let show;
    //<MatchEditDeletebtns passedValue = {show}/>
    if(match.owner_id !== uID){
      console.log("wiever is not owner");
      show = false;
     
    }else{
      console.log("wiever is owner");
      show= true;
    }

    let data={
      _match : match,
      showState : show
    }
    const joinMatch = async () => {
      let userInfo;
      if (uType === 'player') {
        userInfo = await PlayerDataService.get(uID)
        const notification = {
          "type": "Join Request",
          "senderID":`${uID}`,
          "matchID": `${match.m_id}`,
          "header": "New Join Request!",
          "message" : `User ${userInfo.data.p_name} wants to join your match ${match.m_name}!`
        }
        await PlayerDataService.notify(match.owner_id, notification)
      } else {
        userInfo = await RefereeDataService.get(uID)
        const notification = {
          "type": "Join Request",
          "senderID":`${uID}`,
          "matchID": `${match.m_id}`,
          "header": "New Join Request!",
          "message" : `User ${userInfo.data.r_name} wants to join your match ${match.m_name}!`
        }
        await PlayerDataService.notify(match.owner_id, notification)
      }
      await MatchDataService.addPlayerToWaiting(match.m_id, uID)
      const newMatch = await MatchDataService.get(match.m_id)
      setMatch(newMatch.data)
      navigateToHome()
    }

    useEffect(() => {
      getRefereeData()
    }, [])

    const getRefereeData = async () => {
      try {
        const response = await RefereeDataService.get(match.referee);
        console.log(response.data);
        setReferee(response.data);
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
    <Card  style={{ backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100vh", borderRadius:"0"}}>
          
          <Box sx={{flexGrow: 1}} m = {20} backgroundColor ='#00466e'  >
          <Box m = {5}>
          <Typography variant="h2" gutterBottom color = 'white'>
            {match.m_name} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Konum:  
            {" " }{match.m_location} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Ma?? G??n??:  
            {" " }{day + month + year}
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            saati:  
            {" " }{hr} {":"} {min} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Hakem:  
            {" " }{referee && match.referee != '' ? referee.r_name : "Hakem yok"}
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Ma??taki ki??i say??s??: 
            {" " }{match.m_curPlayer}
            /
            {match.m_maxPlayer} 
          </Typography>
          </Box>
            {uType=="anonymous" || match.waitingList.includes(uID) || match.players.includes(uID) 
            ?<Button onClick={navigateToHome} style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Anasayfaya d??n...</Typography></Button>
            : <div>{uType=="player" || match.referee === '' ? <Button onClick={joinMatch} style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Ma??a Kat??l</Typography></Button> : <Button onClick={navigateToHome} style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Anasayfaya d??n...</Typography></Button>}</div>}
            <MatchEditDeletebtns passedValue = {data}/>
          </Box>
    </Card>
    
    </div>
  )
}

export default MatchDetail