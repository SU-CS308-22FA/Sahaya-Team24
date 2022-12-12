import React from 'react'
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';

const MatchEditDeletebtns = (data) => {

    let match = data.passedValue._match

    if(data.passedValue.showState){
        console.log(data.passedValue.showState);
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