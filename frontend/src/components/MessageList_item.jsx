import React from 'react'
import {Button,Card, Box, Typography,Toolbar, ButtonGroup} from '@mui/material'
const MessageList_item = (props) => {
  let msg = props.passedValue?.message;

  return (
    <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh", justifyContent:"center"}}>
    <Box  sx={{flexGrow: 1, textAlign:"center"}}>
        <Typography variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.header}</Typography>
    </Box>
    <Toolbar>
    <Typography  style={{color:"white", textAlign:"start"}}>{msg}</Typography>
    </Toolbar>
    <ButtonGroup variant = "contained">
      <Button>
        Accept
      </Button>
      <Button>
        Decline
      </Button>
    </ButtonGroup>
    
    </Card>
  )
}

export default MessageList_item