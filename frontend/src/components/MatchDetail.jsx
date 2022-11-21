import React , {useEffect, useState} from 'react'
import MatchDataService from '../services/match.service';
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';
import { Box, margin } from '@mui/system';
import classes from '../components/Mix.module.css';



const MatchDetail = (inVal) => {

    let match = inVal.passedValue.sentVal;
    let nref;
    if(match.m_needRefree){
      nref = "Hakem var";
    }else{
      nref = "Hakem yok";
    }

    var date = new Date(match.m_date);
    
    var year = date.getFullYear().toString() ;
    var month = (date.getMonth().toString() + " /");
    var day = (date.getDay().toString() + " /");

    var hr = date.getHours();
    var min = date.getMinutes();
    
  return (
    <Card  style={{ backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100vh", borderRadius:"0"}}>
          
          <Box sx={{flexGrow: 1}} m = {20} backgroundColor ='#00466e'  >
          <Box m = {5}>
          <Typography variant="h2" gutterBottom color = 'white'>
            {match.m_name} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Konum:  
            {" " }{match.m_location} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Maç Günü:  
            {" " }{day} {month} {year} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            saati:  
            {" " }{hr} {":"} {min} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Hakem:  
            {" " }{nref} 
          </Typography>
          <Typography variant="h4" gutterBottom color = 'white'>
            Maçtaki kişi sayısı: 
            {" " }{match.m_maxPlayer}
            /
            {match.m_curPlayer} 
          </Typography>
          </Box>
          <Button style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maça Katıl</Typography></Button>
          </Box>
    </Card>
  )
}

export default MatchDetail