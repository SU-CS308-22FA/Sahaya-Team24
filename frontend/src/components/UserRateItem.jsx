import React, { useEffect, useState, useContext } from "react";
import Rating from '@mui/material/Rating';
import { Button,  Typography, List, ListItem, Grid, Stack, Card, Box} from '@mui/material';
import Divider from '@mui/material/Divider';
import PlayerDataService from"../services/player.service";

const UserRateItem = (item) => {
const [rating, setRating] = React.useState();
const [fp_rating, setFp_rating] = React.useState();
const [uID, setUID] = useState(window.localStorage.getItem('user_id'));


console.log("item:" ,item);
const player = item.passedValue;
console.log("from: " , player.p_name, ", rating is: " , rating );
console.log("from: " , player.p_name, ", fp rating is: " , fp_rating );

const currentRateing = player.p_rating;
console.log("curr rateing" , currentRateing);
let rateSend = false;

const updatePlayer = async (body) => {
  try{
    await PlayerDataService.update(player.p_id, body);
  }catch (err) {
      console.log(err);
  }
}

let newRateing = [0,0,0];
const HandleRates = () =>{
  if(window.confirm("Bu kullanıcıya bir daha oy veremezsiniz, emin misiniz?")){
  if(!rateSend){
  newRateing[0] =  currentRateing[0] + rating;
  newRateing[1] =  currentRateing[1] + fp_rating;
  newRateing[2] =  currentRateing[2] + 1;

  player["p_rating"] = newRateing;
  console.log("lastrateing: " , player.p_rating);
  updatePlayer(player);
  rateSend = true;

  }else{
    alert("Bu kullanıcıya zaten oy verdiniz");
  }
  }
}

if(uID === player.p_id){
  console.log("From RateItem: This one is current user ")
  return(null)

}

  return (
    <Box backgroundColor ='#00466e' >
              <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>{player.p_name }</Typography>
              <Typography  style={{color:"white", marginTop:"1vh"}}>{"posA: " + player.position_a + " /posB: " + player.position_b} </Typography>
              <Typography  style={{color:"white", marginTop:"1vh"}}>Rating: </Typography>
                <Rating
                  name="simple-controlled"
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <Typography  style={{color:"white", marginTop:"1vh"}}>Fair play rating: </Typography>
                <Rating
                  name="simple-controlled2"
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setFp_rating(newValue);
                  }}
                />
                <div>
                  <Button onClick={HandleRates} style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none"  }}   variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Oyla</Typography></Button>
                </div>
                <Divider variant="middle"/>
    </Box>

  )
}

export default UserRateItem