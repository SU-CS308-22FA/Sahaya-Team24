import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import MatchDataService from '../services/match.service';
import RefereeDataService from '../services/referee.service'
import PlayerDataService from '../services/player.service';
import dayjs, { Dayjs } from 'dayjs';
import {Button, Select,  FormControl,MenuItem, InputLabel,TextField ,Card,Stack ,Box,Switch, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { spacing } from '@mui/system';
import { LOCATION_ARRAY } from '../constants';

const MatchEdit = (val) => {
    let navigate = useNavigate();
    let m = val.passedValue.sentVal;

    //-------------functions for text fields-------------------------
    //matchname
    const [name, setName] = React.useState(m.name);
    const handleNameChange = (event) => {
        setName(event.target.value);
        //console.log("name: " , name);
    };
    //match location
    const [mLocation, setLoc] = React.useState(m.m_location);
    const handleLocChange = (event) => {
        setLoc(event.target.value);
        setCheckRChange(false)
        //console.log("loc: ",mLocation);
    };
    //----------------------------------------------------------

    //-------------functions for Date time picker--------------------------
    const [value, setValue] = React.useState(dayjs(m.m_date).toString()); //m.m_date .add(2,'h')
    const handleDateChange = (newValue) => {
      setValue(newValue);
      //console.log("date: ",value);
    };
    //--------------------------------------------------------------------

    //----------------functions for select numof players-------------------
    const [numofPlayers, setNOP] = React.useState(m.m_maxPlayer);

    const handleplayerChange = (event) => {
      setNOP(event.target.value);
      //console.log("numofPlayers: ",numofPlayers);
    };
    //------------------------------------------------------------------
    
    //----------------for hakem atans??n istiyorum switch--------------------------
    const [checR, setCheckR] = React.useState(m.m_needRefree);
    let newReferee = m.referee
    const handleRefreeChange = (event) => {
      setCheckR(event.target.checked);
      setCheckRChange(false)
      handleFilterRefereeData()
      if (checR === false) {
        newReferee = ''
      } else {
        newReferee = m.referee
      }
      //console.log("checked: ",checked);
    };

    // for referee change switch
    const [checkRChange, setCheckRChange] = useState(false);
    const handleRChange = (event) => {
      setCheckRChange(event.target.checked);
      handleFilterRefereeData()
    }
    
    useEffect(() => {
      getRefereeData() // get all referees
      getCurrentReferee()
    }, [])
    
    // referee
    const [referees, setReferees] = useState([]); // all referees
    const [referee, setReferee] = useState('');
    const [filteredR, setFilteredR] = useState([]);
    const [currentR, setCurrentR] = useState();

    // get all referees data and set it to referees array
    const getRefereeData = async () => {
      try {
        const response = await RefereeDataService.getAll();
        setReferees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    const getCurrentReferee = async () => {
      try {
        const response = await RefereeDataService.get(m.referee);
        setCurrentR(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleFilterRefereeData = () => {
      let fTemp = [];
      for (let i = 0; i < referees.length; i++) {
        const temp = referees[i]['available_locations']
        if (temp.find(e => e === mLocation)) {
          fTemp.push(referees[i]);
        }
      }
      setFilteredR(fTemp)
    }
    
    const [player, setPlayer] = useState(null);
    useEffect(() => {
      const getPlayerData = async () => {
        try {
          //console.log(getAuth().currentUser.uid);
          //const uID = getAuth().currentUser.uid;
          const response = await PlayerDataService.get(m.owner_id);
          //console.log(response.data);
          setPlayer(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getPlayerData();
    }, []);

    const refereeInvite = async () => {
    
      const notification = {
        "type": "Referee Invite",
        "matchID": `${m.m_id}`,
        "header": "New match invite!",
        "message" : `Owner ${player.p_name} wants you to join his/her match ${m.m_name}!`
      }
      await RefereeDataService.notify(referee, notification)
    }
    
    //-------------------------------------------------
    const handleUpdateMatch=async()=>{
      if (checR === false && m.referee != '') {
        await RefereeDataService.deleteMatchFromReferee(m.referee, m.m_id)
      }

        if (referee === m.referee) {
          var data = {
            m_name: name,
            m_location: mLocation,
            m_maxPlayer: numofPlayers,
            m_curPlayer: m.m_curPlayer,
            m_needRefree: checR,
            m_date: value,
            owner_id: m.owner_id,
            referee: m.referee
          }
        } else if (m.referee != '' && referee != m.referee) {
          var data = {
            m_name: name,
            m_location: mLocation,
            m_maxPlayer: numofPlayers,
            m_curPlayer: m.m_curPlayer,
            m_needRefree: checR,
            m_date: value,
            owner_id: m.owner_id,
            referee: referee
          }
        } else {         
          var data = {
            m_name: name,
            m_location: mLocation,
            m_maxPlayer: numofPlayers,
            m_curPlayer: m.m_curPlayer,
            m_needRefree: checR,
            m_date: value,
            owner_id: m.owner_id,
            referee: ''
          }
        }
          
          if( name != ""  && mLocation != "" && numofPlayers != "" && value != ""){
            try{
                await MatchDataService.update(m.m_id , data);
                if (referee === '' || referee != m.referee) {
                  refereeInvite()
                }
              }catch (err) {
                  console.log(err);
              }
            navigate('../HomePage');
          }else{
            alert("bir hata olu??tu l??tfen daha sonra tekrar deneyiniz");
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
        <div >Ma?? tarihi: </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateTimePicker
          defaultValue = {dayjs(m.m_date)}
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

        <div>Ma?? lokasyonu: </div>
        <div>
        <FormControl style={{width:245}}>
          <InputLabel id="input_location_label">Location</InputLabel>
          <Select
            id="input_location"
            autoWidth
            value={mLocation}
            defaultValue={m.m_location}
            label="Location"
            onChange={handleLocChange}
          >
          {LOCATION_ARRAY.map((location) => (
            <MenuItem value={location} key = {location}>{location}</MenuItem>
          ))}
          </Select>
        </FormControl>
        </div>

        <FormControl fullWidth>  
        <InputLabel id="demo-simple-select-label">Oyuncu say??s??</InputLabel>
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
        <div>
            Hakem:  
            {" " }{currentR && m.referee != '' ? currentR.r_name : "Hakem yok"}
        </div>
        <>Hakem atans??n istiyorum</>
        <Switch
          inputProps={{ 'aria-label': 'controlled' }}
          onChange ={ handleRefreeChange }
          checked = {checR}
         />
        {checR === true ? <div>
          <>Hakem de??i??tirmek istiyorum</>
          <Switch
            inputProps={{ 'aria-label': 'controlled' }}
            onChange ={ handleRChange }
            checked = {checkRChange}
          />
        </div> : null}
        <div>{checkRChange === true  ? <div>{filteredR.length > 0 ? 
          <FormControl style={{width:245}}>
            <InputLabel id="input_location_label">Referee</InputLabel>
            <Select
              id="input_location"
              autoWidth
              value={referee}
              label="Location"
              onChange={(event) => setReferee(event.target.value)}
            >
            {filteredR.map((r) => (
              <MenuItem value={r.r_id} key = {r.r_id}>{r.r_name}</MenuItem>
            ))}
            </Select>
          </FormControl> : <div>No referee available in this location</div>}</div> : null}</div>
        <Button color="success" variant="contained" onClick={handleUpdateMatch} >Yay??nla</Button>
        
        </Box>
    </Card>
    </Box>
  )
}

export default MatchEdit
