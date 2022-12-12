import React from 'react'
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';
import MatchDataService from '../services/match.service'
import { useNavigate } from 'react-router-dom';

const MatchEditDeletebtns = (data) => {
    let navigate = useNavigate();

    let match = data.passedValue._match
    const handleDeleteMatch = async () => {
       try{
        await MatchDataService.delete(match.m_id);
        }catch (err) {
            console.log(err);
          }
          navigate('../HomePage');
          
    }


    if(data.passedValue.showState){
        console.log(data.passedValue.showState);
     return (
    <div>
        <Button id='editbtn' style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none"  }}   variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maçı Düzenle</Typography></Button>
        <Button id= 'dltbtn'  onClick={ () => handleDeleteMatch() } style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maçı Sil</Typography></Button>
    </div>
     )
    }else{
        return (null);

    }
}

export default MatchEditDeletebtns