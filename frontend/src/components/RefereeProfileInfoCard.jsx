import React, { useContext, useEffect, useState } from 'react'

import RefereeDataService from '../services/referee.service';

import { Typography, Card,Divider, Button} from '@mui/material';
import { Box } from '@mui/system';
import { getAuth } from 'firebase/auth';

const RefereeProfileInfoCard = (props) =>{
    const auth=getAuth();
    const [referee, setReferee] = useState(null);


      useEffect(() => {
        const getRefereeData = async () => {
          try {
            const uID = getAuth().currentUser.uid;
            const response = await RefereeDataService.get(uID);
            console.log(response.data);
            setReferee(response.data);
          } catch (err) {
            console.log(err);
          }
        };
        getRefereeData();
      }, []);

    return(
        <Button>
            <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh"}}>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>{referee != null ? referee.p_name : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Rating</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{referee != null ? referee.pr : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Fair Play Rating</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{referee != null ? referee.fpr : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Location</Typography>
            </Box><Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{referee != null ? referee.p_location : null}</Typography>
            </Box>
            <Divider style={{background:"white"}}/>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>Age</Typography>
            </Box>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h6" style={{color:"white", margin:"1vh"}}>{referee != null ? referee.p_age : null}</Typography>
            </Box>
            
        </Card>
            
        </Button>
        
        
    );
}

export default RefereeProfileInfoCard;