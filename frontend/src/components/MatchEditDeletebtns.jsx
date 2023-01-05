import React from 'react'
import { Button, AppBar, Toolbar, Typography, List, ListItem, Grid, Stack, Card, Autocomplete, TextField} from '@mui/material';
import MatchDataService from '../services/match.service'
import RefereeDataService from '../services/referee.service'
import { useNavigate } from 'react-router-dom';

const MatchEditDeletebtns = (data) => {
    let navigate = useNavigate();

    let match = data.passedValue._match
    const handleDeleteMatch = async () => {
        if(window.confirm("Bu maç lobisini silmek üzeresiniz. Sildiğiniz maçlar geri alınamaz, silmek istediğinize emin misiniz?")){
        try{
            if (match.referee != '') {
                console.log(match.referee)
                console.log(match.m_id)
                await RefereeDataService.deleteMatchFromReferee(match.referee, match.m_id)
            }
            await MatchDataService.delete(match.m_id);
        }catch (err) {
            console.log(err);
          }
          navigate('../HomePage');
        }
    }

    const navigateToEdit =(e) =>{
        console.log("trying to navigate edit page")
        navigate('/matchDetail/editMatch', {state: {sentVal: match,},});
    }
    

    if(data.passedValue.showState){
        console.log(data.passedValue.showState);
     return (
    <div>
        <Button id='editbtn' onClick={ navigateToEdit } style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none"  }}   variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maçı Düzenle</Typography></Button>
        <Button id= 'dltbtn'  onClick={ () => handleDeleteMatch() } style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none" }} variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Maçı Sil</Typography></Button>
    </div>
     )
    }else{
        return (null);

    }
}

export default MatchEditDeletebtns