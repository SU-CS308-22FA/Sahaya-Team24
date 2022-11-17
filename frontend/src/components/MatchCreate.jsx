import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {Button, Select,  FormControl,MenuItem, InputLabel,TextField ,Card,Stack ,Box,Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { spacing } from '@mui/system';


const MatchCreate = () => {
    //ıdea this functions wil be addded as modal to hompage so that site will be much cooler

    //-------------functions for Date time picker--------------------------
    const [value, setValue] = React.useState(dayjs().add(2,'h'));

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };
    //--------------------------------------------------------------------


    //----------------functions for select numof players-------------------
    const [age, setAge] = React.useState('');

    const handleplayerChange = (event) => {
    setAge(event.target.value);
    };
    //------------------------------------------------------------------
    
    // for switch;
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
        />

        <FormControl fullWidth>  
        <InputLabel id="demo-simple-select-label">Oyuncu sayısı</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
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
        <Switch {...label} defaultunChecked />
        <div></div>
        <Button color="success" variant="contained" >Yayınla</Button>
        
        </Box>
    </Card>
    </Box>
    
    
  )
}

export default MatchCreate