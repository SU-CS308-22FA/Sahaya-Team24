import { Typography, Card, Box, Toolbar, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const MatchListItem = (props) =>{
    let navigate = useNavigate();
    let val = props.passedValue;

    const navigateToMatchDetail = (e) => {
        navigate('/MatchDetail', {state: {sentVal: val,},});
      };

    return(
        <Button style={{padding:"0", textTransform:"none"}} onClick={navigateToMatchDetail}>
            <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh"}}>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>{props.passedValue.m_name}</Typography>
            </Box>
            <Toolbar>
            <Typography noWrap style={{color:"white", flexGrow: "1", textAlign:"start"}}>{props.passedValue.m_location}</Typography>
            <Typography noWrap style={{color:"white", flexGrow: "1", textAlign:"end"}}>{props.passedValue.m_date}</Typography>
            </Toolbar>
            
        </Card>
        </Button>
    )
}

export default MatchListItem;