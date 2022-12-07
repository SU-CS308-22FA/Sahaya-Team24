import { Typography, Card, Box, Toolbar, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const MatchListItem = (props) =>{
    let navigate = useNavigate();
    let val = props.passedValue;
    var date =  new Date(val.m_date);
    
    var year = date.getFullYear().toString() ;
    var month = ((date.getMonth()+1).toString() + "/");
    var day = (date.getDate().toString() + "/");

    var hr = (date.getHours() < 10) ? ("0"+date.getHours().toString()): date.getHours().toString();
    var min = (date.getMinutes() < 10) ? ("0"+date.getMinutes().toString()): date.getMinutes().toString();
    

    const navigateToMatchDetail = (e) => {
        navigate('/MatchDetail', {state: {sentVal: val,},});
      };

    return(
        <Button style={{padding:"0", textTransform:"none"}} onClick={navigateToMatchDetail}>
            <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh"}}>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>{val.m_name}</Typography>
            </Box>
            <Toolbar>
            <Typography noWrap style={{color:"white", flexGrow: "1", textAlign:"start"}}>{val.m_location}</Typography>
            <Typography noWrap style={{color:"white", flexGrow: "1", textAlign:"end"}}>{day+month+year+" "+hr+":"+min}</Typography>
            </Toolbar>
            
        </Card>
        </Button>
    )
}

export default MatchListItem;