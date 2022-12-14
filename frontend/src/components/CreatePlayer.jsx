
import PlayerDataService from '../services/player.service';
import { TextField, Button , Card, InputLabel, FormControl, MenuItem,Select } from "@mui/material";
import React, { Component } from "react";
import { getAuth } from "firebase/auth";
import classes from '../components/Mix.module.css';
import { withRouter } from './withRouter';
import { LOCATION_ARRAY } from '../constants';

class AddPlayer extends Component{ 
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePosA = this.onChangePosA.bind(this);
    this.onChangePosB = this.onChangePosB.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.newPlayer = this.newPlayer.bind(this);
    this.navigation = this.navigation.bind(this);
    let uId = props.uID;
    this.state = {
      //p_id: getAuth().currentUser.uid,
      p_id: uId,
      p_name: "",
      p_age: 0,
      position_a: "",
      position_b: "",
      p_location: ""
    };
    
  }
  navigation(){
    this.props.navigate('/')
  }

  onChangeName(e) {
    this.setState({
      p_name: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      p_age: e.target.value
    });
  }
  onChangePosA(e) {
    this.setState({
      position_a: e.target.value
    });
  }
  onChangePosB(e) {
    this.setState({
      position_b: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      p_location: e.target.value
    });
  }

  

  savePlayer() {

    var data = {
      p_id: this.state.p_id,
      p_name: this.state.p_name,
      p_age: this.state.p_age,
      position_a: this.state.position_a,
      position_b: this.state.position_b,
      p_location: this.state.p_location,
    };

    PlayerDataService.create(data)
      .then(response => {
        this.setState({
          p_id: response.data.id,
          p_name: response.data.p_name,
          p_age: response.data.p_age,
          position_a: response.data.position_a,
          position_b: response.data.position_b,
          p_location: response.data.p_location
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  newPlayer() {
    this.setState({
      p_id: getAuth().currentUser.uid,
      p_name: "",
      p_age: 0,
      position_a: "",
      position_b: "",
      p_location: ""
    });
  }

  buttonClick() {

  }
  
  render(){
  return (
    <Card className={classes.card}>
      <div className={classes.textFieldCss}>
      <TextField
        id="input_name"
        required
        label="Name"
        variant="outlined"
        value={this.state.p_name}
        onChange={this.onChangeName}
      />
      </div>

      <div className={classes.textFieldCss}>
      <TextField
        id="input_age"
        required
        type="number"
        label="Age"
        variant="outlined"
        value={this.state.p_age}
        onChange={this.onChangeAge}
      />
      </div>
      <div className={classes.textFieldCss}>
      <TextField
        id="input_positionA"
        required
        label="Position"
        variant="outlined"
        value={this.state.position_a}
        onChange={this.onChangePosA}
      />
      </div>
      <div className={classes.textFieldCss}>
      <TextField
        id="input_positionB"
        required
        label="Second Position"
        variant="outlined"
        value={this.state.position_b}
        onChange={this.onChangePosB}
      />
      </div>
      <div className={classes.textFieldCss}>
      <FormControl style={{width:245}}>
        <InputLabel id="input_location_label">Location</InputLabel>
        <Select
          id="input_location"
          autoWidth
          value={this.state.p_location}
          label="Location"
          onChange={this.onChangeLocation}
        >
        {LOCATION_ARRAY.map((location) => (
          <MenuItem value={location} key = {location}>{location}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </div>

      <Button variant="contained" disabled={!(this.state.p_name != "" && this.state.p_age != 0 && this.state.position_a != "" && this.state.position_b != "" && this.state.p_location != "")} onClick={()=>{
        this.savePlayer()
        this.navigation()
        }}>
        Create User!
      </Button>
    </Card>
  );
}
};

export default withRouter(AddPlayer);