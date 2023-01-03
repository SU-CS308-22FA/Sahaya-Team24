import React, {useState} from 'react'

import {Button,Card, Box, Typography,Toolbar, ButtonGroup} from '@mui/material'
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service';
import { useNavigate } from "react-router-dom";

const MessageList_item = (props) => {
  let navigate = useNavigate();
  const [uID, setUID] = useState(window.localStorage.getItem('user_id'));
  const acceptJoinRequest = async () => {
    await MatchDataService.addPlayerToMatch(props.passedValue.matchID, props.passedValue.senderID)
    await PlayerDataService.addMatchToPlayer(props.passedValue.senderID, props.passedValue.matchID)
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
  }
  const refuseJoinRequest = async () => {
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
  }

  const navigateToSendRatings = (e) => {
    console.log("props from mli: " , props.passedValue);
    navigate('/HomePage/RateSendPage',{state: {sentVal: props.passedValue,},});

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
  }else{
    return null;
  }
  
}

export default MessageList_item