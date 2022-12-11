import React from 'react'
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';

const MatchEditDeletebtns = (show) => {


    if(show.passedValue){
        console.log(show.passedValue);
     return (
    <div>
        <Button id='editbtn' style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none"  }}   variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maçı Düzenle</Typography></Button>
        <Button id= 'dltbtn' style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maçı Sil</Typography></Button>
    </div>
     )
    }else{
        return (null);

    }
}

export default MatchEditDeletebtns