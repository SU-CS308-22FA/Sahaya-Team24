import React, {useState} from 'react'

import {Button,Card, Box, Typography,Toolbar, ButtonGroup} from '@mui/material'
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service';
import RefereeDataService from '../services/referee.service';
import { useNavigate } from "react-router-dom";

const MessageList_item = (props) => {
  let navigate = useNavigate();
  const [uID, setUID] = useState(window.localStorage.getItem('user_id'));

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
    const res = await RefereeDataService.get(props.passedValue.senderID)
    console.log(res)
  } else {
    let player
    try
    {
      player = await PlayerDataService.get(props.passedValue.senderID)
      await MatchDataService.addPlayerToMatch(props.passedValue.matchID, props.passedValue.senderID)
      await PlayerDataService.addMatchToPlayer(props.passedValue.senderID, props.passedValue.matchID)
    }catch(error) 
    {
      alert("Üzgünüz kullanıcı hesabını silmiş.")
    }
  }

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
}

}
export default MessageList_item