import RefereeDataService from '../services/referee.service';
import { TextField, Button , Card, InputLabel, FormControl, MenuItem,Select } from "@mui/material";
import React, { Component } from "react";
import { getAuth } from "firebase/auth";
import classes from '../components/Mix.module.css';
import { withRouter } from './withRouter';
import { LOCATION_ARRAY } from '../constants';

class AddReferee extends Component{ 
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.saveReferee = this.saveReferee.bind(this);
    this.newReferee = this.newReferee.bind(this);
    this.navigation = this.navigation.bind(this);
    let uId = props.uID;
    console.log(uId);
    this.state = {
      r_id: uId,
      r_name: "",
      r_age: 0,
      r_location: "",
      available_locations: []
    };
    
  }
  navigation(){
    this.props.navigate('/')
  }

  onChangeName(e) {
    this.setState({
      r_name: e.target.value
    });
  }
  onChangeAge(e) {
    this.setState({
      r_age: e.target.value
    });
  }
  onChangeLocation(e) {
    this.setState({
      r_location: e.target.value
    });
  }

  

  saveReferee() {
    this.state.available_locations.push(this.state.r_location)
    /*this.setState({
      available_locations: this.state.available_locations
    })*/
    console.log(this.state.available_locations)
    var data = {
      r_id: this.state.r_id,
      r_name: this.state.r_name,
      r_age: this.state.r_age,
      r_location: this.state.r_location,
      available_locations: this.state.available_locations
    };
    //console.log("data:");
    //console.log(data);
    RefereeDataService.create(data)
      .then(response => {
        this.setState({
          r_id: response.data.id,
          r_name: response.data.r_name,
          r_age: response.data.r_age,
          r_location: response.data.r_location,
          available_locations: response.data.available_locations
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  newReferee() {
    this.setState({
      r_id: this.props.uID,
      r_name: "",
      r_age: 0,
      r_location: "",
      available_locations: []
    });
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
        value={this.state.r_name}
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
        value={this.state.r_age}
        onChange={this.onChangeAge}
      />
      </div>
      <div className={classes.textFieldCss}>
      <FormControl style={{width:245}}>
        <InputLabel id="input_location_label">Location</InputLabel>
        <Select
          id="input_location"
          autoWidth
          value={this.state.r_location}
          label="Location"
          onChange={this.onChangeLocation}
        >
        {LOCATION_ARRAY.map((location) => (
          <MenuItem value={location} key = {location}>{location}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </div>

      <Button variant="contained" onClick={()=>{
        this.saveReferee()
        this.navigation()
        }}>
        Create User!
      </Button>
    </Card>
  );
}
};

export default withRouter(AddReferee);
