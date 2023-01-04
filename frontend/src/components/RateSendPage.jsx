import React, { useEffect, useState, useContext } from 'react'
import Rating from '@mui/material/Rating';
import { Button,  Typography, List, ListItem, Grid, Stack, Card, Box} from '@mui/material';
import MatchDataService from '../services/match.service';
import PlayerDataService from '../services/player.service';
import { async } from '@firebase/util';
import playerService from '../services/player.service';
import UserRateItem from './UserRateItem';
import { useNavigate } from 'react-router-dom';




const RateSendPage = (props) => {
  
  let navigate = useNavigate();
  const msg = props.passedValue.sentVal;
  const [users, setUsers] = React.useState([]);
  const [uID, setUID] = useState(window.localStorage.getItem('user_id'));
  
  const Retrive_from_database = async (msg) =>{
  //------getting match from database---------------
  // match retrived from the data base is variable match
  const passedMatchId = msg.matchID;
  const curMatch = await MatchDataService.get(passedMatchId);
  const m = curMatch.data;
//----------------------------------------------------


//-----------retrive users in match from found match----------------
//array of user ids is in the variable users
  let allUsers = m.players;
  console.log("allusers:" , allUsers );
//------------------------------------------------------------------

const userIdToObj = async (id) =>{
  
  const obj = await playerService.get(id)
  console.log("obj: " , obj);
  return (obj)

}

let u =[];
for (let index = 0; index < allUsers.length; index++) {
      const element = allUsers[index];
      let obj = await (await userIdToObj(element)).data
      console.log("element: " ,obj );
      u.push(obj);
    }
  setUsers(u);

  console.log("msg is:" , msg);
  console.log("mid is:" , passedMatchId);
  console.log("rating match is: ", m );
  
  
}

React.useEffect( () => {
  const getData = async()=>{
    await Retrive_from_database(msg);
  }
  getData();
  console.log("Users: ", users);
  
}, []); 

const navigateToHomepage = ()=>{
  if(window.confirm("Bu bildirime bir daha ulaşamıyacaksınız çıkmak istediğinize emin misiniz?")){
    try {
      playerService.deleteNotification( uID , msg.id);
    } catch (error) {
      console.log(error);
    }
    navigate('../HomePage');
  }

  

}


  return (
    <Card  style={{ backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100vh", borderRadius:"0"}}>
        <Box sx={{flexGrow: 1}} m = {20} backgroundColor ='#00466e'  >
          <List>
            {users.map((item) => <UserRateItem key ={item.p_id} passedValue = {item}/>)}
          </List>
        <Button onClick={navigateToHomepage}  style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none"  }}   variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Ana Sayfaya Dön</Typography></Button>
        </Box>
    </Card>
  )

 // return( <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div> )
}

export default RateSendPage

