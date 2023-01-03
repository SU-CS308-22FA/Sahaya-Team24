import React, {useState} from 'react'
import {Button,Card, Box, Typography,Toolbar, ButtonGroup} from '@mui/material'
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service';
import RefereeDataService from '../services/referee.service';

const MessageList_item = (props) => {
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
      console.log("hey")
      await RefereeDataService.addMatchToReferee(props.passedValue.senderID, props.passedValue.matchID)
      const res = await RefereeDataService.get(props.passedValue.senderID)
      console.log(res)
    } else {
      await PlayerDataService.addMatchToPlayer(props.passedValue.senderID, props.passedValue.matchID)
    }
    await MatchDataService.addPlayerToMatch(props.passedValue.matchID, props.passedValue.senderID)
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
  }
  const refuseJoinRequest = async () => {
    await PlayerDataService.deleteNotification(uID,props.passedValue.id)
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
  }else 
  {
    return(
      <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh", justifyContent:"center"}}>
        <Box  sx={{flexGrow: 1, textAlign:"center"}}>
            <Typography variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.header}</Typography>
        </Box>
        <Toolbar>
          <Typography  style={{color:"white", textAlign:"start"}}>{props.passedValue.message}</Typography>
        </Toolbar>
      </Card>
    )
  }
  
}

export default MessageList_item