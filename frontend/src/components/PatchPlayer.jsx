import React from "react";
import PlayerDataService from '../services/player.service';
import { getAuth } from "firebase/auth";

const PatchPlayer = (keyName, newValue) => {
  const patch = async () => {
    try {
      await PlayerDataService.update(uID,{key:keyName, value:newValue});
    } catch (err) {
      console.log(err);
    }
  };
  const uID = getAuth().currentUser.uid;
  patch();
};

export default PatchPlayer;