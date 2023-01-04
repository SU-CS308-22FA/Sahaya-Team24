import React, { useContext, useEffect, useState } from 'react'

import PlayerDataService from '../services/player.service';

import { Typography, Card,Divider, Button} from '@mui/material';
import { Box } from '@mui/system';
import { getAuth } from 'firebase/auth';

const PlayerProfileInfoCard = (props) =>{
    const auth=getAuth();
    const [player, setPlayer] = useState(null);

    const [uID, setUID] = useState(JSON.parse(window.localStorage.getItem('currentUser')).uid);
  

    useEffect(() => {
        const getPlayerData = async () => {
          try {
            const response = await PlayerDataService.get(uID);
            setPlayer(response.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPlayerData();
        
      }, []);

      

    return(
        <Button>
            <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh"}}>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>{player != null ? player.p_name : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Rating</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{player != null && player.p_rating[2] ?  (player.p_rating[0]/player.p_rating[2]).toFixed(2) : "No Ratings yet"}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Fair Play Rating</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{player != null && player.p_rating[2] ?  (player.p_rating[1]/player.p_rating[2]).toFixed(2) : "No Ratings yet"}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Location</Typography>
            </Box><Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{player != null ? player.p_location : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Position</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{player != null ? player.position_a : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Second Position</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{player != null ? player.position_b : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Age</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{player != null ? player.p_age : null}</Typography>
            </Box>
            
        </Card>
            
        </Button>
        
        
    );
}

export default PlayerProfileInfoCard;