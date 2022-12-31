import React from 'react'

const MessageList_item = () => {


  return (
    <Button style={{padding:"0", textTransform:"none"}} onClick={navigateToMatchDetail}>
            <Card style={{backgroundColor:"#00466e", margin:"1vh", width:"50vh"}}>
            <Box  sx={{flexGrow: 1, textAlign:"center"}}>
                <Typography noWrap variant="h4" style={{color:"white", marginTop:"1vh"}}>Mesaj başlığı</Typography>
            </Box>
            <Toolbar>
            <Typography noWrap style={{color:"white", flexGrow: "1", textAlign:"start"}}>maçın adı</Typography>
            <Typography noWrap style={{color:"white", flexGrow: "1", textAlign:"end"}}>mesaj tarihi</Typography>
            </Toolbar>
            
        </Card>
        </Button>
  )
}

export default MessageList_item