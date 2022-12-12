import React from 'react'
import { useNavigate } from 'react-router-dom';
import MatchDataService from '../services/match.service';
import dayjs, { Dayjs } from 'dayjs';
import {Button, Select,  FormControl,MenuItem, InputLabel,TextField ,Card,Stack ,Box,Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { spacing } from '@mui/system';

const MatchEdit = (val) => {

    //-------------functions for text fields-------------------------
    //matchname
    const [name, setName] = React.useState('Güzel bir lobi ismi');
    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log("name: " , name);
    };
    //match location
    const [mLocation, setLoc] = React.useState('');
    const handleLocChange = (event) => {
        setLoc(event.target.value);
        console.log("loc: ",mLocation);
    };
    //----------------------------------------------------------

    //-------------functions for Date time picker--------------------------
    const [value, setValue] = React.useState(dayjs().add(2,'h').toString());

    const handleDateChange = (newValue) => {
      setValue(newValue);
      console.log("date: ",value);
    };
    //--------------------------------------------------------------------

    //----------------functions for select numof players-------------------
    const [numofPlayers, setNOP] = React.useState('');

    const handleplayerChange = (event) => {
    setNOP(event.target.value);
    console.log("numofPlayers: ",numofPlayers);
    };
    //------------------------------------------------------------------


  return (
    <Box m = {20} pt = {5}>
    <Card>
        <Box m = {5} >
        <TextField
          m = {5}
          required
          defaultValue="Güzel bir lobi ismi"
          variant="standard"
          size='medium'
          fullWidth = {true}
          onChange={handleNameChange}
        />
        <div >Maç tarihi: </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateTimePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

        <div>Maç lokasyonu: </div>
        <TextField
          required
          defaultValue="En iyi saha"
          size='medium'
          fullWidth = {true}
          onChange={handleLocChange}
        />

        <FormControl fullWidth>  
        <InputLabel id="demo-simple-select-label">Oyuncu sayısı</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={numofPlayers}
            label="number of players"
            onChange={handleplayerChange}
        >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={22}>22</MenuItem>
        </Select>
        </FormControl>

        <>Hakem atansın istiyorum</>
        <Switch
          inputProps={{ 'aria-label': 'controlled' }}
          onChange ={ handleRefreeChange }
         />
        <div></div>
        <Button color="success" variant="contained" onClick={handlecreateMatch} >Yayınla</Button>
        
        </Box>
    </Card>
    </Box>
  )
}

export default MatchEdit