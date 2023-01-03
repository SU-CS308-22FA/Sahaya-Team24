import React, {useState} from 'react'
import {Button,Card, Box, Typography,Toolbar, ButtonGroup} from '@mui/material'
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service';

const MessageList_item = (props) => {
  const [uID, setUID] = useState(window.localStorage.getItem('user_id'));
  const acceptJoinRequest = async () => {
    const player = await PlayerDataService.get(props.passedValue.senderID)
    console.log(player)
    if(player){
      console.log("hi")
      await MatchDataService.addPlayerToMatch(props.passedValue.matchID, props.passedValue.senderID)
      await PlayerDataService.addMatchToPlayer(props.passedValue.senderID, props.passedValue.matchID)
      let res = await PlayerDataService.deleteNotification(uID,props.passedValue.id)
      console.log(res)
    }
    else
    {
      alert("Üzgünüz kullanıcı hesabını silmiş.")
    }
    
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