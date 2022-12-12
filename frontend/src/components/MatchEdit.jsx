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
    let navigate = useNavigate();
    let m = val.passedValue.sentVal;

    console.log(m);

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
    
    //----------------for switch--------------------------
    const [checked, setRefree] = React.useState(true);
    const handleRefreeChange = (event) => {
      setRefree(event.target.checked);
      console.log("checked: ",checked);
      
  };
    //-------------------------------------------------
    const handleUpdateMatch=async()=>{
        var data = {
            m_name: name,
            m_location: mLocation,
            m_maxPlayer: numofPlayers,
            m_curPlayer: m.m_curPlayer,
            m_needRefree: checked,
            m_date: value,
            owner_id: m.owner_id,
          }

          if( name != ""  && mLocation != "" && numofPlayers != "" && value != ""){
            try{
                console.log("trying to update")
    
    
                await MatchDataService.update(m.m_id , data);
              }catch (err) {
                  console.log(err);
              }
            navigate('../HomePage');
          }else{
            alert("Lütfen bütün boşlukları doldurunuz");
          }
          
          

    }

  return (
    <Box m = {20} pt = {5}>
    <Card>
        <Box m = {5} >
        <TextField
          m = {5}
          required
          defaultValue={m.m_name}
          variant="standard"
          size='medium'
          fullWidth = {true}
          onChange={handleNameChange}
        />
        <div >Maç tarihi: </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateTimePicker
          defaultValue = {dayjs(m.m_date)}
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

        <div>Maç lokasyonu: </div>
        <TextField
          required
          defaultValue={m.m_location}
          size='medium'
          fullWidth = {true}
          onChange={handleLocChange}
        />

        <FormControl fullWidth>  
        <InputLabel id="demo-simple-select-label">Oyuncu sayısı</InputLabel>
        <Select
            defaultValue={(m.m_maxPlayer)}
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
          defaultValue={m.m_needRefree}
          inputProps={{ 'aria-label': 'controlled' }}
          onChange ={ handleRefreeChange }
         />
        <div></div>
        <Button color="success" variant="contained" onClick={handleUpdateMatch} >Yayınla</Button>
        
        </Box>
    </Card>
    </Box>
  )
}

export default MatchEdit