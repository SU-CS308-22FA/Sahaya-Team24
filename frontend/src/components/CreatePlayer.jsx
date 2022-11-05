import React, { useState } from "react";
import PlayerDataService from '../services/player.service';
import { TextField, Button } from "@mui/material";

import { getAuth } from "firebase/auth";


const CreatePlayer = () => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [positionA, setPositionA] = useState("");
  const [positionB, setPositionB] = useState("");
  const [pLocation, setPLocation] = useState("");

  const handleSubmit = async () => {
    var data = {
      p_id: getAuth().currentUser.uid,
        p_name: name,
        age: age,
        position_a: positionA,
        position_b: positionB,
        p_location: pLocation,
    };
    try {
      PlayerDataService.create(data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <TextField
        id="input_name"
        required
        label="Name"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        id="input_age"
        required
        type="number"
        label="Age"
        variant="outlined"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <TextField
        id="input_positionA"
        required
        label="Position"
        variant="outlined"
        value={positionA}
        onChange={(event) => setPositionA(event.target.value)}
      />
      <TextField
        id="input_positionB"
        required
        label="Second Position"
        variant="outlined"
        value={positionB}
        onChange={(event) => setPositionB(event.target.value)}
      />
      <TextField
        id="input_location"
        required
        label="Location"
        variant="outlined"
        value={pLocation}
        onChange={(event) => setPLocation(event.target.value)}
      />
      <Button variant="contained" onClick={() => handleSubmit()}>
        Create User!
      </Button>
    </div>
  );
};

export default CreatePlayer;
