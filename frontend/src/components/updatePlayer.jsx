import React from "react";
import PlayerDataService from '../services/player.service';
import { getAuth } from "firebase/auth";

const updatePlayer = async (body) => {
  const uID = getAuth().currentUser.uid;
  try{
    await PlayerDataService.update(uID,body);
  }catch (err) {
      console.log(err);
  }
};

export default updatePlayer;