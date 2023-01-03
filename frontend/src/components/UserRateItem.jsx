import React from 'react'
import Rating from '@mui/material/Rating';
import { Button,  Typography, List, ListItem, Grid, Stack, Card, Box} from '@mui/material';


const UserRateItem = (item) => {
const [value, setValue] = React.useState();
console.log("item:" ,item);
const player = item.passedValue;
console.log("from: " , player, ", value is: " , value );

  return (
    <Box backgroundColor ='#00466e' >
              <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>test</Typography>
                <Rating
                  name="simple-controlled"
                  //value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                  setValue(newValue);
                  }}
                />
    </Box>

  )
}

export default UserRateItem