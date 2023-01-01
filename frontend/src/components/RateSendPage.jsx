import React from 'react'
import Rating from '@mui/material/Rating';

const RateSendPage = () => {
  const [value, setValue] = React.useState(0);
    
  return (
    <Card  style={{ backgroundImage: "url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100vh", borderRadius:"0"}}>
        <Box sx={{flexGrow: 1}} m = {20} backgroundColor ='#00466e'  >
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemCard>
              <ListItemText> Kişi adı </ListItemText>
              <Rating
                name="simple-controlled"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
              />
            </ListItemCard>
        </ListItem>

        <Button onClick={ navigateToHome } style={{backgroundColor: "#ffffff", margin:"5px", textTransform:"none"  }}   variant="contained"><Typography style={{color: "#00466e", fontWeight: "bold"}}>Yayınla</Typography></Button>
        </Box>
    </Card>
  )
}

export default RateSendPage