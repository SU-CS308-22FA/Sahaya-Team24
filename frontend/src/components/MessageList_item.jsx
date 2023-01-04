import React, {useState} from 'react'

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
    await RefereeDataService.addMatchToReferee(props.passedValue.senderID, props.passedValue.matchID)
    let match = await MatchDataService.get(props.passedValue.matchID)
    match.data.referee = props.passedValue.senderID
    await MatchDataService.update(props.passedValue.matchID , match.data);
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
        "message" : `Join request for match ${match.data.m_name} is accepted!`
      }
      await PlayerDataService.notify(props.passedValue.senderID,response)
    }catch(error) 
    {
      alert("Üzgünüz kullanıcı hesabını silmiş.")
    }
  }

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
      "message" : `Join request for match ${match.data.m_name} is refused!`
    }
    await PlayerDataService.notify(props.passedValue.senderID,response)
  }

  const okJoinResponse = async () => {
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
  }

  const refereeRefuseJoinRequest = async () => {
    await RefereeDataService.deleteNotification(uID, props.passedValue.id)
  }
  const refereeAcceptJoinRequest = async () => {
    await RefereeDataService.addMatchToReferee(uID, props.passedValue.matchID)
    await RefereeDataService.deleteNotification(uID, props.passedValue.id)
    let match = await MatchDataService.get(props.passedValue.matchID)
    match.data.referee = uID
    await MatchDataService.update(props.passedValue.matchID , match.data);
    
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
