import React, {useState, useEffect} from 'react'

import {Button,Card, Box, Typography,Toolbar, ButtonGroup} from '@mui/material'
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service';
import RefereeDataService from '../services/referee.service';
import { useNavigate } from "react-router-dom";

const MessageList_item = (props) => {
  let navigate = useNavigate();
  const [uID, setUID] = useState(JSON.parse(window.localStorage.getItem('currentUser')).uid);

  const handleUserType = async (uID) => {
    let type;
    try {
      console.log("waiting response");
      const response = await RefereeDataService.get(uID);
      console.log(response)
      type = 'referee';
      return type;
    } catch (error) {
      console.log(error); 
    }       
  }

  const acceptJoinRequest = async () => {
  const type = await handleUserType(props.passedValue.senderID);
  console.log(type)
  if (type === 'referee') {
    let match = await MatchDataService.get(props.passedValue.matchID)
    let nArray = match.data[0];

    var data = {
      m_name: match.data.m_name,
      m_location: match.data.m_location,
      m_maxPlayer: match.data.m_maxPlayer,
      m_curPlayer: match.data.m_curPlayer,
      m_needRefree: match.data.m_needRefree,
      m_date: match.data.m_date,
      owner_id: match.data.owner_id,
      referee: props.passedValue.senderID
    }

    await RefereeDataService.addMatchToReferee(props.passedValue.senderID, props.passedValue.matchID)
    await MatchDataService.update(nArray.m_id , data);
  } else {
    let player
    try
    {
      player = await PlayerDataService.get(props.passedValue.senderID)
      await MatchDataService.addPlayerToMatch(props.passedValue.matchID, props.passedValue.senderID)
      await PlayerDataService.addMatchToPlayer(props.passedValue.senderID, props.passedValue.matchID)
      const match = await MatchDataService.get(props.passedValue.matchID)
      const response = {
        "type": "Join Response",
        "senderID":`${uID}`,
        "matchID": `${props.passedValue.matchID}`,
        "header": "Join Request Accepted!",
        "message" : `Join request for match ${match.data[0].m_name} is accepted!`
      }
      await PlayerDataService.notify(props.passedValue.senderID,response)
    }catch(error) 
    {
      alert("Üzgünüz kullanıcı hesabını silmiş.")
    }
  }
    await MatchDataService.deletePlayerFromWaiting(props.passedValue.matchID, props.passedValue.senderID)
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
  }
  const refuseJoinRequest = async () => {
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
    const match = await MatchDataService.get(props.passedValue.matchID)
    const response = {
      "type": "Join Response",
      "senderID":`${uID}`,
      "matchID": `${props.passedValue.matchID}`,
      "header": "Join Request Refused!",
      "message" : `Join request for match ${match.data[0].m_name} is refused!`
    }
    await PlayerDataService.notify(props.passedValue.senderID,response)
  }

  const okJoinResponse = async () => {
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
  }

  // Referee functions 

  const refereeRefuseJoinRequest = async () => {
    await RefereeDataService.deleteNotification(uID, props.passedValue.id)
  }

  const [referee, setReferee] = useState(null); // all referees
    
  // get all referees data and set it to referees array
  const getRefereeData = async () => {
    try {
      const response = await RefereeDataService.get(uID);
      setReferee(response.data);
      console.log(referee)
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getRefereeData() // get all referees
  }, [])

  const refereeAcceptJoinRequest = async () => {
    let match = await MatchDataService.get(props.passedValue.matchID)

    let nArray = match.data[0];
    console.log(nArray)
    console.log("pre match referee", nArray.referee)

    if (nArray.referee != '') {
      console.log("hey")
      await RefereeDataService.deleteMatchFromReferee(nArray.referee, nArray.m_id)
    }

    console.log("referee matches check result", referee.matches.includes(nArray.m_id))
    if (referee.matches.includes(nArray.m_id) === false) {
      await RefereeDataService.addMatchToReferee(uID, nArray.m_id)
    } 
    console.log("pre match referee", nArray.referee)
    var data = {
      m_name: match.data.m_name,
      m_location: match.data.m_location,
      m_maxPlayer: match.data.m_maxPlayer,
      m_curPlayer: match.data.m_curPlayer,
      m_needRefree: match.data.m_needRefree,
      m_date: match.data.m_date,
      owner_id: match.data.owner_id,
      referee: uID
    }

    await MatchDataService.update(nArray.m_id , data);
    
    match = await MatchDataService.get(nArray.m_id)

    await RefereeDataService.deleteNotification(uID, props.passedValue.id)
  }  
  const navigateToSendRatings = (e) => {
    navigate('/RateSendPage',{state: {sentVal: props.passedValue,},});

  }

  if(props.passedValue.type == "Join Request") 
  {
    return (
      <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh", justifyContent:"center"}}>
      <Box  sx={{flexGrow: 1, textAlign:"center"}}>
          <Typography variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.header}</Typography>
      </Box>
      <Toolbar>
      <Typography  style={{color:"white", textAlign:"start"}}>{props.passedValue.message}</Typography>
      </Toolbar>
      <ButtonGroup variant = "contained">
        <Button onClick={acceptJoinRequest}>
          Accept
        </Button>
        <Button onClick={refuseJoinRequest}>
          Decline
        </Button>
      </ButtonGroup>
      
      </Card>
    )
  } else if(props.passedValue.type == "Referee Invite") {
    return (
      <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh", justifyContent:"center"}}>
      <Box  sx={{flexGrow: 1, textAlign:"center"}}>
          <Typography variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.header}</Typography>
      </Box>
      <Toolbar>
      <Typography  style={{color:"white", textAlign:"start"}}>{props.passedValue.message}</Typography>
      </Toolbar>
      <ButtonGroup variant = "contained">
        <Button onClick={refereeAcceptJoinRequest}>
          Accept
        </Button>
        <Button onClick={refereeRefuseJoinRequest}>
          Decline
        </Button>
      </ButtonGroup>
      
      </Card>
    )
  } else if(props.passedValue.type == "Join Response")
  {
    return(
      <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh", justifyContent:"center"}}>
      <Box  sx={{flexGrow: 1, textAlign:"center"}}>
          <Typography variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.header}</Typography>
      
      <Toolbar>
      <Typography  style={{color:"white", textAlign:"start"}}>{props.passedValue.message}</Typography>
      </Toolbar>
        <Button variant='contained' onClick={okJoinResponse}>
          OK!
        </Button>
        </Box>
      </Card>
    )
  }else if(props.passedValue.type == "RatePlayers")
  {
    return(
      <Button style={{padding:"0", textTransform:"none"}} onClick={navigateToSendRatings}>
        <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh", justifyContent:"center"}}>
          <Box  sx={{flexGrow: 1, textAlign:"center"}}>
            <Typography variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.header}</Typography>
          </Box>
          <Toolbar>
            <Typography  style={{color:"white", textAlign:"start"}}>{props.passedValue.message}</Typography>
          </Toolbar>
        </Card>
      </Button>
    )
}

}
export default MessageList_item
